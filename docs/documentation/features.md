---
sidebar_position: 1
---

# Features

The following features are made available from [Whisper.CPP](https://github.com/ggml-org/whisper.cpp).

- **GPU acceleration** — supports accelerated backends where available, controlled by `audio/input/transcribe/use_gpu`.
- **Flash Attention** — enabled by default through `flash_attn`.
- **Silero VAD** — neural VAD can trim silence, detect speech segments, reduce hallucinations, and drive realtime commit after silence.
- **Simple energy VAD** — available through `voice_activity_detection()` and project settings for lightweight checks.
- **Quantized models** — Q5_0, Q5_1, and Q8_0 models reduce download size and runtime memory.
- **Token metadata** — `transcribe()` returns token ids, confidence, timestamps, and raw token bytes.
- **Confidence display** — sample label can color display tokens from low confidence red to high confidence white.
- **99 languages** — choose a language on the node or use `Auto` with multilingual models.

## Video Tutorial

[![Video Tutorial](https://img.youtube.com/vi/fAgjNkfBOKs/0.jpg)](https://www.youtube.com/watch?v=fAgjNkfBOKs&t=10s)
