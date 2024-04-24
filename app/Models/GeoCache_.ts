import Riddle from "./Riddle";

export class GeoCache
{
    longitude: number;
    latitude: number;
    name: string;
    description: string;
    riddle: Riddle;
    beacon?: Beacon;
 
    public constructor(longitude: number, latitude: number, name: string, description: string, riddle: Riddle) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.description = description;
        this.riddle = riddle;
    }
}

export class Beacon
{
    minor: number;
    major: number;
    posDescription?: string;
}

export default GeoCache;