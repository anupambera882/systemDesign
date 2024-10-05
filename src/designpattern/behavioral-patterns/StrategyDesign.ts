interface TravelStrategy {
  travel: (source: String, destination: String) => void;
}

class CarTravelStrategy implements TravelStrategy {
  public travel(source: String, destination: String): void {
    console.log("Traveling by car from " + source + " to " + destination);
  }
}

class BicycleTravelStrategy implements TravelStrategy {
  public travel(source: String, destination: String): void {
    console.log("Traveling by bicycle from " + source + " to " + destination);
  }
}

class WalkingTravelStrategy implements TravelStrategy {
  public travel(source: String, destination: String): void {
    console.log("Traveling on foot from " + source + " to " + destination);
  }
}

class TravelPlanner {
  public constructor(private travelStrategy: TravelStrategy) {}

  public setTravelStrategy(travelStrategy: TravelStrategy): void {
    this.travelStrategy = travelStrategy;
  }

  public planTravel(source: String, destination: String): void {
    this.travelStrategy.travel(source, destination);
  }
}

// client code
export default class StrategyDesign {
  public static main(): void {
    const travelPlanner = new TravelPlanner(new CarTravelStrategy());

    // Plan travel by car
    travelPlanner.planTravel("Home", "Office");

    // Change strategy to bicycle
    travelPlanner.setTravelStrategy(new BicycleTravelStrategy());
    // Plan travel by bicycle
    travelPlanner.planTravel("Office", "Park");

    // Change strategy to walking
    travelPlanner.setTravelStrategy(new WalkingTravelStrategy());
    // Plan travel by walking
    travelPlanner.planTravel("Park", "Restaurant");
  }
}
