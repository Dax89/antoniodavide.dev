---
title: 'QHexView 5.1 Release'
featured: true
published: '08 Feb 2026'

description:
  This release brings a brand new renderer, new features and bug fixes.

tags:
  - qhexview
  - cplusplus
  - qt
---

Almost ~10 years ago I began to write a little widget to display binary data for one of [my old projects](https://github.com/PREF/PREF) (now in sleep state) and today for [my own disassembler](https://github.com/REDasmOrg/REDasm), after a while I decided to isolate its code and move it to a dedicated repository hoping it will be useful to other developers.
Over the years I received issues and pull requests from other developers that increased the widget's release to version 4.x.

That's great right? Yes it was!

But the code was becoming messy and time consuming to maintain, so in 2022 I've decided to rewrite the widget from scratch.
The development began with [a dedicated thread](https://github.com/Dax89/QHexView/issues/71) where I notify all contributors in order to make this release tailored to our needs.

<figure class="text-center">
  <img src="https://user-images.githubusercontent.com/1503603/157109542-55d12002-4829-404c-9b1c-2f3836f3c754.png" alt="QHexView">
  <figcaption>A very common hex view</figcaption>
</figure>

This widget is now at release 5.1 which sports a new, written from scratch, renderer (the main reason why I have done this new release) along with some nice features like:

1. Builtin pattern matcher.
2. Completely customizable rendering: it's possible to highlight bytes by their value and/or by offset range (even in real time thanks to delegates).
3. Clipboard support for various formats (visual copy, hex copy, etc...).
4. It's also possible to highlight patched bytes via `setTrackChanges()` method.
5. And lots of other minor features, but it's too long to list them here.

## Final Thoughts
Thanks to the user's feedback, QHexView evolved far beyond my goals, it reached its fifth major release, the code is manageable and I'm very happy about that!

- Repository: [https://github.com/Dax89/QHexView](https://github.com/Dax89/QHexView)
- Changelog: [5.1.0](https://github.com/Dax89/QHexView/releases/tag/v5.1.0)
