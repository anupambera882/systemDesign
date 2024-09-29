//  Avoid designing overly large interfaces.

interface WaiterInterface {
  serveCustomer: () => void;
  takeOrder: () => void;
}

interface ChefInterface {
  cookFood: () => void;
  decideMenu: () => void;
}

export class waiter implements WaiterInterface {
  public serveCustomer(): void {
    console.log("serving the customer");
  }

  public takeOrder(): void {
    console.log("taking order");
  }
}

export class Chef implements ChefInterface {
  decideMenu(): void {
    console.log("decide menu");
  }
  cookFood(): void {
    console.log("cook food");
  }
}
