import GeoCache from "./Geocache";
import Route from "./Route";
import { User } from "firebase/auth";

export class Journey
{
    user: User;
    route: Route;
    currentCache: GeoCache;
    duration?: number;

    constructor(route: Route, currentCache: GeoCache, user: User) {
        this.route = route;
        this.currentCache = currentCache;
        this.user = user;
    }
}

export default Journey;