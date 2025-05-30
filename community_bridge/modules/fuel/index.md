---
layout: default
title: "⛽ Fuel"
parent: Modules
grand_parent: Community Bridge
nav_order: 7
has_children: true
permalink: /community_bridge/modules/fuel/
---

# Fuel Module
{: .no_toc }

The fuel module provides vehicle fuel management functionality with support for multiple fuel systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Available Functions

### Client-side
- [`GetResourceName()`](client/GetResourceName.md) - Get the name of the fuel system being used
- [`GetFuel(vehicle)`](client/GetFuel.md) - Get the fuel level of a vehicle
- [`SetFuel(vehicle, fuel)`](client/SetFuel.md) - Set the fuel level of a vehicle

### Server-side
No server-side functions available.

---

## 📚 Supported Systems

The module supports multiple fuel systems:
- bigDaddy-Fuel
- cdn-fuel
- esx-sna-fuel
- lc_fuel
- legacyfuel
- okokGasStation
- ox_fuel
- ps-fuel
- qs-fuelstations
- renewed-Fuel
- ti_fuel
- x-fuel

---

## 📚 Integration

The module automatically detects which fuel system is installed and provides a unified interface for fuel management across different systems.
