/**
 * Web Audio API Acoustic Soundscape & Harmonic Synthesizer
 * Provides calming ambient background resonance, molecular sound effects (unwinding, base pairing, peptide bond click),
 * and dynamic voice narration processing inspired by gentle educational biology documentaries.
 */

class AudioAtmosphereService {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private oscillators: OscillatorNode[] = [];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Plays a very soft, soothing 432Hz ambient chord (warm documentary soundtrack pad)
   */
  public startAmbientAtmosphere() {
    if (this.isAmbientPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 3);
      this.ambientGain.connect(this.ctx.destination);

      // Warm F-Major / D-minor ethereal frequencies: 174Hz, 216Hz, 288Hz, 432Hz (harmonic relaxation)
      const freqs = [174.0, 216.0, 288.0, 432.0];
      this.oscillators = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);
        
        // Gentle LFO slow vibrato for calm soothing warmth
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.setValueAtTime(0.15 + i * 0.05, this.ctx!.currentTime);
        lfoGain.gain.setValueAtTime(1.2, this.ctx!.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(this.ambientGain!);
        osc.start();
        return osc;
      });

      this.isAmbientPlaying = true;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbientAtmosphere() {
    if (!this.isAmbientPlaying || !this.ctx || !this.ambientGain) return;
    try {
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.oscillators = [];
        this.isAmbientPlaying = false;
      }, 1600);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Sound effect for smooth stage transitions (soft cinematic chime)
   */
  public playTransitionChime() {
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, now); // 528 Hz transformation frequency
      osc.frequency.exponentialRampToValueAtTime(792, now + 0.6);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch {
      // ignore
    }
  }

  /**
   * Play molecular action sound (Helicase unzip, ribosome click)
   */
  public playMolecularSnap() {
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // ignore
    }
  }
}

export const audioAtmosphere = new AudioAtmosphereService();
