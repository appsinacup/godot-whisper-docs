---
sidebar_position: 6
---

# Token Output

`SpeechToText.transcribe()` returns full text plus token metadata.

```gdscript
var result := speech_to_text.transcribe(samples, initial_prompt, 0)
if result.is_empty():
    return

var full_text: String = result.pop_front()
for token in result:
    print(token["id"], token["confidence"])
```

## Return Shape

```gdscript
[
    full_text,
    token_dict,
    token_dict,
    ...
]
```

## Token Dictionary

| Key | Type | Meaning |
|-----|------|---------|
| `id` | `int` | Whisper token id. |
| `p` | `float` | Token probability. |
| `confidence` | `float` | Alias for `p`, convenient for UI. |
| `plog` | `float` | Log probability. |
| `pt` | `float` | Timestamp probability. |
| `ptsum` | `float` | Timestamp probability sum. |
| `t0` | `int` | Token start timestamp unit from whisper.cpp. |
| `t1` | `int` | Token end timestamp unit from whisper.cpp. |
| `tid` | `int` | Timestamp token id. |
| `vlen` | `float` | Voice length metadata from whisper.cpp. |
| `text_bytes` | `PackedByteArray` | Raw token bytes. |

## Why `text_bytes`, Not `text`

Whisper token bytes are not always valid UTF-8 by themselves. A character can be split across multiple tokens.

For that reason, Godot Whisper does not expose token text as a Godot `String`. Use:

- `full_text` for display
- token ids/probabilities/timestamps for metadata
- `text_bytes` only if you know how to reconstruct UTF-8 safely

## Token Confidence UI

`CaptureStreamToText` emits display-safe tokens through:

```gdscript
transcribed_msg_tokens(is_complete, new_text, tokens)
```

Those display tokens contain:

| Key | Type | Meaning |
|-----|------|---------|
| `text` | `String` | Display-safe text chunk. |
| `confidence` | `float` | Confidence value mapped from Whisper token probabilities. |

The sample `LabelTranscribe` colors low confidence red and high confidence white.

```gdscript
capture.transcribed_msg_tokens.connect(label._on_speech_to_text_transcribed_msg_tokens)
```

## Token Timestamps

`token_timestamps` is enabled by default.

Disable it only if you do not need token timing metadata.
