# Dust & Rice — The Long Valley

Run `node preview.cjs`, then open http://127.0.0.1:4321/.

- WASD: move, Shift: run, J/left click: attack, Space: dodge.
- E: interact, Q: heal, Escape: pause.
- C or the camera button switches between locked mouse look and free cursor.
- Locked mode captures the mouse after a click. Move the mouse to orbit horizontally through 360 degrees and look vertically. Escape releases capture and pauses.
- In free mode, hold the right mouse button and drag to orbit. Arrow keys also rotate the camera.
- Scroll the wheel to adjust camera distance, from 3.2 to 28 world units.
- The camera moves inward when a village building blocks the view.

The WebGL renderer supports shadows and textured PBR materials. A textured, depth-tested Canvas renderer serves browsers without WebGL. The embedded Codex browser currently refuses WebGL and Pointer Lock; free-cursor orbit remains available there. Use a regular browser for pointer capture and the GPU renderer.

Artist-made character, tree, foliage, terrain, and sword assets are bundled locally. See `dist/credits.html` for authors, source URLs, licenses, and modifications. No generated art is used. Asset source downloads are excluded from Git; runtime files are tracked.

Run `node verify-camera.mjs` for camera math and interaction state tests. Player progress remains under the existing `dust-rice-v1` localStorage key. Changing browsers or origins uses a separate save.
