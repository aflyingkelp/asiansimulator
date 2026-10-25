# Dust & Rice — lightweight combat revision

Run `node preview.cjs`, then open http://127.0.0.1:4321/.

Controls:
- WASD move; Shift run; E interact; Q heal.
- J / left click: buffered three-cut chain (18, 24, 36 damage).
- K: Stonebreaker heavy strike (48 damage, interrupts boss windups).
- Hold F: guard. Raising guard within 0.19 seconds of impact parries and staggers the attacker.
- R: Harvest sweep (58 damage in all directions, eight-second cooldown).
- Space: directional dodge, brief invulnerability; stamina and recovery prevent spamming.
- C: locked mouse look / free cursor with right-drag orbit. Arrow keys also orbit. Wheel zooms from 3.2 to 28 units. Escape releases capture and pauses.

A training post on the main village path shows damage and regenerates after two seconds. Move names, combo stage, stamina, and special cooldown are visible in the HUD. Hits use a fixed particle pool, flash, floating damage numbers, sword arcs, a short hit pause, and a small camera impulse.

The original flat-color style is restored. The previous imported models and scanned materials are archived outside the served directory, and no longer load. Static scenery is merged by material and region. WebGL uses a 1.25 device-pixel ratio cap and 1024-pixel shadows near the player. The Canvas compatibility path draws flat triangles, without a textured CPU rasterizer. The HUD and minimap update at 10 Hz; combat uses a fixed 60 Hz simulation.

The FPS indicator identifies the active renderer. The embedded Codex browser blocks WebGL and Pointer Lock, so it uses the compatibility path and free-cursor mode. Tests cannot establish GPU performance on a particular machine.

Run `node verify-combat.mjs` and `node verify-camera.mjs`. Existing boss progress remains at the `dust-rice-v1` localStorage key; saves are separate for each browser origin.
