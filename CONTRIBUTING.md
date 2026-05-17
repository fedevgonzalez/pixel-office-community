# Contributing to Pixel Office Community

Thanks for sharing! This repo hosts four kinds of community assets — each follows the same submission pattern with kind-specific format rules.

| Kind        | Top-level dir          | Asset file         | Required dimensions    | Submission label         |
|-------------|------------------------|--------------------|------------------------|--------------------------|
| Layout      | `layouts/`             | `layout.json`      | n/a (JSON file)        | `layout-submission`      |
| Pet sprite  | `sprites/pets/`        | `sprite.png`       | 160 × 96 (32×32 cells) | `pet-submission`         |
| Character   | `sprites/characters/`  | `sprite.png`       | 112 × 96 (16×32 cells) | `character-submission`   |
| Prop        | `sprites/props/`       | `sprite.png`       | multiple of 16 px      | `prop-submission`        |
| Background  | `backgrounds/`         | `background.png`   | 1280 × 800 (or 4× mult)| `background-submission`  |

## The easy path: share from the Pixel Office app

In Pixel Office, each editor has a **Share** button that opens a pre-filled GitHub Issue with the right submission label and metadata block. Drag-and-drop your PNG sprite into the issue body (skip this step for layouts — those embed the JSON inline), then submit. CI takes over.

## The manual path: open a PR yourself

### Common metadata.json

Every kind requires a `metadata.json` in its entry directory:

```jsonc
{
  "name": "Display name",
  "author": "your-github-username",
  "description": "1-2 sentence description",
  "tags": ["lowercase", "tags"],
  "createdAt": "YYYY-MM-DD"
}
```

Plus per-kind fields (see below).

### Per-kind submission

#### Layouts (`layouts/<id>/`)

Files: `layout.json`, `metadata.json`, `preview.png` *(optional — CI generates one if missing)*.

Layout JSON must be a Pixel Office v1 export (`version: 1`, `tiles[]`, `furniture[]`). Strip the `pets` field — pets are personal and never imported from community layouts.

#### Pet sprites (`sprites/pets/<id>/`)

Files: `sprite.png` (160 × 96), `metadata.json`, `thumbnail.png` *(optional — CI crops one)*.

Sprite layout: 5 columns × 3 rows of 32 × 32 frames. See [`sprites/pets/README.md`](sprites/pets/README.md) for the frame-by-frame spec.

Per-kind metadata:

```jsonc
{
  // …common fields…
  "species": "cat"   // "cat" or "dog" — REQUIRED
}
```

#### Character sprites (`sprites/characters/<id>/`)

Files: `sprite.png` (112 × 96), `metadata.json`, `thumbnail.png` *(optional)*.

Sprite layout: 7 columns × 3 rows of 16 × 32 frames. See [`sprites/characters/README.md`](sprites/characters/README.md).

No extra metadata beyond the common fields.

#### Props (`sprites/props/<id>/`)

Files: `sprite.png` (variable size, multiple of 16 on each axis), `metadata.json`, `thumbnail.png` *(may equal sprite if small)*.

Per-kind metadata:

```jsonc
{
  // …common fields…
  "category": "plant",   // plant | lamp | furniture | electronics | decor
  "width": 16,
  "height": 24
}
```

#### Backgrounds (`backgrounds/<id>/`)

Files: `background.png` (1280 × 800 or any clean 4× multiple), `metadata.json`, `thumbnail.png` *(optional — CI generates an 8× downscale)*.

No extra metadata beyond the common fields.

### Testing your entry locally

Regenerate every manifest:

```sh
node scripts/generate-manifests.js
```

…or one specific kind:

```sh
node scripts/generate-manifests.js pets
```

Check the relevant manifest file (`gallery.json`, `sprites/pets.json`, …) — your entry should appear with the right derived fields.

### Open a PR

Push your branch and open a PR. CI:
- Regenerates the manifest files on merge.
- Updates vote counts every 6 hours by reading 👍 reactions on the linked issue.

## Voting

Once merged, every entry has a corresponding GitHub Issue. Users vote by clicking the ⭐ in the app (or 👍 on the issue directly). Vote counts sync into the manifests on a schedule — no action needed from contributors.

## Guidelines

- One entry per directory.
- Kebab-case directory names: `cozy-startup`, `cat-calico`, `plant-fern`, `theme-cyberpunk`.
- Pure pixel art for sprites — no anti-aliasing, no smoothing, ≤ 8 colors per character/pet.
- Don't include readable text or recognizable corporate logos in any asset.
- Keep descriptions concise. Tag liberally — tags are how people discover your work.

## License

By submitting, you agree to release the asset under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — free to use for any purpose, no attribution required.
