---
sidebar_position: 2
---

# Platforms

Godot Whisper supports the main Godot export platforms. GPU acceleration depends on the platform, build, and model backend support.

| Platform | Backend | Notes |
|----------|---------|-------|
| **macOS** | Metal + Accelerate | GPU acceleration through Metal. |
| **iOS** | Metal + Accelerate | GPU acceleration through Metal. |
| **Windows** | OpenCL + Vulkan | GPU acceleration through OpenCL and Vulkan (if drivers are installed). |
| **Linux** | OpenCL + Vulkan | GPU acceleration through OpenCL and Vulkan (if drivers are installed). |
| **Android** | OpenCL + Vulkan | GPU acceleration through OpenCL and Vulkan (if drivers are installed). |
| **Web** | WebGPU or CPU | WebGPU is currently NOT supported by Emscripten version of Godot. |

## GPU Setting

Global setting:

```text
audio/input/transcribe/use_gpu = true
```

Set it to `false` to force CPU inference.

Silero VAD currently runs CPU-only. The VAD model is small, so CPU cost is usually low.

## Memory

Runtime memory is larger than the downloaded file because Whisper also allocates compute buffers and context memory. The **Project → Tools → Whisper Models** window shows approximate runtime memory for each model.

For constrained devices:

- prefer quantized models such as `small-q5_1`
- prefer smaller models for realtime work
- avoid full `large-v3` unless device memory is comfortable

## Realtime Limits

If transcription takes longer than captured audio duration, realtime latency will grow. `CaptureStreamToText` queues audio up to `max_pending_audio_ms`, then drops oldest queued audio to recover.

See [Realtime Transcription](realtime.md).
