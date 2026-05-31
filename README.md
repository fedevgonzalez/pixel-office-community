# Pixel Office Community

Community gallery for [Pixel Office](https://github.com/fedevgonzalez/pixel-office) — layouts, character/pet/prop sprites, and background themes. Browse, vote, and import directly from the app.

## What's in here

```
layouts/              # office floor plans
sprites/
  characters/         # 112×96 agent sprite sheets
  pets/               # 160×96 pet sprite sheets (cat / dog / future species)
  props/              # individual decoration sprites (plants, lamps, computers…)
backgrounds/          # themes — color/zone/day-night presets (theme.json)
```

Each kind has its own README in its directory with the exact format and submission spec.

## Quick links

| Asset | Format | Per-entry README |
|-------|--------|------------------|
| Layouts | JSON exported from the app | [`layouts/`](layouts/) |
| Characters | 112×96 PNG sprite sheet | [`sprites/characters/`](sprites/characters/README.md) |
| Pets | 160×96 PNG sprite sheet | [`sprites/pets/`](sprites/pets/README.md) |
| Props | variable-size PNG | [`sprites/props/`](sprites/props/README.md) |
| Themes | `theme.json` exported from the app | [`backgrounds/`](backgrounds/README.md) |

## How to use a contribution

The easiest way is through the app: click **Community** in Pixel Office to browse and import any kind of asset with one click.

Manual import is supported too — download the file from this repo and drop it into the relevant directory under `~/.pixel-office/` (or use the app's Settings → Import flow for layouts).

## How to submit

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full submission guide, or share directly from the app via **Community → Share**.

**Quick version:**

1. Fork this repo.
2. Create a directory under the right top-level folder (e.g. `sprites/pets/cat_calico/`) with the required files (sprite + metadata).
3. Open a Pull Request — CI validates dimensions and generates a thumbnail.

## Voting

Every contribution has a corresponding GitHub Issue (labeled `<kind>-submission`). You can vote by:

- **In the app:** click the star icon on any gallery card → adds a 👍 reaction to the issue.
- **On GitHub:** add a 👍 reaction directly to the issue.

Vote counts sync every 6 hours into the per-kind manifest files.

## Manifest files

Each kind has its own machine-readable index, regenerated on push to `main`:

- [`layouts.json`](layouts.json) (currently `gallery.json` for backwards compatibility)
- [`sprites/characters.json`](sprites/characters.json)
- [`sprites/pets.json`](sprites/pets.json)
- [`sprites/props.json`](sprites/props.json)
- [`backgrounds.json`](backgrounds.json) — community themes

## License

All contributions are shared under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — free to use for any purpose, no attribution required.
