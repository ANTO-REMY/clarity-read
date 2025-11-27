import { useState, useEffect, useRef, useCallback } from 'react';
import { ChapterData } from '@/lib/audioData';

interface AudioSyncState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    currentSentenceIndex: number;
    currentWordIndex: number;
    progress: number;
}

export const useAudioSyncWithTTS = (chapterData: ChapterData) => {
    const [state, setState] = useState<AudioSyncState>({
        isPlaying: false,
        currentTime: 0,
        duration: chapterData.duration,
        currentSentenceIndex: 0,
        currentWordIndex: -1,
        progress: 0
    });

    const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
    const currentIndexRef = useRef(0);
    const isPausedRef = useRef(false);
    const playbackRateRef = useRef(1);
    const wordTimersRef = useRef<NodeJS.Timeout[]>([]);

    // Initialize speech synthesis utterances
    useEffect(() => {
        window.speechSynthesis.cancel();
        utterancesRef.current = [];
        wordTimersRef.current.forEach(timer => clearTimeout(timer));
        wordTimersRef.current = [];

        chapterData.sentences.forEach((sentence, sentenceIndex) => {
            const utterance = new SpeechSynthesisUtterance(sentence.text);
            utterance.rate = playbackRateRef.current;
            utterance.pitch = 1;
            utterance.volume = 1;

            utterance.onstart = () => {
                setState(prev => ({
                    ...prev,
                    currentSentenceIndex: sentenceIndex,
                    currentWordIndex: 0,
                    isPlaying: true
                }));

                // Simulate word-by-word highlighting using timestamps
                if (sentence.words && sentence.words.length > 0) {
                    sentence.words.forEach((word, wordIndex) => {
                        const delay = (word.start - sentence.start) * 1000 / playbackRateRef.current;
                        const timer = setTimeout(() => {
                            setState(prev => ({
                                ...prev,
                                currentWordIndex: wordIndex,
                                currentTime: word.start
                            }));
                        }, delay);
                        wordTimersRef.current.push(timer);
                    });
                }
            };

            utterance.onend = () => {
                const progress = ((sentenceIndex + 1) / chapterData.sentences.length) * 100;
                setState(prev => ({ ...prev, progress }));

                // Clear word timers for this sentence
                wordTimersRef.current.forEach(timer => clearTimeout(timer));
                wordTimersRef.current = [];

                if (sentenceIndex < chapterData.sentences.length - 1) {
                    currentIndexRef.current = sentenceIndex + 1;
                    playCurrentUtterance();
                } else {
                    setState(prev => ({ ...prev, isPlaying: false }));
                    currentIndexRef.current = 0;
                }
            };

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                setState(prev => ({ ...prev, isPlaying: false }));
            };

            utterancesRef.current.push(utterance);
        });

        return () => {
            window.speechSynthesis.cancel();
            wordTimersRef.current.forEach(timer => clearTimeout(timer));
        };
    }, [chapterData]);

    const playCurrentUtterance = useCallback(() => {
        if (currentIndexRef.current < utterancesRef.current.length) {
            window.speechSynthesis.speak(utterancesRef.current[currentIndexRef.current]);
        }
    }, []);

    const play = useCallback(() => {
        if (isPausedRef.current && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            isPausedRef.current = false;
            setState(prev => ({ ...prev, isPlaying: true }));
        } else {
            playCurrentUtterance();
        }
    }, [playCurrentUtterance]);

    const pause = useCallback(() => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            isPausedRef.current = true;
            setState(prev => ({ ...prev, isPlaying: false }));
            // Clear word timers when pausing
            wordTimersRef.current.forEach(timer => clearTimeout(timer));
            wordTimersRef.current = [];
        }
    }, []);

    const togglePlayPause = useCallback(() => {
        if (state.isPlaying || window.speechSynthesis.speaking) {
            pause();
        } else {
            play();
        }
    }, [state.isPlaying, play, pause]);

    const seek = useCallback((time: number) => {
        // Find sentence that contains this time
        const sentenceIndex = chapterData.sentences.findIndex(
            s => time >= s.start && time <= s.end
        );
        if (sentenceIndex >= 0) {
            goToSentence(sentenceIndex);
        }
    }, [chapterData.sentences]);

    const seekToProgress = useCallback((progress: number) => {
        const sentenceIndex = Math.floor((progress / 100) * chapterData.sentences.length);
        if (sentenceIndex >= 0 && sentenceIndex < chapterData.sentences.length) {
            goToSentence(sentenceIndex);
        }
    }, [chapterData.sentences]);

    const skipForward = useCallback((seconds: number = 5) => {
        window.speechSynthesis.cancel();
        wordTimersRef.current.forEach(timer => clearTimeout(timer));
        wordTimersRef.current = [];

        if (currentIndexRef.current < utterancesRef.current.length - 1) {
            currentIndexRef.current++;
            const progress = ((currentIndexRef.current + 1) / chapterData.sentences.length) * 100;
            setState(prev => ({ ...prev, progress }));
            playCurrentUtterance();
        }
    }, [chapterData.sentences.length, playCurrentUtterance]);

    const skipBackward = useCallback((seconds: number = 5) => {
        window.speechSynthesis.cancel();
        wordTimersRef.current.forEach(timer => clearTimeout(timer));
        wordTimersRef.current = [];

        if (currentIndexRef.current > 0) {
            currentIndexRef.current--;
            const progress = ((currentIndexRef.current + 1) / chapterData.sentences.length) * 100;
            setState(prev => ({ ...prev, progress }));
            playCurrentUtterance();
        }
    }, [chapterData.sentences.length, playCurrentUtterance]);

    const setPlaybackRate = useCallback((rate: number) => {
        playbackRateRef.current = rate;
        utterancesRef.current.forEach(utterance => {
            utterance.rate = rate;
        });
    }, []);

    const setVolume = useCallback((volume: number) => {
        const normalizedVolume = Math.max(0, Math.min(1, volume / 100));
        utterancesRef.current.forEach(utterance => {
            utterance.volume = normalizedVolume;
        });
    }, []);

    const goToSentence = useCallback((index: number) => {
        window.speechSynthesis.cancel();
        wordTimersRef.current.forEach(timer => clearTimeout(timer));
        wordTimersRef.current = [];

        if (index >= 0 && index < chapterData.sentences.length) {
            currentIndexRef.current = index;
            const progress = ((index + 1) / chapterData.sentences.length) * 100;
            setState(prev => ({
                ...prev,
                currentSentenceIndex: index,
                currentWordIndex: -1,
                progress
            }));
            playCurrentUtterance();
        }
    }, [chapterData.sentences, playCurrentUtterance]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        ...state,
        play,
        pause,
        togglePlayPause,
        seek,
        seekToProgress,
        skipForward,
        skipBackward,
        setPlaybackRate,
        setVolume,
        goToSentence,
        formatTime,
        currentSentence: state.currentSentenceIndex >= 0
            ? chapterData.sentences[state.currentSentenceIndex]
            : null,
        currentWord: state.currentSentenceIndex >= 0 && state.currentWordIndex >= 0
            ? chapterData.sentences[state.currentSentenceIndex].words[state.currentWordIndex]
            : null
    };
};
