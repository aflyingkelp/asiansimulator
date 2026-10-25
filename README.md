# Dust & Rice — The Long Valley

Run `node preview.cjs`, then open http://127.0.0.1:4321/. To play with friends on the same Wi-Fi, use the LAN address printed by the server in their browser. If local connections are blocked, deploy the Render Blueprint below and have everyone use its public HTTPS game link. The expanded hometown now spans several walkable neighborhoods with 46 homes, a market square, and a long road east through dense pine wilderness into Jinyu City. Downtown has a Times Square-inspired theater plaza, animated LED facades, 12 strolling residents, and 20 respawning hostile mobs spread from the forest to the city. The local map marks the road, buildings, bosses, and nearby mobs.

## Play

- Choose Fire, Water, Wood, Metal, or Earth at the opening screen. Each element has three distinct skills on Z, X, and V (1, 2, and 3 are alternate keys). Skills cost qi and have cooldowns.
- WASD moves; Shift runs; E interacts; G / H uses a remedy.
- Left click / J starts a faster buffered three-cut chain. Q / K performs a heavy strike; hold W and tap Q for the Skybreaker uppercut launcher, then juggle airborne enemies with light attacks. Hits apply visible knockback, with heavier moves creating more space. Hold F to guard and time a parry. R performs a faster wide sweep. Space jumps and can be pressed again in the air for a double jump; press Q / K while airborne for a Mountain Drop smash. Ctrl + Space dodges.
- Element skills use nearby keys Z, X, and V; 1, 2, and 3 remain alternate bindings.
- Chain left click + Q, then R + an element key, then left click + Q again within the 1.3-second chain window. Each chord teleports and strikes; complete all three without a mistimed input for the finisher.
- Fire shoots a tracking firebolt that burns; Waterstep dashes through attacks and Still Pool wards a hit; Wood animates grabbing vines; Metal reflects a timed blow with Bell Parry; Earth finishes in an expanding ground shockwave. Movement is slightly faster in both walking and running.
- C switches locked and free camera modes. Starting the game and closing a manual or journal leave the mouse free. In locked mode, click the world or press C to capture it. Arrow keys orbit; the wheel zooms from 3.2 to 28 units. Escape pauses and releases pointer lock.

## Multiplayer and duels

Open **Multiplayer** and choose **Host room**. Share the five-character code with up to three other players. Friends open the same game URL and enter that code. The room shows visible player avatars in the same world. Challenge someone from the roster; they must accept before the duel begins. Light, heavy, uppercut, sweep, elemental, and ninja attacks deal duel damage when the attacker is close and facing their opponent. Guard reduces damage, dodge evades it, and the room declares a winner at zero health.

### Use Render when LAN play is blocked

The included [`render.yaml`](render.yaml) deploys the game and multiplayer room server as one Node web service. This avoids LAN access and cross-origin setup: the host and every friend visit the same Render URL, then the host creates a room and shares its code.

1. Push the `jade-valley` project to a GitHub repository.
2. In Render, create a **Blueprint** and connect that repository. Render reads `render.yaml` and builds the web service.
3. When the first deploy finishes, open the service's `onrender.com` HTTPS URL and share that URL with friends.
4. Open **Multiplayer → Host room**, then share the room code. Friends open the same URL and choose **Join room**.

Render's free web services sleep after 15 minutes without incoming traffic; the first request after sleep can take about a minute to wake the game. Rooms live in server memory, so a service restart or sleep can end an active room; create a fresh room if that happens. The game's save remains in each player's browser. See Render's [free service limits](https://render.com/docs/free) and [Blueprint YAML reference](https://render.com/docs/blueprint-spec).

## Journey systems

The Quests journal tracks 13 story tasks through the village, training, herb gathering, and three boss fights. Manual documents all five elements and their skills. Gear contains quest rewards that can be equipped in blade, coat, and charm slots.

The Save button writes immediately; the game also autosaves every eight seconds and after major rewards or story events. The save keeps the chosen element, quest progress, inventory, equipment, location, health, and unfinished boss health in this browser's local storage. Saves are separate for each browser origin. Existing boss progress from `dust-rice-v1` is migrated when first loaded.

The training post shows damage and regenerates after two seconds. Hits use a fixed particle pool, model flash, floating damage numbers, sword arcs, brief hit pause, and a small camera impulse. A warm key light, green ambient fill, tone mapping, and valley haze soften the sunset lighting. Static scenery is merged by material and region. WebGL caps device-pixel ratio at 1, uses a cheaper shadow filter, and checks camera-wall collisions at 12.5 Hz; the Canvas compatibility renderer draws flat triangles. Combat runs at a fixed 60 Hz, and the HUD and minimap update at 10 Hz.

Run `node verify-combat.mjs`, `node verify-knockback.mjs`, `node verify-camera.mjs`, `node verify-input.mjs`, and `node verify-multiplayer.mjs` for combat, camera, input, and two-client duel service checks. FPS depends on the browser and renderer, so the embedded compatibility renderer cannot predict GPU performance on a particular computer.
