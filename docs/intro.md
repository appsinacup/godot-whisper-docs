---
sidebar_position: 1
---

# Getting Started

## Install The Plugin

1. Open your Godot project.
2. Open **AssetLib**.
3. Search for **Godot Whisper**.
4. Download and install the addon.
5. Enable it in **Project → Project Settings → Plugins**.

## Download Models

After enabling the plugin, open **Project → Tools → Whisper Models** and download:
- a Whisper language model for `language_model`
- (optionally) a Silero VAD model for `vad_model` when using realtime capture

Downloaded models are saved to:

```text
res://addons/godot_whisper/models/
```

:::tip Recommended first setup
Download `large-v3-turbo-q5_0` for desktop quality/speed balance.

Download `silero-v6.2.0` if you use `CaptureStreamToText` realtime microphone transcription.
:::

## Add A Transcription Node

For one-off WAV transcription, add `AudioStreamToText`.

For realtime microphone transcription, add `CaptureStreamToText`.

Set:

- `language_model` to a `WhisperResource` pointing at your Whisper `.bin`
- `vad_model` to a `WhisperResource` pointing at `ggml-silero-v6.2.0.bin` when using Silero VAD

## Audio Settings

Realtime capture resamples audio to 16 kHz before inference.

Optional: set **Project Settings → Audio → Driver → Mix Rate** to `16000` to avoid resampling overhead. This may reduce overall game audio quality, so only use it if speech transcription is the main audio workload.

## Next Steps

- [Whisper Models](documentation/models.md)
- [Voice Activity Detection](documentation/vad.md)
- [Realtime Transcription](documentation/realtime.md)
- [Nodes](documentation/nodes.md)
