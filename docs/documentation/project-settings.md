---
sidebar_position: 8
---

# Project Settings

Godot Whisper exposes global transcription defaults under **Project → Project Settings → Audio → Input → Transcribe**.

These are shared by every `SpeechToText`, `AudioStreamToText`, and `CaptureStreamToText` node in the project.

:::note
Some setting names use `treshold` instead of `threshold`. This spelling is part of the current setting path and must be used exactly.
:::

## Global Transcription Settings

| Setting Path | Type | Default | Description |
|-------------|------|---------|-------------|
| `audio/input/transcribe/entropy_treshold` | `float` | `2.8` | Discards unstable or hallucinated output when decoder entropy is too high. Lower is stricter. |
| `audio/input/transcribe/freq_treshold` | `float` | `200.0` | High-pass cutoff for the simple energy VAD. Helps ignore low-frequency noise. |
| `audio/input/transcribe/max_tokens` | `int` | `0` | Maximum tokens per segment. `0` means no explicit cap. |
| `audio/input/transcribe/vad_treshold` | `float` | `2.0` | Ratio used by the simple energy VAD helper. Separate from Silero neural VAD. |
| `audio/input/transcribe/use_gpu` | `bool` | `true` | Enables GPU inference when the build/platform supports it. |

## Setting Details

### `entropy_treshold`

Controls how uncertain the model is allowed to be before a segment is treated as unreliable.

Lower values reject more output and can reduce hallucinations on silence or noise. Higher values allow more uncertain text through.

### `freq_treshold`

Used by the simple energy-based VAD helper. Audio energy below this frequency is ignored when deciding whether audio contains speech.

Increase this if low-frequency hum or rumble triggers false speech.

### `max_tokens`

Limits how many tokens Whisper can produce for each segment.

Default `0` keeps Whisper unrestricted. Setting a small value can reduce long repeated hallucinations, but it may also cut legitimate long text.

### `vad_treshold`

Used by the simple energy VAD helper, not by Silero VAD.

Silero VAD is configured on the node with a `vad_model` resource and `vad_*` properties.

### `use_gpu`

When `true`, Whisper tries to use the available accelerated backend, such as Metal on Apple platforms. Set it to `false` to force CPU inference.

VAD currently runs CPU-only.

## Editor Model Window

After enabling the plugin, open **Project → Tools → Whisper Models**.

The model window can download Whisper language models and Silero VAD models. Each selected model shows:

- download size
- approximate runtime RAM/VRAM use
- when the model is already downloaded
- `*` in the dropdown for downloaded models
- `Download` or `Redownload` depending on whether the file exists
- a link to the model guide

Use this window instead of manually copying files when possible. Models are saved under:

```text
res://addons/godot_whisper/models/
```

## Language Model Resource

Set `language_model` on `SpeechToText` or `CaptureStreamToText` to a `WhisperResource`.

This resource points to the `.bin` model file. Using a resource matters for exported games because Godot can track and export the model file.

Recommended model choices:

| Use Case | Suggested Model |
|----------|-----------------|
| Fast prototype | `tiny.en`, `tiny`, or quantized tiny |
| Realtime desktop | `small`, `small-q5_1`, or `large-v3-turbo-q5_0` |
| Best desktop quality | `large-v3`, `large-v3-turbo`, or quantized variants |
| English only | `.en` model when available |
| Non-English or mixed language | multilingual model without `.en` |
| Lower memory/download | quantized `q5_*` or `q8_0` |

See [Whisper Models](models.md) for the full model guide.

## Silero VAD Resource

Set `vad_model` to a `WhisperResource` that points to `ggml-silero-v6.2.0.bin` or another supported Silero VAD model.

Silero VAD is used to:

- trim silence before Whisper transcription
- find speech segments
- support realtime sentence/window commit logic in `CaptureStreamToText`

### VAD Node Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `vad_model` | `WhisperResource` | `null` | Silero VAD model resource. Setting this enables Silero VAD. |
| `vad_threshold` | `float` | `0.5` | Speech probability threshold. Higher is stricter. |
| `vad_min_speech_duration_ms` | `int` | `250` | Minimum speech segment duration. |
| `vad_min_silence_duration_ms` | `int` | `100` | Minimum silence duration before splitting speech. |
| `vad_max_speech_duration_s` | `float` | `0.0` | Maximum speech segment length. `0.0` means unlimited. |
| `vad_speech_pad_ms` | `int` | `30` | Padding added around detected speech. |
| `vad_samples_overlap` | `float` | `0.1` | Overlap between adjacent VAD ranges, in seconds. |

## Token Timestamps And Confidence

`SpeechToText` exposes token-level metadata from Whisper. See [Token Output](token-output.md) for details.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `token_timestamps` | `bool` | `true` | Enables token timestamps and token timing metadata. |
| `flash_attn` | `bool` | `true` | Enables flash attention when supported by the backend. |

`transcribe()` returns:

```gdscript
[full_text, token_dict, token_dict, ...]
```

Each token dictionary contains:

- `id`
- `p`
- `confidence`
- `plog`
- `pt`
- `ptsum`
- `t0`
- `t1`
- `tid`
- `vlen`
- `text_bytes`

`text_bytes` is a `PackedByteArray`. Token text is not exposed as a Godot `String` because individual Whisper token bytes can be invalid UTF-8. Use the segment/full text for display, and use token ids/probabilities/timestamps for metadata.

## Realtime Capture Settings

`CaptureStreamToText` adds realtime settings on top of `SpeechToText`. See [Realtime Transcription](realtime.md) for a workflow guide.

### Audio Window

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `step_ms` | `int` | `1000` | Minimum new audio before attempting another transcription. Lower latency, more work. |
| `length_ms` | `int` | `5000` | Rolling audio window sent to Whisper. More context, more cost. |
| `keep_ms` | `int` | `200` | Audio kept from the previous window to avoid clipped words. |
| `emit_partial_results` | `bool` | `true` | Emits text while the current window is still changing. |

Whisper works best with enough context. Larger windows can improve accuracy, but they increase latency and compute cost. Avoid windows over 30 seconds.

Suggested values:

| Scenario | `step_ms` | `length_ms` | `keep_ms` |
|----------|-----------|-------------|-----------|
| Small realtime model | `1000` | `5000` | `200` |
| Larger desktop model | `1500` | `10000` | `500` |
| More stable text | `2000` | `10000` | `500` |

### Realtime Backlog

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `max_pending_audio_ms` | `int` | `30000` | Maximum queued audio before dropping the oldest audio. Set `0` to keep all queued audio. |

Large models can decode slower than realtime. When that happens, Godot Whisper queues audio instead of immediately dropping it. This preserves speech but increases latency. If queued audio exceeds `max_pending_audio_ms`, the oldest queued audio is dropped and a warning is printed.

### Sentence Commit

`CaptureStreamToText` emits `is_complete = true` when it commits the current text to history.

Commit can happen through three checks:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `commit_on_vad_silence` | `bool` | `true` | Commit after Silero VAD sees enough trailing silence. Requires `vad_model`. |
| `commit_silence_ms` | `int` | `700` | Required silence after the last detected speech segment. |
| `commit_on_stable_punctuation` | `bool` | `true` | Commit when punctuated text is stable across multiple transcriptions. |
| `stable_punctuation_steps` | `int` | `2` | Matching punctuated transcriptions required before committing. |
| `commit_on_window_timeout` | `bool` | `true` | Commit before the rolling audio window would drop old words. |

`is_complete` does not mean Whisper knows a grammatical sentence ended. It means Godot Whisper committed a realtime chunk using VAD silence, stable punctuation, or window timeout.

## Realtime Output Signals

`CaptureStreamToText` emits:

| Signal | Description |
|--------|-------------|
| `transcribed_msg(is_complete, new_text)` | Plain text update. |
| `transcribed_msg_confidence(is_complete, new_text, confidence)` | Text update plus average confidence. |
| `transcribed_msg_tokens(is_complete, new_text, tokens)` | Text update plus display token confidence data. |

The sample display colors tokens from low-confidence red to high-confidence white.

## One-Off Transcription

For file/audio-clip transcription, use `SpeechToText.transcribe()` or `AudioStreamToText`.

Realtime-only properties such as `step_ms`, `length_ms`, `keep_ms`, backlog, and sentence commit are only used by `CaptureStreamToText`.
