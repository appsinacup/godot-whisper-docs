---
sidebar_position: 5
---

# Nodes

Godot Whisper provides two main node types for speech-to-text.

## AudioStreamToText

`AudioStreamToText` can be used **in the editor** to test transcription. Add a WAV audio source and click the **start_transcribe** button.

Typical transcription time with the `tiny.en` model is ~0.3 s.

:::note Supported WAV formats
The `transcribe` function takes a `PackedFloat32Array` buffer. Currently only `AudioStreamWAV.FORMAT_8_BITS` and `AudioStreamWAV.FORMAT_16_BITS` are supported. For other formats, write a custom decoder or see how `CaptureStreamToText` handles runtime decoding.
:::

## CaptureStreamToText

`CaptureStreamToText` captures audio from the microphone, **resamples** it to 16 kHz if necessary, and runs the `transcribe` function every `transcribe_interval`.

This is the node to use for **realtime** speech-to-text in your game or application.

## Flash Attention

Flash Attention reduces memory usage and improves inference speed, especially for longer audio. It is **enabled by default** — disable it via the `flash_attn` property on the `SpeechToText` node if needed.

## Supported Languages

The plugin supports **99 languages** via the `Language` enum on the `SpeechToText` node. Set to `Auto` for automatic language detection (multilingual models only).

For best results with English, use English-only models (`.en` suffix). For other languages, use multilingual models and set the `language` property.

See the [OpenAI Whisper paper](https://cdn.openai.com/papers/whisper.pdf) for detailed per-language accuracy benchmarks.

## Initial Prompt

For Chinese, if you want to select between Traditional and Simplified, provide an initial prompt with the variant you want — the model should continue with that variant. See [Whisper Discussion #277](https://github.com/openai/whisper/discussions/277).

If you have problems with punctuation, you can give it an initial prompt with punctuation. See [Whisper Discussion #194](https://github.com/openai/whisper/discussions/194).
