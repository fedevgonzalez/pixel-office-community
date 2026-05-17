#!/usr/bin/env node
/**
 * Generate per-kind manifest JSON files from per-entry metadata.
 *
 * Kinds:
 *   - layouts:    ./layouts/<id>/{layout.json,metadata.json,preview.png?}
 *   - pets:       ./sprites/pets/<id>/{sprite.png,metadata.json,thumbnail.png?}
 *   - characters: ./sprites/characters/<id>/{sprite.png,metadata.json,thumbnail.png?}
 *   - props:      ./sprites/props/<id>/{sprite.png,metadata.json,thumbnail.png?}
 *   - backgrounds:./backgrounds/<id>/{background.png,metadata.json,thumbnail.png?}
 *
 * Output:
 *   - ./gallery.json        (legacy alias — layouts only, for old clients)
 *   - ./layouts.json        (canonical layouts manifest)
 *   - ./sprites/pets.json
 *   - ./sprites/characters.json
 *   - ./sprites/props.json
 *   - ./backgrounds.json
 *
 * CLI:
 *   node scripts/generate-manifests.js              # regenerate all kinds
 *   node scripts/generate-manifests.js layouts pets # only the named kinds
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

const KINDS = {
  layouts: {
    sourceDir: path.join(ROOT, 'layouts'),
    assetFile: 'layout.json',
    previewFile: 'preview.png',
    pathPrefix: 'layouts',
    arrayKey: 'layouts',
    outFiles: ['gallery.json', 'layouts.json'],
    derive(metadata, asset, id, hasPreview) {
      return {
        cols: asset.cols,
        rows: asset.rows,
        furnitureCount: Array.isArray(asset.furniture) ? asset.furniture.length : 0,
        screenshot: hasPreview ? `layouts/${id}/preview.png` : null,
        layout: `layouts/${id}/layout.json`,
      }
    },
  },
  pets: {
    sourceDir: path.join(ROOT, 'sprites', 'pets'),
    assetFile: 'sprite.png',
    previewFile: 'thumbnail.png',
    pathPrefix: 'sprites/pets',
    arrayKey: 'pets',
    outFiles: [path.join('sprites', 'pets.json')],
    derive(metadata, _asset, id, hasPreview) {
      return {
        species: metadata.species || 'cat',
        sprite: `sprites/pets/${id}/sprite.png`,
        thumbnail: hasPreview ? `sprites/pets/${id}/thumbnail.png` : null,
      }
    },
  },
  characters: {
    sourceDir: path.join(ROOT, 'sprites', 'characters'),
    assetFile: 'sprite.png',
    previewFile: 'thumbnail.png',
    pathPrefix: 'sprites/characters',
    arrayKey: 'characters',
    outFiles: [path.join('sprites', 'characters.json')],
    derive(_metadata, _asset, id, hasPreview) {
      return {
        sprite: `sprites/characters/${id}/sprite.png`,
        thumbnail: hasPreview ? `sprites/characters/${id}/thumbnail.png` : null,
      }
    },
  },
  props: {
    sourceDir: path.join(ROOT, 'sprites', 'props'),
    assetFile: 'sprite.png',
    previewFile: 'thumbnail.png',
    pathPrefix: 'sprites/props',
    arrayKey: 'props',
    outFiles: [path.join('sprites', 'props.json')],
    derive(metadata, _asset, id, hasPreview) {
      return {
        category: metadata.category || 'decor',
        width: metadata.width || null,
        height: metadata.height || null,
        sprite: `sprites/props/${id}/sprite.png`,
        thumbnail: hasPreview ? `sprites/props/${id}/thumbnail.png` : null,
      }
    },
  },
  backgrounds: {
    sourceDir: path.join(ROOT, 'backgrounds'),
    assetFile: 'background.png',
    previewFile: 'thumbnail.png',
    pathPrefix: 'backgrounds',
    arrayKey: 'backgrounds',
    outFiles: ['backgrounds.json'],
    derive(_metadata, _asset, id, hasPreview) {
      return {
        background: `backgrounds/${id}/background.png`,
        thumbnail: hasPreview ? `backgrounds/${id}/thumbnail.png` : null,
      }
    },
  },
}

function buildEntries(kind, cfg) {
  if (!fs.existsSync(cfg.sourceDir)) {
    console.log(`[${kind}] source dir not found (${cfg.sourceDir}), emitting empty manifest`)
    return []
  }
  const dirs = fs
    .readdirSync(cfg.sourceDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)

  const entries = []
  for (const id of dirs) {
    const dirPath = path.join(cfg.sourceDir, id)
    const metadataPath = path.join(dirPath, 'metadata.json')
    const assetPath = path.join(dirPath, cfg.assetFile)
    if (!fs.existsSync(metadataPath)) {
      console.warn(`[${kind}] ${id}: missing metadata.json — skipped`)
      continue
    }
    if (!fs.existsSync(assetPath)) {
      console.warn(`[${kind}] ${id}: missing ${cfg.assetFile} — skipped`)
      continue
    }
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'))
    // Layouts have asset = JSON we read; everything else has asset = binary
    const asset = cfg.assetFile.endsWith('.json')
      ? JSON.parse(fs.readFileSync(assetPath, 'utf-8'))
      : null
    const hasPreview = fs.existsSync(path.join(dirPath, cfg.previewFile))
    const base = {
      id,
      name: metadata.name || id,
      author: metadata.author || 'anonymous',
      description: metadata.description || '',
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      createdAt: metadata.createdAt || null,
    }
    if (metadata.issueNumber) base.issueNumber = metadata.issueNumber
    if (typeof metadata.votes === 'number') base.votes = metadata.votes
    Object.assign(base, cfg.derive(metadata, asset, id, hasPreview))
    entries.push(base)
  }
  entries.sort((a, b) => a.id.localeCompare(b.id))
  return entries
}

function writeManifest(kind, cfg, entries) {
  const manifest = {
    version: 1,
    updatedAt: new Date().toISOString(),
    [cfg.arrayKey]: entries,
  }
  for (const out of cfg.outFiles) {
    const outPath = path.join(ROOT, out)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n')
    console.log(`[${kind}] → ${out}  (${entries.length} entr${entries.length === 1 ? 'y' : 'ies'})`)
  }
}

function main() {
  const argv = process.argv.slice(2)
  const selected = argv.length > 0 ? argv : Object.keys(KINDS)
  for (const kind of selected) {
    const cfg = KINDS[kind]
    if (!cfg) {
      console.error(`unknown kind: ${kind}`)
      process.exitCode = 1
      continue
    }
    const entries = buildEntries(kind, cfg)
    writeManifest(kind, cfg, entries)
  }
}

main()
