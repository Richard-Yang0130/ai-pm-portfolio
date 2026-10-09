# Approved paper desktop — design QA

final result: passed

Date: 2026-10-09. Browser: Ego / Chromium. Local URL: http://127.0.0.1:4173/ai-pm-portfolio/.

## Evidence and normalization

Source visual truth: `public/desktop/paper/approved-collage.png`, the user's selected final mockup with paper Dock. Source pixels: **1774 × 887**.

Implementation screenshot: `/Users/lisongyang/Documents/Codex/2026-10-08/wo-xi/outputs/design-qa/homepage-final.png`, **1774 × 887**, CSS viewport **1774 × 887**, deviceScaleFactor **1**. State: homepage, all props at starting positions, no open windows, mouse away from controls, audio paused at 0:00. No density conversion or browser chrome.

Full-view and focused comparison in the same input: `/Users/lisongyang/Documents/Codex/2026-10-08/wo-xi/outputs/design-qa/compare-final.png`. The board includes source and browser capture together, plus full-size iPod and Dock regions. Both images and this combined board were opened and visually inspected.

Supporting captures are in the same `outputs/design-qa/` directory: `mobile-final.png` (390×844), `small-phone-final.png` (320×568), `landscape-final.png` (844×390), `maximized-final.png`, `about-desktop-final.png`, and `about-mobile.png`.

## Findings and fidelity surfaces

No actionable P0/P1/P2 findings remain.

- **Fonts / typography:** hero wordmark, handwritten greeting, prop labels, notes and paper icons use the approved raster art, preserving its print. Shared navigation uses readable native Arial at the reference scale; small glyph/antialiasing differences remain. Live player metadata uses native text.
- **Spacing / layout:** original 1774×887 coordinates, proportional fitting, 682×228 name frame, six square handles, full props, tape and Dock placement match the reference composition. Portrait layouts reflow the same controls. Landscape fitting and maximized-window header clearance were verified on the rendered page.
- **Colors / tokens:** approved original RGB artwork supplies yellow brush, pastel papers, black ink and glass props. White paper canvas and navigation replace the former cream/mint gradient. Alpha extraction is used only for moving-prop edges and portrait layouts; generated RGB colors are not rendered.
- **Images / asset fidelity:** approved artwork is consumed as independent sprite pieces, not replaced with handmade illustration shapes or a flattened page. Native iPod display uses the previously requested official Spotify-sourced ROSÉ `rosie` artwork; the mockup's generated likeness is intentionally superseded by that real cover. Paper texture, source props, collage decoration and flat Dock icons are preserved. The screenshot's selection frame is live UI chrome.
- **Copy / content:** own name and writing; the same six resume projects were read back from the page. No personal avatar or reference-owner content. Music remains the supplied full MP3, duration 156.685737s, with the official album source recorded in `docs/research/music/cover-source.json`.

## Comparison history

1. **Initial capture — blocked:** P1 cropped draft paperclip/folder tab and sharp crop boundaries; P2 navigation spacing / old glossy Dock mismatch. Evidence: `compare-v1.png`. Fixed prop bounds, reference artwork crops, white paper palette and flat paper Dock; corrected brand width and navigation sizing.
2. **Second comparison — blocked:** white PRD backing/shadows were removed by the extraction; portrait view duplicated navigation icons, carried neighboring frame/badge fragments and hid the folder under the iPod. Evidence: `compare-v2.png`, `mobile-v1.png`. Fixed with original RGB art at rest, extracted alpha only where appropriate, isolated crop regions, restored real white backing and moved lower portrait props.
3. **Responsive / window review — blocked:** in 844×390 the iPod Select center hit Dock Blog and its bottom exceeded the viewport (`landscape-before.png`). A taller navigation bar also required updating normal/maximized windows and drag limits. Fixed landscape proportional fitting with top clearance and a shared `--menu-height` token. Retest: Select center `(672.04,200.68)` hits Select; iPod bottom `254.23 < 390`; maximized-window top `75.94` is 8px below navigation bottom `67.94`. Window dragging respects the same gap. Evidence: `landscape-final.png`, `maximized-final.png`, `responsive.json`, `interactions.json`.
4. **Final comparison — passed:** opened the revised source/browser comparison board and mobile captures. All primary controls remain visible and reachable; 320×568 greeting was moved into the remaining clear space. Core interaction and console checks below passed.

## Verification

- `npm test`: **11 tests passed**, including pointer click versus drag, transformed-canvas drag distance, keyboard movement, Dock navigation, real player callbacks, resume inventory, windows, terminal and article deep links.
- `npm run build` and `git diff --check`: passed.
- Browser opened all nine Dock buttons and seven project/writing props; Mail/GitHub URLs read back. Correct app/project windows opened.
- Terminal `help`, minimize/restore, Escape close, maximization, and titlebar dragging checked.
- iPod native play/pause checked; progress input moved playback to about 79s and volume to 0.5. Duration and official cover URL read back.
- Mobile menu navigated to About and closed; desktop About paper/marker style and own project titles read back.
- Captured browser error / unhandled-rejection arrays: **empty**. Records: `interactions.json`, `responsive.json`.
- Independent static review identified the two layout integration issues above; both fixes were reviewed and verified in Ego.

## Follow-up polish / limits

P3: native navigation/player glyphs have slight raster-versus-font differences; official album cover differs from the mockup's generated rendering; moving-prop masking can slightly change soft shadows. Portrait composition adapts to screen size. Safari/Firefox and physical devices were not tested. The approved 1774×887 art may need separate 2× exports for larger displays.

## Implementation checklist

- [x] Resolve exact selected mockup and revised Dock.
- [x] Preserve source artwork, own content, independent accessible controls and native audio.
- [x] Capture and compare equal viewport/state, including focused iPod/Dock.
- [x] Fix all actionable P0/P1/P2 issues; recapture and retest.
- [x] Browser interaction checks, unit tests, build and static review.
- [x] Publish and read back the current bundle on GitHub Pages; record in `docs/design/deployment-2026-10-09.json`.

## Online verification

GitHub Pages built `71bb7c24a2f1de1e3dbf05fba2d9ddd39a134884` successfully. The ordinary production URL served `index-B43xf8Np.js` and `index-DvU4G-9H.css`, matching source implementation commit `826bd0e`. In Ego, the two paper images decoded, the official cover loaded, all 8 props / 11 Dock controls / 6 resume projects were present, native audio advanced and paused, and the project directory opened correctly. Browser errors and native audio error were empty. Screenshot: `/Users/lisongyang/Documents/Codex/2026-10-08/wo-xi/outputs/design-qa/live-homepage.png`; full record: `docs/design/deployment-2026-10-09.json`.
