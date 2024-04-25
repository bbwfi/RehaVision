import GeoCache from "./Geocache";

export class Checkpoint
{
    geoCache: GeoCache;
    timestamp: number;

    constructor(geoCache: GeoCache, timestamp: number) {
        this.geoCache = geoCache;
        this.timestamp = timestamp;
    }
}