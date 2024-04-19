class LeaderBoard
{
    private route: Route;
    private scores: Score[];

    public constructor(route: Route, scores: Score[]) {
        this.route = route;
        this.scores = scores;
    }
}