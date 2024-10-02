import * as readline from "readline/promises";

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Shape {
  calculateArea: () => void;
}

class Rectangle implements Shape {
  private width: number;
  private height: number;

  public constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }

  public calculateArea(): void {
    console.log("Area of Rectangle: " + this.width * this.height);
  }
}

class Square implements Shape {
  private side: number;

  public constructor(side: number) {
    this.side = side;
  }

  public calculateArea(): void {
    console.log("Area of Square: " + this.side * this.side);
  }
}

class Circle implements Shape {
  private radius: number;
  private static PI = 3.14;

  public constructor(radius: number) {
    this.radius = radius;
  }

  public calculateArea(): void {
    console.log("Area of Circle: " + Circle.PI * this.radius * this.radius);
  }
}

// factory to decide which type of obj create by its type
export default class FactoryDesign {
  public static async getShape(): Promise<Shape> {
    const shapeType = await read.question("Enter shape type: ");
    let shape: Shape;

    switch (shapeType) {
      case "RECTANGLE": {
        const height = await read.question("Enter height of the rectangle: ");
        const width = await read.question("Enter width of the rectangle: ");
        shape = new Rectangle(Number(height), Number(width));
        break;
      }

      case "SQUARE": {
        const side = await read.question("Enter side of the square: ");
        shape = new Square(Number(side));
        break;
      }

      case "CIRCLE": {
        const radius = await read.question("Enter radius of the circle: ");
        shape = new Circle(Number(radius));
        break;
      }

      default: {
        console.log("Invalid shape type, defaulting to rectangle.");
        const height = await read.question("Enter height of the rectangle: ");
        const width = await read.question("Enter width of the rectangle: ");
        shape = new Rectangle(Number(height), Number(width));
        break;
      }
    }

    read.close(); // Ensure this is always called
    return shape;
  }
}

FactoryDesign.getShape().then((shapeType) => {
  shapeType.calculateArea();
});
