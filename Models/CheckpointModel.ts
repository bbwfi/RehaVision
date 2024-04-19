class Checkpoint
{
    beacon: Beacon;
    timestamp: number;

    constructor(beacon: Beacon, timestamp: number) {
        this.beacon = beacon;
        this.timestamp = timestamp;
    }
}