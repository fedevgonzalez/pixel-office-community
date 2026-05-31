# Community Themes

Community-contributed **themes** for Pixel Office — shareable color/zone/day-night
presets (a `CustomThemePreset` export). A theme recolors the world and exterior
zones; it does **not** include sprites or a static backdrop image.

> This directory was previously scoped for static 1280×800 PNG backdrops. It now
> hosts themes (`theme.json`). The directory name and manifest key (`backgrounds`)
> are kept for backwards compatibility with the gallery clients.

## Format

A theme is a JSON preset you export from the app via **Theme Picker → Export**:

```jsonc
{
  "id": "custom:my-garden-abc12",   // CI strips the `custom:` prefix on disk
  "name": "My Garden",
  "version": 1,
  "zones": { "sidewalk": 3, "lawn": 8, "road": 2 },
  "tileColors": {
    "9":  { "h": 120, "s": 0.8, "l": 0.5 },  // GRASS
    "11": { "h": 30,  "s": 0.4, "l": 0.6 }   // SIDEWALK
  },
  "dayFill": "#87CEEB",
  "nightFill": "#1a1a2e",
  "decorations": []                  // optional template decorations
}
```

Required fields: `version: 1`, `zones.{sidewalk,lawn,road}` (numbers),
a `tileColors` map, and `dayFill` / `nightFill` hex strings.

## Directory layout

```
backgrounds/
  my-garden-abc12/
    theme.json       # the CustomThemePreset (id stored WITHOUT `custom:` prefix)
    metadata.json    # name, author, description, tags, date, issueNumber
    thumbnail.png    # optional color-swatch preview for the gallery card
```

The on-disk directory id never includes the `custom:` prefix (path-traversal
safe). The gallery manifest reconstructs the namespaced id as `custom:<id>`.

## metadata.json schema

```jsonc
{
  "name": "My Garden",
  "author": "fedevgonzalez",
  "description": "Lush green exterior with tan brick paths.",
  "tags": ["garden", "nature", "green"],
  "createdAt": "2026-05-31",
  "issueNumber": 42,
  "votes": 0
}
```

## How to submit

The easiest path is the app: **Community → Share** (or **Theme Picker → Share to
gallery…**) opens a pre-filled issue with the `theme-submission` label. CI
validates the preset, writes the files, generates a swatch thumbnail, and opens a
PR. See [../CONTRIBUTING.md](../CONTRIBUTING.md) for the manual path.

## Tips

- Themes capture colors, exterior zone bands, and day/night fills — **not** sprites.
- Tags are how people discover your theme (e.g. `garden`, `cyberpunk`, `cozy`, `minimal`).
- Don't include readable text or recognizable logos.
