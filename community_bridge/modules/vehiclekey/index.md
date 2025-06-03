---
layout: default
title: "🔑 Vehiclekey"
parent: Modules
grand_parent: Community Bridge
nav_order: 22
has_children: true
permalink: /community_bridge/modules/vehiclekey/
---

# VehicleKey Module
{: .no_toc }

The VehicleKey module provides a unified interface for managing vehicle keys across multiple popular vehicle key systems in FiveM. It automatically detects and integrates with installed vehicle key resources, providing consistent functionality regardless of the underlying system.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

The VehicleKey module offers:

- **Multi-System Support**: Compatible with 13+ vehicle key resources
- **Automatic Detection**: Automatically detects installed vehicle key systems
- **Key Management**: Give and remove vehicle keys programmatically
- **Consistent API**: Same function calls work across all supported systems
- **Fallback Handling**: Graceful fallback when no key system is detected

---

## 📚 Supported Vehicle Key Resources

- **qb-vehiclekeys**: QBCore vehicle keys
- **qbx_vehiclekeys**: QBX vehicle keys  
- **qs-vehiclekeys**: QuaS vehicle keys
- **Renewed-Vehiclekeys**: Renewed Scripts vehicle keys
- **wasabi_carlock**: Wasabi car lock system
- **t1ger_keys**: T1GER key system
- **mk_vehiclekeys**: MK vehicle keys
- **mono_carkeys**: Mono car keys
- **MrNewbVehicleKeys**: MrNewb vehicle keys
- **jacksam**: Jacksam vehicle keys
- **F_RealCarKeysSystem**: Real car keys system
- **cd_garage**: CD Garage integration
- **okokGarage**: OKOK Garage integration
- **Default**: Fallback when no system is detected

---

## 📚 Available Functions

### Client Functions
- [View all client functions](client/functions/) - Complete list of client-side vehicle key functions

---

## 📚 Module Structure

```
vehicleKey/
├── _default/                # Fallback implementation
├── qb-vehiclekeys/         # QBCore integration
├── qbx_vehiclekeys/        # QBX integration
├── qs-vehiclekeys/         # QuaS integration
├── Renewed-Vehiclekeys/    # Renewed Scripts integration
├── wasabi_carlock/         # Wasabi integration
├── t1ger_keys/            # T1GER integration
├── mk_vehiclekeys/        # MK integration
├── mono_carkeys/          # Mono integration
├── MrNewbVehicleKeys/     # MrNewb integration
├── jacksam/               # Jacksam integration
├── F_RealCarKeysSystem/   # Real car keys integration
├── cd_garage/             # CD Garage integration
└── okokGarage/            # OKOK Garage integration
```

---

## 📚 Bridge System

The module uses a bridge system that:
1. Checks for installed vehicle key resources using `GetResourceState()`
2. Loads appropriate integration files for detected systems
3. Falls back to default implementation if no system is found
4. Provides consistent API calls regardless of underlying system

---

## 📚 Usage Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Give keys to a vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
local plate = GetVehicleNumberPlateText(vehicle)
Bridge.VehicleKey.GiveKeys(vehicle, plate)

-- Remove keys from a vehicle
Bridge.VehicleKey.RemoveKeys(vehicle, plate)
```

---

## 📚 Integration Benefits

- **Code Portability**: Same code works across different servers with different key systems
- **Easy Migration**: Switch between key systems without changing your scripts
- **Automatic Detection**: No manual configuration needed
- **Fallback Safety**: Functions won't error even without a key system installed
