---
sidebar_position: 3
---

# Whisper Models

Godot Whisper uses [Whisper.CPP](https://github.com/ggml-org/whisper.cpp) `.bin` models.

Download models from **Project → Tools → Whisper Models** or manually from [Hugging Face](https://huggingface.co/ggerganov/whisper.cpp/tree/main).

## Editor Model Window

Open:

```text
Project → Tools → Whisper Models
```

Select a model to download. Click `Download`.

Downloaded files are saved to:

```text
res://addons/godot_whisper/models/
```

## Model Resources

Set:

- `language_model` to a Whisper language model. Eg. `large-v3-turbo-q5_0`
- `vad_model` to a Silero VAD model if using neural VAD. Eg. `silero-v6.2.0`

## Recommended Models

| Use Case | Suggested Model |
|----------|-----------------|
| Fast prototype | `tiny.en`, `tiny`, or quantized tiny |
| Realtime desktop | `small`, `small-q5_1`, or `large-v3-turbo-q5_0` |
| Best desktop quality | `large-v3`, `large-v3-turbo`, or quantized variants |
| English only | `.en` model when available |
| Non-English or mixed language | multilingual model without `.en` |
| Lower memory/download | quantized `q5_*` or `q8_0` |

## Multilingual Models

| Model | Download | Approx Runtime Memory | Best For |
|-------|---------:|----------------------:|----------|
| `tiny` | 74.1 MiB | ~250 MiB | Fast prototypes, low-end devices |
| `tiny-q5_1` | 30.7 MiB | ~180 MiB | Fast prototypes, low-end devices. |
| `tiny-q8_0` | 41.5 MiB | ~220 MiB | Fast prototypes, low-end devices. |
| `base` | 141.1 MiB | ~350 MiB | Mobile and realtime tests |
| `base-q5_1` | 56.9 MiB | ~250 MiB | Mobile and realtime tests |
| `base-q8_0` | 78.0 MiB | ~300 MiB | Mobile and realtime tests |
| `small` | 465.0 MiB | ~800 MiB | Good speed/quality balance |
| `small-q5_1` | 181.3 MiB | ~450 MiB | Good speed/quality balance |
| `small-q8_0` | 252.2 MiB | ~550 MiB | Good speed/quality balance |
| `medium` | 1.43 GiB | ~2.2 GiB | High quality when latency matters less |
| `medium-q5_0` | 514.2 MiB | ~900 MiB | High quality when latency matters less |
| `medium-q8_0` | 785.2 MiB | ~1.3 GiB | High quality when latency matters less |
| `large-v1` | 2.88 GiB | ~4.5 GiB | Legacy large model |
| `large-v2` | 2.88 GiB | ~4.5 GiB | Whisper v2 quality |
| `large-v2-q5_0` | 1.01 GiB | ~1.7 GiB | Whisper v2 quality |
| `large-v2-q8_0` | 1.54 GiB | ~2.4 GiB | Whisper v2 quality |
| `large-v3` | 2.88 GiB | ~4.5 GiB | Best multilingual accuracy |
| `large-v3-q5_0` | 1.01 GiB | ~1.7 GiB | Best multilingual accuracy |
| `large-v3-turbo` | 1.51 GiB | ~2.2 GiB | Best multilingual accuracy |
| `large-v3-turbo-q5_0` | 547.4 MiB | ~1.0 GiB | * Recommended desktop default |
| `large-v3-turbo-q8_0` | 833.7 MiB | ~1.4 GiB | Best multilingual accuracy |

:::note
Runtime memory is approximate. Backend, GPU/CPU buffers, flash attention, audio length, and platform can change actual memory use.
:::

## English-Only Models

English-only models use `.en`. They are usually faster and more accurate for English, but they are not appropriate for non-English speech.

| Model | Download | Approx Runtime Memory |
|-------|---------:|----------------------:|
| `tiny.en` | 74.1 MiB | ~250 MiB |
| `tiny.en-q5_1` | 30.7 MiB | ~180 MiB |
| `tiny.en-q8_0` | 41.5 MiB | ~220 MiB |
| `base.en` | 141.1 MiB | ~350 MiB |
| `base.en-q5_1` | 57.0 MiB | ~250 MiB |
| `base.en-q8_0` | 78.0 MiB | ~300 MiB |
| `small.en` | 465.0 MiB | ~800 MiB |
| `small.en-q5_1` | 181.3 MiB | ~450 MiB |
| `small.en-q8_0` | 252.2 MiB | ~550 MiB |
| `medium.en` | 1.43 GiB | ~2.2 GiB |
| `medium.en-q5_0` | 514.2 MiB | ~900 MiB |
| `medium.en-q8_0` | 785.2 MiB | ~1.3 GiB |

## Silero VAD Models

Silero models are not language models. Use them only for `vad_model`.

| Model | Download | Approx Runtime Memory | Notes |
|-------|---------:|----------------------:|-------|
| `silero-v6.2.0` | 0.8 MiB | ~3 MiB | Recommended VAD model |
| `silero-v5.1.2` | 0.8 MiB | ~3 MiB | Older VAD model |

## Quantized Models

Quantized models store weights with lower precision.

| Format | Effect |
|--------|--------|
| `q5_0`, `q5_1` | Much smaller files and memory use, usually good quality. |
| `q8_0` | Larger than q5, usually closer to full precision. |
| Full precision | Largest files and highest memory use. |

For realtime work, quantized models are usually better unless device is powerful enough for full precision.
