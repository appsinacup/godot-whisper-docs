---
sidebar_position: 7
---

# Nodes

Godot Whisper provides a native `SpeechToText` node plus GDScript helpers for common workflows.

## SpeechToText

Core transcription node.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `language` | `Language` enum | `English` | Target language. Use `Auto` only with multilingual models. |
| `language_model` | `WhisperResource` | `null` | Whisper language model resource. Required before transcription. |
| `vad_model` | `WhisperResource` | `null` | Silero VAD model resource. Setting it enables Silero VAD. |
| `vad_threshold` | `float` | `0.5` | Silero speech probability threshold. |
| `vad_min_speech_duration_ms` | `int` | `250` | Minimum Silero speech segment duration. |
| `vad_min_silence_duration_ms` | `int` | `100` | Silence required before Silero splits segments. |
| `vad_max_speech_duration_s` | `float` | `0.0` | Maximum Silero segment length. `0.0` means unlimited. |
| `vad_speech_pad_ms` | `int` | `30` | Padding around Silero speech segments. |
| `vad_samples_overlap` | `float` | `0.1` | Overlap between Silero speech ranges, in seconds. |
| `token_timestamps` | `bool` | `true` | Enables token timestamp metadata. |
| `flash_attn` | `bool` | `true` | Enables flash attention when supported. Changing it reloads the model. |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `transcribe(buffer, initial_prompt, audio_ctx)` | `Array` | Runs Whisper on 16 kHz mono samples. Returns `[full_text, token_dict, ...]`. |
| `voice_activity_detection(buffer)` | `bool` | Simple energy-based VAD over recent samples. |
| `detect_speech_segments(buffer)` | `Array` | Runs Silero VAD and returns `[{ "start": cs, "end": cs }, ...]`. |
| `get_last_speech_segments()` | `Array` | Returns the latest Silero segments from the last `transcribe()` call. |
| `resample(buffer, interpolator_type)` | `PackedFloat32Array` | Resamples stereo `PackedVector2Array` audio to 16 kHz mono. |

### `transcribe()` Return Value

```gdscript
var result := speech_to_text.transcribe(samples, initial_prompt, 0)
var full_text: String = result.pop_front()
```

Remaining items are token dictionaries. See [Token Output](token-output.md).

## WhisperResource

Resource wrapper around a `.bin` model file.

| Property | Type | Description |
|----------|------|-------------|
| `file` | `String` | Path to the `.bin` model file. |

Use `WhisperResource` for both `language_model` and `vad_model`. This helps Godot export the model files.

## AudioStreamToText

Editor-friendly helper for one-shot `AudioStreamWAV` transcription.

| Property | Type | Description |
|----------|------|-------------|
| `initial_prompt` | `String` | Prompt passed to Whisper before decoding. |
| `audio_stream` | `AudioStreamWAV` | WAV file to transcribe. |
| `text` | `String` | Transcribed result. |
| `start_transcribe` | `bool` | Set from the Inspector to run transcription. |

Supported WAV formats:

- `AudioStreamWAV.FORMAT_8_BITS`
- `AudioStreamWAV.FORMAT_16_BITS`

For other audio sources, decode samples yourself or use `CaptureStreamToText` for live capture.

## CaptureStreamToText

Realtime microphone/audio-bus transcription helper.

It captures from an `AudioEffectCapture`, resamples to 16 kHz, runs `transcribe()` repeatedly, handles backlog, and emits text signals.

### Core Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `initial_prompt` | `String` | `""` | Prompt passed to Whisper. |
| `recording` | `bool` | `true` | Starts/stops capture thread. |
| `step_ms` | `int` | `1000` | Minimum new audio before another transcription. |
| `length_ms` | `int` | `5000` | Rolling audio window length. |
| `keep_ms` | `int` | `200` | Previous audio kept to avoid clipped words. |
| `emit_partial_results` | `bool` | `true` | Emit changing partial text. |
| `record_bus` | `String` | `"Record"` | Audio bus with `AudioEffectCapture`. |
| `audio_effect_capture_index` | `int` | `0` | Capture effect index on `record_bus`. |

### Backlog Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `max_pending_audio_ms` | `int` | `30000` | Max queued audio before dropping oldest queued samples. `0` means keep all queued audio. |

### Sentence Commit Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `commit_on_vad_silence` | `bool` | `true` | Commit after Silero sees trailing silence. Requires `vad_model`. |
| `commit_silence_ms` | `int` | `700` | Trailing silence required before commit. |
| `commit_on_stable_punctuation` | `bool` | `true` | Commit when punctuated text stays stable. |
| `stable_punctuation_steps` | `int` | `2` | Matching punctuated updates required. |
| `commit_on_window_timeout` | `bool` | `true` | Commit before rolling window drops old words. |

### Signals

| Signal | Description |
|--------|-------------|
| `transcribed_msg(is_complete, new_text)` | Plain text update. |
| `transcribed_msg_confidence(is_complete, new_text, confidence)` | Text update plus average display-token confidence. |
| `transcribed_msg_tokens(is_complete, new_text, tokens)` | Text update plus display tokens with confidence. |

`is_complete` means the realtime chunk was committed to history. It does not guarantee that Whisper detected a grammatical sentence boundary.

See [Realtime Transcription](realtime.md).

## LabelTranscribe

`RichTextLabel` helper for displaying realtime output.

It keeps completed text, shows partial text, and can color display tokens by confidence.

Connect it to:

```gdscript
capture_stream_to_text.transcribed_msg_tokens.connect(
    label_transcribe._on_speech_to_text_transcribed_msg_tokens
)
```

## ModelDownloader

Editor utility behind **Project → Tools → Whisper Models**.

It downloads models from Hugging Face to `res://addons/godot_whisper/models/`, marks downloaded models with `*`, and shows model size/memory guidance.

## Languages

The `Language` enum supports `Auto` and 99 languages.

Use `.en` models for English-only projects. Use multilingual models for non-English or mixed-language speech.

## Initial Prompt

`initial_prompt` can guide style, punctuation, vocabulary, or writing system.

Examples:

```text
以下是普通話的句子。
```

```text
The following is a punctuated transcript.
```
