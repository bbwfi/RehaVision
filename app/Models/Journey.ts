import GeoCache from "./GeoCache";
import Route from "./Route";
import { User } from "firebase/auth";

export class Journey
{
    //user: User; - needed?
    route: Route;
    currentCache: GeoCache;
    duration?: number;

    constructor(route: Route, currentCache: GeoCache, user: User) {
        this.route = route;
        this.currentCache = currentCache;
        //this.user = user; - needed?
    }
}

export default Journey;