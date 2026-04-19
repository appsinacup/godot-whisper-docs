---
sidebar_position: 2
---

# Platforms

Godot Whisper supports all major Godot platforms with GPU acceleration where available.

| Platform | GPU Backend | Notes |
|----------|-------------|-------|
| **macOS** | Metal + Accelerate | GPU-accelerated via Metal |
| **iOS** | Metal + Accelerate | GPU-accelerated via Metal |
| **Windows** | OpenCL + Vulkan | Vulkan auto-detected when `glslc` is available |
| **Linux** | OpenCL + Vulkan | Vulkan auto-detected when `glslc` is available |
| **Android** | OpenCL + Vulkan | Vulkan auto-detected when `glslc` is available |
| **Web** | WebGPU | `scons webgpu=yes` — requires Emscripten 4.0+ (Godot default is 3.1.62). CPU-only without it |
