class Beacon 
{
    private longitude: number;
    private latitude: number;
    private name: string;
    private description: string;
    private riddle: Riddle;

    public constructor(longitude: number, latitude: number, name: string, description: string, riddle: Riddle) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.description = description;
        this.riddle = riddle;
    }
}

