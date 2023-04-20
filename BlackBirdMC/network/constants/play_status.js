class PlayStatus {
    static LOGIN_SUCCESS = 0;
    static FAILED_CLIENT = 1;
    static FAILED_SPAWN = 2;
    static PLAYER_SPAWN = 3;
    static FAILED_INVALID_TENANT = 4;
    static FAILED_VANILLA_EDU = 5;
    static FAILED_EDU_VANILLA = 6;
    static FAILED_SERVER_FULL = 7;
    static FAILED_EDITOR_VANILLA_MISMATCH = 8;
    static FAILED_VANILLA_EDITOR_MISMATCH = 9;
}

module.exports = PlayStatus;