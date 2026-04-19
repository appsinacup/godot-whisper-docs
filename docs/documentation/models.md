---
sidebar_position: 3
---

# Whisper Models

All OpenAI Whisper models are supported. Load the corresponding `.bin` file — no code changes needed. Models can be downloaded directly in the Godot editor or from [Hugging Face](https://huggingface.co/ggerganov/whisper.cpp/tree/main).

## Multilingual Models

| Model | Params | Full (f16) | Q8_0 | Q5_0 / Q5_1 | Best for |
|-------|--------|---:|---:|---:|----------|
| **tiny** | 39M | 78 MB | 44 MB | 32 MB (q5_1) | Prototyping, low-end devices |
| **base** | 74M | 148 MB | 82 MB | 60 MB (q5_1) | Mobile, real-time on most devices |
| **small** | 244M | 488 MB | 264 MB | 190 MB (q5_1) | Good balance of speed and quality |
| **medium** | 769M | 1.53 GB | 823 MB | 539 MB (q5_0) | High-quality transcription |
| **large-v1** | 1550M | 3.09 GB | — | — | First large model |
| **large-v2** | 1550M | 3.09 GB | 1.66 GB | 1.08 GB (q5_0) | Best Whisper v2 |
| **large-v3** | 1550M | 3.10 GB | — | 1.08 GB (q5_0) | Best multilingual accuracy |
| **large-v3-turbo** | 809M | 1.62 GB | 874 MB | 574 MB (q5_0) | ⭐ Recommended — fast + accurate |

## English-only Models

English-only models (`.en` suffix) are faster and more accurate for English. Available for tiny through medium:

| Model | Full (f16) | Q8_0 | Q5_1 |
|-------|---:|---:|---:|
| **tiny.en** | 78 MB | 44 MB | 32 MB |
| **base.en** | 148 MB | 82 MB | 60 MB |
| **small.en** | 488 MB | 264 MB | 190 MB |
| **medium.en** | 1.53 GB | 823 MB | 539 MB (q5_0) |

## Quantized Models

Quantized models store weights with lower precision, reducing file size with minimal quality loss:

| Format | Bits | Size Reduction |
|--------|------|---------------|
| Q8_0 | 8 | ~50% smaller |
| Q5_1 | 5 | ~65% smaller |
| Q5_0 | 5 | ~65% smaller |

Available for all model sizes (both multilingual and English-only). Pre-quantized `.bin` files are on [Hugging Face](https://huggingface.co/ggerganov/whisper.cpp/tree/main).

## Choosing a Model

- **English-only** → use `.en` models for better speed and accuracy.
- **Multilingual** → use models without `.en` suffix and set the `language` property.
- **Mobile/Web** → use quantized (Q5_0/Q5_1) to reduce download size and memory.
- **large-v3-turbo** → recommended for most use cases — nearly large-v3 quality at 3× the speed.
