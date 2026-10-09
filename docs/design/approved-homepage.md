# Approved paper desktop

User approved the revised mockup with the flat paper Dock on 2026-10-09 and asked to publish the exact visual.

Visual source: `public/desktop/paper/approved-collage.png`, 1774 × 887.
The source is the user's selected built-in Image Gen result `exec-8b76fe86-1f8b-4ba3-a3fe-6e915324b85a.png`.

Each piece of approved art is rendered through its own CSS sprite region. The heading, identity tags, seven movable props, iPod and eleven Dock applications are separate accessible controls. The page is not a flattened screenshot; drag positions, app windows and live audio state remain interactive.

Desktop frame: 1774 × 887, fitted proportionally to the viewport. Reference regions: name (552,289,682,228), lens (442,87,242,232), laptop (144,471,387,331), chip (1038,111,221,181), draft (65,148,382,363), PRD (637,514,323,256), folder (1032,578,355,218), Aevis (1396,542,264,280), iPod (1328,71,363,494), Dock (485,778,805,93).

Reach: `Desktop.jsx`, `desktop.css`, shared navigation in `styles.css`, affected artwork assertion in `Desktop.test.jsx`. Existing profile, six resume projects, articles, window callbacks, audio source, album cover, seek and volume stay connected.

Mobile layouts reflow the same controls. Live iPod track text, progress and transport controls use native HTML; their antialiasing may differ from the raster mockup.

The original RGB collage is used for all colors and print. `approved-collage-mask.png` is a same-size RGBA extraction generated with the built-in Image Gen tool; only its alpha is consumed as a CSS mask during dragging and portrait layouts. The generated RGB colors are not used. White-paper PRD artwork keeps its source paper backing.

Extraction prompt: keep every foreground object, paper, black type, yellow brush, pink stroke, corner newspaper, iPod and Dock at its original coordinates and size; remove only the large empty canvas, retain real white paper and white devices, output transparent 1774 × 887, do not redesign, replace words or move objects.
