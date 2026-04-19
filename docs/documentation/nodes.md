---
sidebar_position: 5
---

# Nodes

Godot Whisper provides a core C++ node (`SpeechToText`) and several GDScript helper scripts for common use cases.

---

## SpeechToText

`SpeechToText` extends `Node` and is the core transcription engine. All other helpers build on top of it.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `language` | `Language` enum | `English` (1) | Target language (99 languages + Auto) |
| `language_model` | `WhisperResource` | `null` | Whisper model `.bin` resource |
| `enable_vad` | `bool` | `false` | Enable Silero neural VAD in `transcribe()` |
| `vad_model_path` | `String` | `""` | Path to Silero VAD `.bin` model |
| `flash_attn` | `bool` | `true` | Enable flash attention (reloads model on change) |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `transcribe(buffer, initial_prompt, audio_ctx)` | `Array` | Run inference; returns `[full_text, {token_dicts}...]` |
| `voice_activity_detection(buffer)` | `bool` | Simple energy-based VAD |
| `detect_speech_segments(buffer)` | `Array` | Silero VAD; returns `[{start, end}...]` |
| `resample(buffer: PackedVector2Array)` | `PackedFloat32Array` | Resample stereo audio to 16 kHz mono |

### Enums

| Enum | Values | Description |
|------|--------|-------------|
| `Language` | 0–100 | `Auto` (0), `English` (1), `Chinese` (2), … 99 languages |
| `InterpolatorType` | 5 modes | Resampling interpolation modes |
| `SpeechSamplingRate` | `16000` | Expected input sample rate |

---

## WhisperResource

`WhisperResource` extends `Resource` and wraps a Whisper `.bin` model file.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `file` | `String` | Path to the `.bin` model file |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `get_content()` | `PackedByteArray` | Load and return the raw model bytes |

---

## GDScript Helpers

These are ready-made GDScript nodes that wrap `SpeechToText` for common workflows.

### AudioStreamToText

One-shot `AudioStreamWAV` transcription. Can be used **in the editor** (`@tool`-compatible) — add a WAV audio source and click the **start_transcribe** button.

Typical transcription time with the `tiny.en` model is ~0.3 s.

:::note Supported WAV formats
The `transcribe` function takes a `PackedFloat32Array` buffer. Currently only `AudioStreamWAV.FORMAT_8_BITS` and `AudioStreamWAV.FORMAT_16_BITS` are supported. For other formats, write a custom decoder or see how `CaptureStreamToText` handles runtime decoding.
:::

### CaptureStreamToText

Real-time microphone transcription with configurable VAD, sentence detection, and audio bus capture. Captures audio from the microphone, **resamples** it to 16 kHz if necessary, and runs `transcribe` every `transcribe_interval`.

**Signal:** `transcribed_msg(is_complete: bool, new_text: String)`

This is the node to use for **realtime** speech-to-text in your game or application.

### LabelTranscribe

`RichTextLabel` display helper that connects to `CaptureStreamToText` output and renders transcribed text automatically.

### ModelDownloader

Editor utility to download Whisper and VAD models directly from Hugging Face without leaving the Godot editor.

---

## Flash Attention

Flash Attention reduces memory usage and improves inference speed, especially for longer audio. It is **enabled by default** — disable it via the `flash_attn` property on the `SpeechToText` node if needed.

## Supported Languages

The plugin supports **99 languages** via the `Language` enum on the `SpeechToText` node. Set to `Auto` for automatic language detection (multilingual models only).

For best results with English, use English-only models (`.en` suffix). For other languages, use multilingual models and set the `language` property.

See the [OpenAI Whisper paper](https://cdn.openai.com/papers/whisper.pdf) for detailed per-language accuracy benchmarks.

## Initial Prompt

For Chinese, if you want to select between Traditional and Simplified, provide an initial prompt with the variant you want — the model should continue with that variant. See [Whisper Discussion #277](https://github.com/openai/whisper/discussions/277).

If you have problems with punctuation, you can give it an initial prompt with punctuation. See [Whisper Discussion #194](https://github.com/openai/whisper/discussions/194).
