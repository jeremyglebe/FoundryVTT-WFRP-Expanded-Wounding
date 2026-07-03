# WFRP4e Expanded Critical Hits

Expanded Critical Hits adds Josef Tham-inspired expanded critical hit tables for the WFRP4e system
in Foundry VTT.

## Installation

Use this manifest URL in Foundry's **Install Module** dialog:

```text
https://github.com/jeremyglebe/FoundryVTT-WFRP-Expanded-Wounding/releases/latest/download/module.json
```

After installation, enable **WFRP4e Expanded Critical Hits** in your WFRP4e world.

## What It Adds

- Compendium packs for expanded critical wound Items and RollTables.
- Damage Type item properties such as Cutting, Crushing, Piercing, Bullets, Flame, Energy, Arrows,
  Bolts, Teeth, Claws, and Unarmed.
- Optional replacement of WFRP's normal critical table rolls.
- Support for both Core and Up In Arms critical ranges.
- Optional damage-type inference from WFRP item properties or weapon groups.

## Basic Usage

1. Open **Configure Settings > Module Settings > WFRP4e Expanded Critical Hits**.
2. Enable **Replace WFRP Critical Tables**.
3. Add one or more **Damage Type** properties to weapons, damaging spells, or damaging prayers.
4. When a supported critical roll occurs, the module routes it to the matching expanded table.

If a source item has no configured or inferred damage type, the roll falls through to WFRP4e's
normal critical behavior.

## Damage Inference

The module can reduce item setup by guessing damage types:

1. Explicit Damage Type properties always take priority.
2. Item-property inference can map traits like Hack, Impale, Pummel, or Slash to expanded tables.
3. Weapon-type inference can map weapon groups like Blackpowder or Brawling, but is disabled by
   default because those mappings are less reliable.

The current mapping settings are JSON text fields. A friendlier mapping editor is planned.

## Current Limitations

- Critical wound automation is not complete.
- Damage inference is configurable but still intentionally conservative.
- Custom user table routing is planned for a later version.

## Links

- Manifest:
  https://github.com/jeremyglebe/FoundryVTT-WFRP-Expanded-Wounding/releases/latest/download/module.json
- Releases: https://github.com/jeremyglebe/FoundryVTT-WFRP-Expanded-Wounding/releases
- Source: https://github.com/jeremyglebe/fvtt.wfrp.wounding
