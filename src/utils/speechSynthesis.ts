export class AudiobookPlayer {
  private utterances: SpeechSynthesisUtterance[] = [];
  private currentIndex: number = 0;
  private isPaused: boolean = false;
  private currentRate: number = 0.9;
  private onHighlightChange: (index: number) => void;
  private onPlayStateChange: (isPlaying: boolean) => void;
  private onProgressChange: (progress: number) => void;
  
  constructor(
    onHighlightChange: (index: number) => void,
    onPlayStateChange: (isPlaying: boolean) => void,
    onProgressChange: (progress: number) => void
  ) {
    this.onHighlightChange = onHighlightChange;
    this.onPlayStateChange = onPlayStateChange;
    this.onProgressChange = onProgressChange;
  }

  loadText(textArray: string[]) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    this.utterances = [];
    
    // Create utterances for each line
    textArray.forEach((text, index) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.currentRate;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        this.onHighlightChange(index);
        this.onPlayStateChange(true);
      };
      
      utterance.onend = () => {
        const progress = ((index + 1) / textArray.length) * 100;
        this.onProgressChange(progress);
        
        if (index < textArray.length - 1) {
          this.currentIndex = index + 1;
          this.playCurrentUtterance();
        } else {
          this.onPlayStateChange(false);
          this.currentIndex = 0;
        }
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        this.onPlayStateChange(false);
      };
      
      this.utterances.push(utterance);
    });
  }

  private playCurrentUtterance() {
    if (this.currentIndex < this.utterances.length) {
      window.speechSynthesis.speak(this.utterances[this.currentIndex]);
    }
  }

  play() {
    if (this.isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.onPlayStateChange(true);
    } else {
      this.playCurrentUtterance();
    }
  }

  pause() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.onPlayStateChange(false);
    }
  }

  stop() {
    window.speechSynthesis.cancel();
    this.currentIndex = 0;
    this.isPaused = false;
    this.onPlayStateChange(false);
  }

  skipForward() {
    window.speechSynthesis.cancel();
    if (this.currentIndex < this.utterances.length - 1) {
      this.currentIndex++;
      const progress = ((this.currentIndex + 1) / this.utterances.length) * 100;
      this.onProgressChange(progress);
      this.playCurrentUtterance();
    }
  }

  skipBackward() {
    window.speechSynthesis.cancel();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const progress = ((this.currentIndex + 1) / this.utterances.length) * 100;
      this.onProgressChange(progress);
      this.playCurrentUtterance();
    }
  }

  jumpToLine(index: number) {
    window.speechSynthesis.cancel();
    this.currentIndex = index;
    const progress = ((index + 1) / this.utterances.length) * 100;
    this.onProgressChange(progress);
    this.onHighlightChange(index);
    this.playCurrentUtterance();
  }

  setRate(rate: number) {
    this.currentRate = rate;
    this.utterances.forEach(utterance => {
      utterance.rate = rate;
    });
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  isPlaying(): boolean {
    return window.speechSynthesis.speaking && !window.speechSynthesis.paused;
  }
}
