class User
{
   public nickname: string;
   public journeys: Journey[];
   public checkpoints: Checkpoint[];

   constructor(nickname: string, journeys: Journey[], checkpoints: Checkpoint[]) {
      this.nickname = nickname;
      this.journeys = journeys;
      this.checkpoints = checkpoints;
   }
}