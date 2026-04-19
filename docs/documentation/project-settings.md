---
sidebar_position: 6
---

# Project Settings

Godot Whisper exposes several global audio settings under **Project → Project Settings → Audio → Input → Transcribe**.

| Setting Path | Type | Default | Description |
|-------------|------|---------|-------------|
| `audio/input/transcribe/entropy_treshold` | `float` | `2.8` | Entropy threshold for transcription filtering |
| `audio/input/transcribe/freq_treshold` | `float` | `200.0` | Frequency threshold (Hz) for energy-based VAD high-pass filter |
| `audio/input/transcribe/max_tokens` | `int` | `16` | Maximum tokens per transcription segment |
| `audio/input/transcribe/vad_treshold` | `float` | `2.0` | Energy ratio threshold for energy-based VAD |
| `audio/input/transcribe/use_gpu` | `bool` | `true` | Enable GPU acceleration (Metal/OpenCL/Vulkan) |

:::tip
These settings apply globally to all transcription nodes. Per-node overrides (e.g. VAD, language) are configured on the `SpeechToText` node directly.
:::

## entropy_treshold

Controls how "uncertain" the model is allowed to be. Segments with entropy above this value are discarded. Lower values make filtering stricter (fewer hallucinated segments), higher values are more permissive.

## freq_treshold

High-pass filter cutoff for the energy-based VAD. Audio energy below this frequency is ignored when deciding whether a frame contains speech. Increase if you have low-frequency background noise.

## max_tokens

Limits the number of tokens the model produces per segment. Keeping this low prevents the model from generating long hallucinated runs on silent or noisy audio.

## vad_treshold

Energy ratio threshold for the built-in energy-based voice activity detection. Frames whose energy ratio falls below this value are considered silence. This is separate from Silero neural VAD — see [Voice Activity Detection](vad.md).

## use_gpu

When `true`, inference runs on the GPU using the platform's backend (Metal on macOS/iOS, OpenCL + Vulkan on Windows/Linux/Android, WebGPU on Web). Set to `false` to force CPU-only inference.
