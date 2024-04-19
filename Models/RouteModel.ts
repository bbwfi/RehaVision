class Route
{
    private name: string;
    private beacon: Beacon;

    public constructor(name: string, beacon: Beacon) {
        this.name = name;
        this.beacon = beacon;
    }
}