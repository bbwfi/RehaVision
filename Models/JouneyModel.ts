class Journey
{
    public route: Route;
    public nextBeacon: Beacon;

    constructor(route: Route, nextBeacon: Beacon) {
        this.route = route;
        this.nextBeacon = nextBeacon;
    }
}