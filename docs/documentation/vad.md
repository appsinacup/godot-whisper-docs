---
sidebar_position: 4
---

# Voice Activity Detection

Godot Whisper has two VAD paths:

- **Silero neural VAD** through `vad_model`
- **Simple energy VAD** through `voice_activity_detection()` and project settings

Use Silero for most projects.

## Silero VAD Setup

1. Open **Project → Tools → Whisper Models**.
2. Download `silero-v6.2.0`.
3. Set `vad_model` on `SpeechToText` or `CaptureStreamToText` to the downloaded `WhisperResource`.

## What Silero Does

When `vad_model` is set, `transcribe()`:

1. runs Silero VAD over the input samples
2. extracts speech ranges
3. adds short silence between ranges
4. sends only speech audio to Whisper

This reduces silence hallucinations and improves realtime sentence/window commit.

## VAD Properties

| Property | Default | Description |
|----------|---------|-------------|
| `vad_model` | `null` | Silero VAD `WhisperResource`. Setting this enables Silero. |
| `vad_threshold` | `0.5` | Speech probability threshold. Higher means stricter speech detection. |
| `vad_min_speech_duration_ms` | `250` | Ignores speech shorter than this. |
| `vad_min_silence_duration_ms` | `100` | Silence required before splitting segments. |
| `vad_max_speech_duration_s` | `0.0` | Maximum speech segment length. `0.0` means unlimited. |
| `vad_speech_pad_ms` | `30` | Padding around detected speech. |
| `vad_samples_overlap` | `0.1` | Overlap between adjacent VAD ranges, in seconds. |

## Manual Segment Detection

Use `detect_speech_segments()` to inspect VAD ranges yourself.

```gdscript
var segments := speech_to_text.detect_speech_segments(audio_buffer)
for segment in segments:
    print("Speech from %.2fs to %.2fs" % [
        float(segment["start"]) / 100.0,
        float(segment["end"]) / 100.0,
    ])
```

Segment values are in centiseconds, matching whisper.cpp VAD segment timing.

## Realtime Commit

`CaptureStreamToText` can commit text when Silero detects trailing silence.

Relevant settings:

| Property | Default | Description |
|----------|---------|-------------|
| `commit_on_vad_silence` | `true` | Commit after detected speech has ended. |
| `commit_silence_ms` | `700` | Required trailing silence. |

See [Realtime Transcription](realtime.md).

## Simple Energy VAD

`voice_activity_detection(buffer)` uses an energy ratio check over recent samples.

Global project settings:

- `audio/input/transcribe/vad_treshold`
- `audio/input/transcribe/freq_treshold`

Use it for lightweight checks. It is not a replacement for Silero in noisy realtime transcription.
