interface Pizza {
  getDescription: () => String;
  cost: () => number;
}

class PlainPizza implements Pizza {
  public getDescription(): String {
    return "Plain pizza";
  }

  public cost(): number {
    return 8.0; // Base price of the pizza
  }
}

abstract class PizzaDecorator implements Pizza {
  protected decoratedPizza: Pizza;

  public constructor(decoratedPizza: Pizza) {
    this.decoratedPizza = decoratedPizza;
  }

  public getDescription(): String {
    return this.decoratedPizza.getDescription();
  }

  public cost(): number {
    return this.decoratedPizza.cost();
  }
}

class CheeseDecorator extends PizzaDecorator {
  public constructor(decoratedPizza: Pizza) {
    super(decoratedPizza);
  }

  public getDescription(): string {
    return this.decoratedPizza.getDescription() + ", cheese";
  }

  public cost(): number {
    return this.decoratedPizza.cost() + 1.5; // Cost of cheese topping
  }
}

class PepperoniDecorator extends PizzaDecorator {
  public constructor(decoratedPizza: Pizza) {
    super(decoratedPizza);
  }

  public getDescription(): string {
    return this.decoratedPizza.getDescription() + ", pepperoni";
  }

  public cost(): number {
    return this.decoratedPizza.cost() + 2.0; // Cost of pepperoni topping
  }
}

class MushroomDecorator extends PizzaDecorator {
  public constructor(decoratedPizza: Pizza) {
    super(decoratedPizza);
  }

  public getDescription(): String {
    return this.decoratedPizza.getDescription() + ", mushrooms";
  }

  public cost(): number {
    return this.decoratedPizza.cost() + 1.0; // Cost of mushroom topping
  }
}

class OliveDecorator extends PizzaDecorator {
  public constructor(decoratedPizza: Pizza) {
    super(decoratedPizza);
  }

  public getDescription(): String {
    return this.decoratedPizza.getDescription() + ", olives";
  }

  public cost(): number {
    return this.decoratedPizza.cost() + 0.75; // Cost of olive topping
  }
}

// client code
export default class PizzaShop {
  public static main() {
    let pizza: Pizza = new PlainPizza();
    console.log(pizza.getDescription() + " $" + pizza.cost());

    pizza = new CheeseDecorator(pizza);
    console.log(pizza.getDescription() + " $" + pizza.cost());

    pizza = new PepperoniDecorator(pizza);
    console.log(pizza.getDescription() + " $" + pizza.cost());

    pizza = new MushroomDecorator(pizza);
    console.log(pizza.getDescription() + " $" + pizza.cost());

    pizza = new OliveDecorator(pizza);
    console.log(pizza.getDescription() + " $" + pizza.cost());
  }
}
