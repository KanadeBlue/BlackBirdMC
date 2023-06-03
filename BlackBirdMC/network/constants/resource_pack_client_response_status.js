class ResourcePackClientResponseStatus {
    static NONE = 0;
    static REFUSED = 1;
    static SEND_PACKS = 2;
    static HAVE_ALL_PACKS = 3;
    static COMPLETED = 4;
}

module.exports = ResourcePackClientResponseStatus;