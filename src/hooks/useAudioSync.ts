import { useState, useEffect, useRef, useCallback } from 'react';
import { ChapterData, SentenceTiming, WordTiming } from '@/lib/audioData';

interface AudioSyncState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentSentenceIndex: number;
  currentWordIndex: number;
  progress: number;
}

export const useAudioSync = (chapterData: ChapterData) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Chapter 1 has a 20-second introduction before the text starts
  const audioOffset = chapterData.id === 'gatsby-ch1' ? 20 : 0;
  
  const [state, setState] = useState<AudioSyncState>({
    isPlaying: false,
    currentTime: 0,
    duration: chapterData.duration,
    currentSentenceIndex: -1,
    currentWordIndex: -1,
    progress: 0
  });

  useEffect(() => {
    const audio = new Audio(chapterData.audioUrl);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setState(prev => ({ ...prev, duration: audio.duration }));
    });

    audio.addEventListener('timeupdate', () => {
      const currentTime = audio.currentTime;
      const progress = (currentTime / audio.duration) * 100;

      // Adjust time for audio offset (e.g., 20s intro for Chapter 1)
      const adjustedTime = currentTime - audioOffset;
      
      // Only find sentence if we're past the offset
      const sentenceIndex = adjustedTime >= 0 
        ? findCurrentSentence(adjustedTime, chapterData.sentences)
        : -1;
      const wordIndex = sentenceIndex >= 0
        ? findCurrentWord(adjustedTime, chapterData.sentences[sentenceIndex].words)
        : -1;

      setState(prev => ({
        ...prev,
        currentTime,
        progress,
        currentSentenceIndex: sentenceIndex,
        currentWordIndex: wordIndex
      }));
    });

    audio.addEventListener('ended', () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    });

    audio.addEventListener('play', () => {
      setState(prev => ({ ...prev, isPlaying: true }));
    });

    audio.addEventListener('pause', () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    });

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [chapterData]);

  const findCurrentSentence = (time: number, sentences: SentenceTiming[]): number => {
    for (let i = 0; i < sentences.length; i++) {
      if (time >= sentences[i].start && time <= sentences[i].end) {
        return i;
      }
    }
    return sentences.findIndex((s, i) =>
      i === sentences.length - 1 || time < sentences[i + 1].start
    );
  };

  const findCurrentWord = (time: number, words: WordTiming[]): number => {
    if (!words || words.length === 0) return -1;

    for (let i = 0; i < words.length; i++) {
      if (time >= words[i].start && time <= words[i].end) {
        return i;
      }
    }
    return -1;
  };

  const play = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const seekToProgress = useCallback((progress: number) => {
    if (audioRef.current) {
      const time = (progress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
    }
  }, []);

  const skipForward = useCallback((seconds: number = 10) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + seconds,
        audioRef.current.duration
      );
    }
  }, []);

  const skipBackward = useCallback((seconds: number = 10) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - seconds,
        0
      );
    }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
    }
  }, []);

  const goToSentence = useCallback((index: number) => {
    if (index >= 0 && index < chapterData.sentences.length) {
      // Add offset when seeking to a sentence
      seek(chapterData.sentences[index].start + audioOffset);
    }
  }, [chapterData.sentences, seek, audioOffset]);

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
