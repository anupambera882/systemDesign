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

// factory to decide which type of obj create by it type
export default class FactoryDesign {
  public static getShape(shapeType: String): Shape {
    switch (shapeType) {
      case "RECTANGLE":
        return new Rectangle(2, 4);

      case "SQUARE":
        return new Square(2);

      case "CIRCLE":
        return new Circle(7);

      default:
        return new Rectangle(2, 4);
    }
  }
}

const shapeType = FactoryDesign.getShape("RECTANGLE");
shapeType.calculateArea();
