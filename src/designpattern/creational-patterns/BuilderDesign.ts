interface Builder {
  setSeats(seats: number): this;
  setEngine(engine: string): this;
}

class Car {
  private seats = 0;
  private engine = "";

  public setSeats(seats: number): void {
    this.seats = seats;
  }

  public setEngine(engine: string): void {
    this.engine = engine;
  }

  public show(): void {
    console.log(`Seats: ${this.seats}`);
    console.log(`Engine: ${this.engine}`);
  }
}

class Motorcycle {
  private seats = 0;
  private engine = "";

  public setSeats(seats: number): void {
    if (seats > 2) {
      throw new Error("Motorcycle can not have more than 2 seats");
    }
    this.seats = seats;
  }

  public setEngine(engine: string): void {
    this.engine = engine;
  }

  public show(): void {
    console.log(`Seats: ${this.seats}`);
    console.log(`Engine: ${this.engine}`);
  }
}

class CarBuilder implements Builder {
  constructor(private car = new Car()) {}

  public setSeats(seats: number): this {
    this.car.setSeats(seats);
    return this;
  }

  public setEngine(engine: string): this {
    this.car.setEngine(engine);
    return this;
  }

  public getResult(): Car {
    return this.car;
  }
}

class MotorcycleBuilder implements Builder {
  constructor(private motorcycle = new Motorcycle()) {}

  public setSeats(seats: number): this {
    this.motorcycle.setSeats(seats);
    return this;
  }

  public setEngine(engine: string): this {
    this.motorcycle.setEngine(engine);
    return this;
  }

  public getResult(): Motorcycle {
    return this.motorcycle;
  }
}

class Director {
  public buildFerrari(): Car {
    return new CarBuilder().setSeats(2).setEngine("V-12").getResult();
  }

  public buildToyota(): Car {
    return new CarBuilder().setSeats(7).setEngine("V-6").getResult();
  }

  public buildHonda(): Motorcycle {
    return new MotorcycleBuilder().setSeats(2).setEngine("V-4").getResult();
  }

  public buildYamaha(): Motorcycle {
    return new MotorcycleBuilder().setSeats(1).setEngine("V-2").getResult();
  }
}

// Example code using directly the builders
const car = new CarBuilder().setSeats(2).setEngine("V-12").getResult();
car.show();

const motorcycle = new MotorcycleBuilder()
  .setSeats(2)
  .setEngine("V-4")
  .getResult();
motorcycle.show();

// Example code using the director
const director = new Director();
director.buildFerrari();
director.buildToyota();

director.buildHonda();
director.buildYamaha();
