---
sidebar_position: 5
---

# Realtime Transcription

Use `CaptureStreamToText` for microphone or audio-bus transcription.

## Basic Setup

1. Add an audio bus, for example `Record`.
2. Add `AudioEffectCapture` to that bus.
3. Add a `CaptureStreamToText` node.
4. Set `record_bus` to the bus name.
5. Set `language_model` to a Whisper `WhisperResource`.
6. Optional but recommended: set `vad_model` to Silero VAD.
7. Connect `transcribed_msg_tokens` to a display label.

## Window Settings

`CaptureStreamToText` uses a rolling audio window.

| Property | Default | Meaning |
|----------|---------|---------|
| `step_ms` | `1000` | Minimum new audio before attempting another transcription. |
| `length_ms` | `5000` | Maximum rolling context sent to Whisper. |
| `keep_ms` | `200` | Audio kept from previous window to avoid clipped words. |

Smaller `step_ms` means lower latency and more frequent work. Larger `length_ms` means more context and more compute. Avoid windows over 30 seconds.

Suggested values:

| Scenario | `step_ms` | `length_ms` | `keep_ms` |
|----------|-----------|-------------|-----------|
| Fast/small model | `1000` | `5000` | `200` |
| Large desktop model | `1500` | `10000` | `500` |
| More stable text | `2000` | `10000` | `500` |

## Backlog Handling

Large models can decode slower than realtime.

`CaptureStreamToText` queues captured audio instead of immediately dropping it. If queued audio exceeds `max_pending_audio_ms`, it drops the oldest queued audio and prints a warning.

| Property | Default | Meaning |
|----------|---------|---------|
| `max_pending_audio_ms` | `30000` | Maximum queued audio. `0` keeps all queued audio. |

For large models such as `large-v3-turbo`, increase `step_ms` and `length_ms` rather than using a 1-second step forever.

Example:

```gdscript
capture.step_ms = 1500
capture.length_ms = 10000
capture.keep_ms = 500
capture.max_pending_audio_ms = 30000
```

## Sentence Commit

Realtime text has two states:

- partial text still changing
- committed text added to history

`is_complete = true` means committed. Commit can happen from VAD silence, stable punctuation, or window timeout.

| Property | Default | Meaning |
|----------|---------|---------|
| `commit_on_vad_silence` | `true` | Commit when Silero sees enough trailing silence. |
| `commit_silence_ms` | `700` | Required silence after last speech segment. |
| `commit_on_stable_punctuation` | `true` | Commit when punctuated text is stable. |
| `stable_punctuation_steps` | `2` | Matching punctuated updates required. |
| `commit_on_window_timeout` | `true` | Commit before old audio leaves the rolling window. |

`is_complete` does not mean Whisper has a perfect sentence boundary. It means the realtime stream chose a stable boundary.

## Output Signals

```gdscript
capture.transcribed_msg.connect(_on_text)
capture.transcribed_msg_confidence.connect(_on_text_confidence)
capture.transcribed_msg_tokens.connect(_on_text_tokens)
```

Prefer `transcribed_msg_tokens` for UI. It lets you color words/tokens by confidence.

```gdscript
func _on_text_tokens(is_complete: bool, text: String, tokens: Array) -> void:
    for token in tokens:
        print(token["text"], token["confidence"])
```

## VAD Recommended

For realtime capture, download `silero-v6.2.0` and set `vad_model`.

Silero helps:

- reduce silence hallucinations
- find speech/silence boundaries
- commit text after speech ends

See [Voice Activity Detection](vad.md).
