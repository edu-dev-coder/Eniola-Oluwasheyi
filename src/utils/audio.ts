// Web Audio API ambient wedding melody generator
class WeddingAmbianceAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;

  // Gentle pentatonic traditional African kalimba / highlife chime notes (in Hz)
  private pentatonicScale = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  public start(): boolean {
    if (this.isPlaying) return true;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isPlaying = true;
      this.scheduleNextNote();
      return true;
    } catch (e) {
      console.warn('AudioContext failed to initialize', e);
      return false;
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private scheduleNextNote(): void {
    if (!this.isPlaying || !this.ctx) return;

    this.playChime();

    // Gentle rhythmic tempo (approx 450ms to 900ms between delicate chimes)
    const delay = Math.random() > 0.4 ? 500 : 1000;
    this.timer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, delay);
  }

  private playChime(): void {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const note = this.pentatonicScale[Math.floor(Math.random() * this.pentatonicScale.length)];
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, this.ctx.currentTime);

    // Warm soft bell envelope
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.9);
  }
}

export const weddingAudio = new WeddingAmbianceAudio();
