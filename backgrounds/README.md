# Background Themes

Community-contributed full-canvas backdrops for Pixel Office.

## Format

- **PNG**, RGBA, **1280 × 800 pixels** (or any clean 4× multiple — Claude downscales).
- 12–16 color palette, top-down 3/4 view, no anti-aliasing.
- The center ~40 % of the image will be **covered at runtime** by the office building, so put focal detail in the OUTER RING (corners, edges).

## Directory layout

```
backgrounds/
  modern_interior/
    background.png   # 1280×800 backdrop
    metadata.json    # name, author, description, tags, date
    thumbnail.png    # 160×100 downscale for the gallery card
```

## metadata.json schema

```jsonc
{
  "name": "Modern Interior",
  "author": "fedevgonzalez",
  "description": "Spacious open-plan interior with floor-to-ceiling windows at dusk.",
  "tags": ["indoor", "modern", "cool-warm-balance"],
  "createdAt": "2026-05-17",
  "issueNumber": 5,
  "votes": 0
}
```

## How to submit

See [../CONTRIBUTING.md](../CONTRIBUTING.md).

## Generation tips

- Do NOT draw an office building, characters, or pets — those are overlaid by the engine.
- Do NOT include readable text or recognizable logos.
- Soft warm color grading by default (amber undertones), unless the concept explicitly says otherwise (cyberpunk = cool moody, etc.).
- Prompt template lives in the main repo at `pixel-office-assets/backgrounds/PROMPTS.md`.
