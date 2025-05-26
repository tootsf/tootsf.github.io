---
layout: default
title: Server Functions
parent: Framework
grand_parent: Modules
nav_order: 2
has_children: true
permalink: /community_bridge/modules/framework/server/
---

# Framework Server Functions
{: .no_toc }

Server-side functions for player management, economy, and framework integration.

## Table of Contents

- [GetFrameworkName](server/GetFrameworkName.md)
- [GetPlayer](server/GetPlayer.md)
- [GetPlayers](server/GetPlayers.md)
- [GetPlayerDob](server/GetPlayerDob.md)
- [GetPlayerPhone](server/GetPlayerPhone.md)
- [GetPlayerGang](server/GetPlayerGang.md)
- [GetFrameworkJobs](server/GetFrameworkJobs.md)
- [GetPlayerJob](server/GetPlayerJob.md)
- [GetPlayerJobData](server/GetPlayerJobData.md)
- [GetPlayersByJob](server/GetPlayersByJob.md)
- [GetPlayerDuty](server/GetPlayerDuty.md)
- [SetPlayerDuty](server/SetPlayerDuty.md)
- [SetPlayerJob](server/SetPlayerJob.md)
- [GetAccountBalance](server/GetAccountBalance.md)
- [AddAccountBalance](server/AddAccountBalance.md)
- [RemoveAccountBalance](server/RemoveAccountBalance.md)
- [GetItem](server/GetItem.md)
- [GetItemInfo](server/GetItemInfo.md)
- [GetItemCount](server/GetItemCount.md)
- [HasItem](server/HasItem.md)
- [GetPlayerInventory](server/GetPlayerInventory.md)
- [GetItemBySlot](server/GetItemBySlot.md)
- [AddItem](server/AddItem.md)
- [RemoveItem](server/RemoveItem.md)
- [SetMetadata](server/SetMetadata.md)
- [GetPlayerMetadata](server/GetPlayerMetadata.md)
- [SetPlayerMetadata](server/SetPlayerMetadata.md)
- [GetHunger](server/GetHunger.md)
- [GetThirst](server/GetThirst.md)
- [AddHunger](server/AddHunger.md)
- [AddThirst](server/AddThirst.md)
- [AddStress](server/AddStress.md)
- [RemoveStress](server/RemoveStress.md)
- [GetIsPlayerDead](server/GetIsPlayerDead.md)
- [RevivePlayer](server/RevivePlayer.md)
- [GetOwnedVehicles](server/GetOwnedVehicles.md)
- [RegisterUsableItem](server/RegisterUsableItem.md)
- [Commands.Add](server/Commands.Add.md)
- [community_bridge:Server:OnPlayerLoaded](server/community_bridge:Server:OnPlayerLoaded.md)
- [community_bridge:Server:OnPlayerUnload](server/community_bridge:Server:OnPlayerUnload.md)
- [GetName](server/GetName.md)
- [GetSourceFromIdentifier](server/GetSourceFromIdentifier.md)
- [GetMoney](server/GetMoney.md)
- [AddMoney](server/AddMoney.md)
- [RemoveMoney](server/RemoveMoney.md)
- [GetJob](server/GetJob.md)
- [SetJob](server/SetJob.md)

## 📚 Best Practices

### Error Handling

Always check return values for nil or false to handle cases where operations fail:

```lua
local Bridge = exports['community_bridge']:Bridge()
local money = Bridge.Framework.GetMoney(playerId)
if money then
    -- Safe to use money value
else
    print("Error: Could not retrieve player money")
end
```

### Performance Considerations

Cache frequently accessed data to reduce database queries:

```lua
local Bridge = exports['community_bridge']:Bridge()
local playerData = {}
playerData.identifier = Bridge.Framework.GetIdentifier(playerId)
playerData.money = Bridge.Framework.GetMoney(playerId)
playerData.job = Bridge.Framework.GetJob(playerId)
```
