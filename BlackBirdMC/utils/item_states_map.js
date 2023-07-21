const ItemState = require("../network/types/item_state");

class ItemStatesMap {
  states;
  runtimeToName;
  nameToRuntime;

  constructor(states) {
    this.states = states.map((entry) => {
      const state = new ItemState();
      state.name = entry["name"];
      state.runtime_id = entry["runtime_id"];
      state.component_based = entry["component_based"];
      return state;
    });

    this.runtimeToName = this.states.reduce((map, state) => {
      map[state.runtime_id] = state.name;
      return map;
    }, {});

    this.nameToRuntime = this.states.reduce((map, state) => {
      map[state.name] = state.runtime_id;
      return map;
    }, {});
  }

  runtimeToName(runtimeID) {
    return this.runtimeToName[runtimeID];
  }

  nameToRuntime(name) {
    return this.nameToRuntime[name];
  }
}

module.exports = ItemStatesMap;
