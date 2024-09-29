// Every derived class should be substitutable for its parent class.
// means change existing functionality logic but don't Narrow it

class Vehicle {
  public getNumberOfWhile(): number {
    return 2;
  }
}

export class Bicycle extends Vehicle {}

class EngineVehicle extends Vehicle {
  public hasEngine(): boolean {
    return true;
  }
}

class Car extends EngineVehicle {}
class MotorCycle extends EngineVehicle {}

// client code
export class Main {
  public static main() {
    const list: EngineVehicle[] = [];
    list.push(new Car());
    list.push(new MotorCycle());
  }
}
