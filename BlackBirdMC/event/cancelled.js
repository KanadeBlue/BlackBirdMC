class Cancelled {
    eventCancelled = false;

    static is_cancelled() {
        return this.eventCancelled;
    }
}

module.exports = Cancelled;