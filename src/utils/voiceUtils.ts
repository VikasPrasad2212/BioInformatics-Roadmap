/**
 * High-quality soothing voice narrator configured according to natural science documentary cadences
 * (matching the clear, soothing, instructional style of educator voiceovers such as in the referenced YouTube Central Dogma video).
 */

export interface VoicePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  rate: number;
  pitch: number;
}

export const SOOTHING_VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'documentary-female',
    name: 'Soothing Educator (Video Inspired)',
    badge: '🎙️ Soothing Educator',
    description: 'Calm, measured, warm female tone with natural scientific pacing inspired by online video lectures.',
    rate: 0.88,
    pitch: 1.02,
  },
  {
    id: 'natural-warm',
    name: 'Gentle & Warm Female',
    badge: '🌸 Warm Tone',
    description: 'Very soft, warm, friendly educational cadence.',
    rate: 0.84,
    pitch: 1.08,
  },
  {
    id: 'crisp-lecture',
    name: 'Crisp Studio Voice',
    badge: '💎 Studio Clear',
    description: 'Crisp articulation with balanced studio modulation.',
    rate: 0.95,
    pitch: 1.0,
  },
];

export function getBestSoothingFemaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Filter for English voices first
  const englishVoices = voices.filter(
    (v) => v.lang.startsWith('en') || v.lang.startsWith('EN')
  );

  const voicePool = englishVoices.length > 0 ? englishVoices : voices;

  let bestVoice: SpeechSynthesisVoice | null = null;
  let highestScore = -1;

  for (const voice of voicePool) {
    const name = voice.name.toLowerCase();
    let score = 0;

    // Check for high-quality natural indicators
    if (name.includes('natural') || name.includes('online') || name.includes('neural')) score += 70;
    if (name.includes('google') || name.includes('microsoft')) score += 30;
    
    // Female voice names ranked for documentary softness
    if (name.includes('samantha')) score += 55;
    if (name.includes('victoria')) score += 50;
    if (name.includes('jenny')) score += 60;
    if (name.includes('aria')) score += 60;
    if (name.includes('ava') || name.includes('serena') || name.includes('karen')) score += 45;
    if (name.includes('zira') || name.includes('moira') || name.includes('fiona')) score += 35;
    if (name.includes('female')) score += 30;

    // Regional preference for clean en-US / en-GB
    if (voice.lang.includes('US') || voice.lang.includes('GB') || voice.lang.includes('AU')) score += 15;

    // Penalize robotic male default profiles
    if (name.includes('david') || name.includes('mark') || name.includes('george') || name.includes('male')) {
      score -= 80;
    }

    if (score > highestScore) {
      highestScore = score;
      bestVoice = voice;
    }
  }

  return bestVoice || voicePool[0] || null;
}

export function createSoothingFemaleUtterance(
  text: string,
  speedMultiplier = 1.0,
  presetId = 'documentary-female',
  onEnd?: () => void,
  onError?: () => void
): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  
  const preset = SOOTHING_VOICE_PRESETS.find((p) => p.id === presetId) || SOOTHING_VOICE_PRESETS[0];

  // Apply soothing pacing & pitch adjusted by user playback speed multiplier
  utterance.rate = Math.max(0.65, Math.min(1.5, preset.rate * speedMultiplier));
  utterance.pitch = preset.pitch;
  
  const voice = getBestSoothingFemaleVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }

  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  return utterance;
}
