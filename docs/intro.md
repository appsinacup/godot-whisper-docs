---
sidebar_position: 1
---

# Getting Started

Get started by **installing the plugin**, enabling it and downloading a language model.

## What you'll need

- [Godot](https://godotengine.org/download/) version 4.1 or above.
- [Godot Whisper](https://godotengine.org/asset-library/asset/2638) plugin from the Godot Asset Library.

## Install the plugin

First create a new **Godot Project**. Next click on the **AssetLib** tab and search for the **Godot Whisper** addon and click on it.

Then click **Download** and **Install**.

## Activate the plugin

Go to **Project** → **Project Settings**. Check the **Enabled** checkbox for **Godot Whisper**.

## Download a language model

Go to any `SpeechToText` node in the Inspector, select a **Language Model to Download** and click **Download**. You may need to alt-tab or restart the editor for the asset to appear. Then set the `language_model` property to the downloaded file.

:::tip Recommended model
**large-v3-turbo (Q5_0)** offers nearly large-v3 quality at 3× the speed — a great default for most projects.
:::

## Global audio settings

Go to **Project → Project Settings → General → Audio → Input** (enable **Advanced Settings**).

Because microphone transcription requires 16 kHz audio, you can optionally change the audio driver mix rate to `16000` at `audio/driver/mix_rate`. This avoids resampling overhead (saves ~50–100 ms on larger audio), but lowers overall audio quality.
