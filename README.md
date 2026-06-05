# WFRP4e Expanded Wounding

Foundry VTT module for expanded WFRP4e critical hit handling inspired by Josef Tham's expanded critical tables.

The module installs expanded critical wound Items and RollTables organized by ruleset, wounding type, and hit location. It can optionally replace WFRP4e's normal weapon critical routing so critical hits use the expanded tables when the attacking weapon has a matching `Wounding (...)` quality.

## Installation

Use this manifest URL in Foundry's module installer:

```text
https://github.com/jeremyglebe/FoundryVTT-WFRP-Expanded-Wounding/releases/latest/download/module.json
```

After installation, enable the module in a WFRP4e world.

## First Setup

1. Open Foundry's `Configure Settings`.
2. Find `Expanded Criticals`.
3. Click `Open Expanded Criticals`.
4. Click `Install or Repair Tables`.

This creates module-managed world critical Items and RollTables in `Expanded Critical Hits` folders. The setup button can be run again later to repair missing, renamed, or outdated managed documents.

## Using Expanded Critical Routing

1. Add one or more `Wounding (...)` qualities to weapons.
2. Enable the world setting `Replace WFRP Critical Tables`.
3. Roll criticals normally through WFRP4e.

When replacement is enabled, weapon criticals from a weapon with a `Wounding (...)` quality route to the expanded table for the active WFRP critical ruleset and hit location.

If a weapon has no `Wounding (...)` quality, the module leaves WFRP4e's normal critical table behavior unchanged.

## Wounding Qualities

The module registers weapon qualities such as:

- `Wounding (Cutting)`
- `Wounding (Crushing)`
- `Wounding (Piercing)`
- `Wounding (Arrows)`
- `Wounding (Bolts)`
- `Wounding (Flame)`
- `Wounding (Energy)`
- `Wounding (Teeth)`
- `Wounding (Claws)`

Weapons may have more than one wounding quality. When a critical is routed through this module, one matching wounding type is chosen randomly.

Some wounding qualities currently share table families. For example, `Wounding (Arrows)` and `Wounding (Bolts)` both use the Arrows/Bolts tables.

## Core And Up In Arms

The module supports both Core and Up In Arms critical ranges. It follows WFRP4e's `Up In Arms Criticals` setting when choosing which managed table variant to roll.

## Manual Table Use

Replacement is optional. If `Replace WFRP Critical Tables` is disabled, GMs can still roll the installed expanded RollTables using Foundry's normal RollTable workflow.

RollTables are named for searchability, such as:

```text
Leg Criticals - Cutting - Core
Leg Criticals - Cutting - Up In Arms
```

## Current Limitations

- Critical wound effect automation is not implemented yet.
- GMs must assign `Wounding (...)` qualities to weapons themselves.
- The module does not rebuild or replace the WFRP4e trapping list.
- Custom user-defined damage types and table mappings are planned but not implemented yet.

## Compatibility

- Foundry VTT v13 minimum.
- Foundry VTT v14 verified by the module manifest.
- WFRP4e system required.
