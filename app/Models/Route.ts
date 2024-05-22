import Beacon from "./GeoCache";

export class Route
{
    name: string;
    beacon: Beacon[];

    public constructor(name: string, beacon: Beacon[]) {
        this.name = name;
        this.beacon = beacon;
    }
}
export default Route;