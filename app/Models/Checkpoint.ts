import { Timestamp } from "firebase/firestore";
import GeoCache from "./GeoCache";

// zur erfassung der zeitstamps für die berechnug der gesammtzeit im Leaderboard benötigt
export class Checkpoint
{
    geoCache: GeoCache;
    timestamp: Timestamp;

    constructor(geoCache: GeoCache, timestamp: Timestamp) {
        this.geoCache = geoCache;
        this.timestamp = timestamp;
    }
}
