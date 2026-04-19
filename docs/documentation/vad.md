---
sidebar_position: 4
---

# Voice Activity Detection (VAD)

Silero VAD is a neural network that detects speech segments and auto-strips silence during transcription, **preventing hallucinations** from silent audio.

## Setup

1. Download `ggml-silero-v6.2.0.bin` (~1.9 MB) — available in the Godot editor model downloader or from [Hugging Face](https://huggingface.co/ggml-org/whisper-vad).
2. Set `vad_model_path` on the `SpeechToText` node.
3. Set `enable_vad = true`.

When enabled, `transcribe()` automatically filters out silence before processing.

## Manual Speech Segment Detection

You can also detect speech segments manually:

```gdscript
var segments = stt.detect_speech_segments(audio_buffer)
for seg in segments:
    print("Speech from %.2fs to %.2fs" % [seg.start, seg.end])
```
