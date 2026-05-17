# Prop Sprites

Community-contributed prop sprites (plants, lamps, computers, posters, etc.) for Pixel Office.

## Format

- **PNG**, RGBA, transparent background.
- Variable dimensions, must be a multiple of 16 px on each axis. Common sizes:

  | size      | use                          |
  |-----------|------------------------------|
  | 16 × 16   | small floor items (book, mug)|
  | 16 × 24   | tall narrow items (lamp, fern)|
  | 16 × 32   | door-height items (poster)   |
  | 32 × 32   | 2-tile floor items (desk)    |
  | 32 × 48   | tall 2-tile items (bookshelf)|

## Directory layout

```
sprites/props/
  plant_fern/
    sprite.png
    metadata.json
    thumbnail.png    # may equal sprite.png if already small
```

## metadata.json schema

```jsonc
{
  "name": "Fern in Terracotta Pot",
  "category": "plant",             // plant | lamp | furniture | electronics | decor
  "author": "fedevgonzalez",
  "description": "Tall potted fern with arching deep-green fronds.",
  "tags": ["plant", "indoor", "warm"],
  "width": 16,
  "height": 24,
  "createdAt": "2026-05-17",
  "issueNumber": 12,
  "votes": 0
}
```

## How to submit

See [../../CONTRIBUTING.md](../../CONTRIBUTING.md).

## Generation tips

- Anchor the object to the **bottom** of the cell with ~1 px transparent padding on every side.
- Top-down 3/4 view, consistent with the office camera angle.
- Limit to 4–8 colors per prop, with a 1-px dark outline.
- Prompt template lives in the main repo at `pixel-office-assets/props/PROMPTS.md`.
