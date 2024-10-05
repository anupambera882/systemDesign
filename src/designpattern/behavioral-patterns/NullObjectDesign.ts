interface Car {
  drive: () => void;
  stop: () => void;
}

class SUV implements Car {
  public drive() {
    console.log("Driving an SUV");
  }

  public stop() {
    console.log("Stopping an SUV");
  }
}

class Sedan implements Car {
  public drive() {
    console.log("Driving a Sedan");
  }

  public stop() {
    console.log("Stopping a Sedan");
  }
}

class NullCar implements Car {
  public drive() {
    // Do nothing
  }

  public stop() {
    // Do nothing
  }
}

class CarRentalService {
  public constructor(private car: Car) {}

  public rentCar() {
    this.car.drive();
    this.car.stop();
  }
}

export default class NullObjectDesign {
  public static main() {
    const suv = new SUV();
    const sedan = new Sedan();
    const nullCar = new NullCar();

    const rentalService1 = new CarRentalService(suv);
    const rentalService2 = new CarRentalService(sedan);
    const rentalService3 = new CarRentalService(nullCar);

    rentalService1.rentCar(); // Output: Driving an SUV, Stopping an SUV
    rentalService2.rentCar(); // Output: Driving a Sedan, Stopping a Sedan
    rentalService3.rentCar(); // No output
  }
}

NullObjectDesign.main();
