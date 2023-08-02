const EventListener = require("../../../event/event_list");
const Cancelled = require("../../../event/cancelled");

class LoginHandle {
  static handler(packet, player) {
    // TODO: Add player auth checker.

    // Check if the event is not cancelled before adding it to the listener.
    if (!Cancelled.is_cancelled()) {
      EventListener.add_to_listener("player_login_event");
    }

    // Cache the player's connection address for better readability.
    const playerAddressName = player.connection.address.name;

    // Log the triggered login handle with the player's address name.
    console.log(playerAddressName + " triggered login handle");
  }
}

module.exports = LoginHandle;
