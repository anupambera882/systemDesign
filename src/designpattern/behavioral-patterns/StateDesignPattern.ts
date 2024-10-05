enum Coin {
  PENNY = 1,
  NICKEL = 5,
  DIME = 10,
  QUARTER = 25,
}

enum ItemType {
  COKE = "COKE",
  PEPSI = "PEPSI",
  JUICE = "JUICE",
  SODA = "SODA",
}

class Item {
  type: ItemType;
  price: number;

  constructor(type: ItemType, price: number) {
    this.type = type;
    this.price = price;
  }

  getType(): ItemType {
    return this.type;
  }

  getPrice(): number {
    return this.price;
  }
}

class ItemShelf {
  code: number;
  item: Item;
  soldOut: boolean;

  constructor(code: number, item: Item, soldOut: boolean) {
    this.code = code;
    this.item = item;
    this.soldOut = soldOut;
  }

  getCode(): number {
    return this.code;
  }

  setCode(code: number): void {
    this.code = code;
  }

  getItem(): Item {
    return this.item;
  }

  setItem(item: Item): void {
    this.item = item;
  }

  isSoldOut(): boolean {
    return this.soldOut;
  }

  setSoldOut(soldOut: boolean): void {
    this.soldOut = soldOut;
  }
}

class Inventory {
  inventory: ItemShelf[] = [];

  constructor(itemCount: number) {
    this.inventory = new Array(itemCount);
    this.initialEmptyInventory();
  }

  getInventory(): ItemShelf[] {
    return this.inventory;
  }

  setInventory(inventory: ItemShelf[]): void {
    this.inventory = inventory;
  }

  initialEmptyInventory(): void {
    let startCode = 101;
    for (let i = 0; i < this.inventory.length; i++) {
      const space = new ItemShelf(startCode, {} as Item, true);
      this.inventory[i] = space;
      startCode++;
    }
  }

  async addItem(item: Item, codeNumber: number): Promise<void> {
    for (const itemShelf of this.inventory) {
      if (itemShelf.getCode() === codeNumber) {
        if (itemShelf.isSoldOut()) {
          itemShelf.setItem(item);
          itemShelf.setSoldOut(false);
        } else {
          throw new Error(
            "Already an item is present, you cannot add an item here"
          );
        }
      }
    }
  }

  getItem(codeNumber: number): Item {
    for (const itemShelf of this.inventory) {
      if (itemShelf.getCode() === codeNumber) {
        if (itemShelf.isSoldOut()) {
          throw new Error("Item already sold out");
        } else {
          return itemShelf.getItem();
        }
      }
    }
    throw new Error("Invalid Code");
  }

  updateSoldOutItem(codeNumber: number): void {
    for (const itemShelf of this.inventory) {
      if (itemShelf.getCode() === codeNumber) {
        itemShelf.setSoldOut(true);
      }
    }
  }
}

interface State {
  clickOnInsertCoinButton(machine: VendingMachine): void;

  clickOnStartProductSelectionButton(machine: VendingMachine): void;

  insertCoin(machine: VendingMachine, coin: Coin): void;

  chooseProduct(machine: VendingMachine, codeNumber: number): void;

  getChange(returnChangeMoney: number): number;

  dispenseProduct(machine: VendingMachine, codeNumber: number): Item;

  refundFullMoney(machine: VendingMachine): Coin[];

  updateInventory(
    machine: VendingMachine,
    item: Item,
    codeNumber: number
  ): void;
}

class HasMoneyState implements State {
  constructor() {
    console.log("Currently Vending machine is in HasMoneyState");
  }

  clickOnInsertCoinButton(_machine: VendingMachine): void {
    // Do nothing as the machine is already in HasMoneyState
  }

  clickOnStartProductSelectionButton(machine: VendingMachine): void {
    machine.setVendingMachineState(new SelectionState());
  }

  insertCoin(machine: VendingMachine, coin: Coin): void {
    console.log("Accepted the coin");
    machine.getCoinList().push(coin);
  }

  chooseProduct(_machine: VendingMachine, _codeNumber: number): void {
    throw new Error(
      "You need to click on the start product selection button first"
    );
  }

  getChange(_returnChangeMoney: number): number {
    throw new Error("You cannot get change in HasMoneyState");
  }

  dispenseProduct(_machine: VendingMachine, _codeNumber: number): Item {
    throw new Error("Product cannot be dispensed in HasMoneyState");
  }

  refundFullMoney(machine: VendingMachine): Coin[] {
    console.log("Returned the full amount back in the Coin Dispense Tray");
    machine.setVendingMachineState(new IdleState(machine));
    return machine.getCoinList();
  }

  updateInventory(
    _machine: VendingMachine,
    _item: Item,
    _codeNumber: number
  ): void {
    throw new Error("You cannot update inventory in HasMoneyState");
  }
}

class DispenseState implements State {
  constructor(machine: VendingMachine, codeNumber: number) {
    console.log("Currently Vending machine is in DispenseState");
    this.dispenseProduct(machine, codeNumber);
  }

  clickOnInsertCoinButton(_machine: VendingMachine): void {
    throw new Error("Insert coin button cannot be clicked in Dispense state");
  }

  clickOnStartProductSelectionButton(_machine: VendingMachine): void {
    throw new Error(
      "Product selection button cannot be clicked in Dispense state"
    );
  }

  insertCoin(_machine: VendingMachine, _coin: Coin): void {
    throw new Error("Coin cannot be inserted in Dispense state");
  }

  chooseProduct(_machine: VendingMachine, _codeNumber: number): void {
    throw new Error("Product cannot be chosen in Dispense state");
  }

  getChange(_returnChangeMoney: number): number {
    throw new Error("Change cannot be returned in Dispense state");
  }

  refundFullMoney(_machine: VendingMachine): Coin[] {
    throw new Error("Refund cannot happen in Dispense state");
  }

  dispenseProduct(machine: VendingMachine, codeNumber: number): Item {
    console.log("Product has been dispensed");
    const item = machine.getInventory().getItem(codeNumber);
    machine.getInventory().updateSoldOutItem(codeNumber);
    machine.setVendingMachineState(new IdleState(machine));
    return item;
  }

  updateInventory(
    _machine: VendingMachine,
    _item: Item,
    _codeNumber: number
  ): void {
    throw new Error("Inventory cannot be updated in Dispense state");
  }
}

class SelectionState implements State {
  constructor() {
    console.log("Currently Vending machine is in SelectionState");
  }

  clickOnInsertCoinButton(_machine: VendingMachine): void {
    throw new Error(
      "You cannot click on insert coin button in Selection state"
    );
  }

  clickOnStartProductSelectionButton(_machine: VendingMachine): void {
    // Do nothing as the product selection has already started
  }

  insertCoin(_machine: VendingMachine, _coin: Coin): void {
    throw new Error("You cannot insert coin in selection state");
  }

  chooseProduct(machine: VendingMachine, codeNumber: number): void {
    // 1. Get item for the codeNumber
    const item = machine.getInventory().getItem(codeNumber);

    // 2. Total amount paid by the user
    const paidByUser = machine
      .getCoinList()
      .reduce((sum, coin) => sum + coin, 0);

    // 3. Compare product price and amount paid by user
    if (paidByUser < item.getPrice()) {
      console.log(
        `Insufficient Amount, Product selected is for price: ${item.getPrice()} and you paid: ${paidByUser}`
      );
      this.refundFullMoney(machine);
      throw new Error("Insufficient amount");
    } else if (paidByUser >= item.getPrice()) {
      if (paidByUser > item.getPrice()) {
        this.getChange(paidByUser - item.getPrice());
      }
      machine.setVendingMachineState(new DispenseState(machine, codeNumber));
    }
  }

  getChange(returnExtraMoney: number): number {
    console.log(
      `Returned the change in the Coin Dispense Tray: ${returnExtraMoney}`
    );
    return returnExtraMoney;
  }

  refundFullMoney(machine: VendingMachine): Coin[] {
    console.log("Returned the full amount back in the Coin Dispense Tray");
    machine.setVendingMachineState(new IdleState(machine));
    return machine.getCoinList();
  }

  dispenseProduct(_machine: VendingMachine, _codeNumber: number): Item {
    throw new Error("Product cannot be dispensed in Selection state");
  }

  updateInventory(
    _machine: VendingMachine,
    _item: Item,
    _codeNumber: number
  ): void {
    throw new Error("Inventory cannot be updated in Selection state");
  }
}

class IdleState implements State {
  constructor(machine?: VendingMachine) {
    console.log("Currently Vending machine is in IdleState");
    if (machine) {
      machine.setCoinList([]);
    }
  }

  clickOnInsertCoinButton(machine: VendingMachine): void {
    machine.setVendingMachineState(new HasMoneyState());
  }

  clickOnStartProductSelectionButton(_machine: VendingMachine): void {
    throw new Error("First you need to click on insert coin button");
  }

  insertCoin(_machine: VendingMachine, _coin: Coin): void {
    throw new Error("You cannot insert coin in idle state");
  }

  chooseProduct(_machine: VendingMachine, _codeNumber: number): void {
    throw new Error("You cannot choose product in idle state");
  }

  getChange(_returnChangeMoney: number): number {
    throw new Error("You cannot get change in idle state");
  }

  refundFullMoney(_machine: VendingMachine): Coin[] {
    throw new Error("You cannot get refunded in idle state");
  }

  dispenseProduct(_machine: VendingMachine, _codeNumber: number): Item {
    throw new Error("Product cannot be dispensed in idle state");
  }

  updateInventory(
    machine: VendingMachine,
    item: Item,
    codeNumber: number
  ): void {
    machine.getInventory().addItem(item, codeNumber);
  }
}

class VendingMachine {
  private vendingMachineState: State;
  private inventory: Inventory;
  private coinList: Coin[];

  constructor(itemCount: number) {
    this.vendingMachineState = new IdleState();
    this.inventory = new Inventory(itemCount);
    this.coinList = [];
  }

  getVendingMachineState(): State {
    return this.vendingMachineState;
  }

  setVendingMachineState(vendingMachineState: State): void {
    this.vendingMachineState = vendingMachineState;
  }

  getInventory(): Inventory {
    return this.inventory;
  }

  setInventory(inventory: Inventory): void {
    this.inventory = inventory;
  }

  getCoinList(): Coin[] {
    return this.coinList;
  }

  setCoinList(coinList: Coin[]): void {
    this.coinList = coinList;
  }
}

class Main {
  public static main(): void {
    const vendingMachine = new VendingMachine(10);
    try {
      console.log("|");
      console.log("filling up the inventory");
      console.log("|");

      Main.fillUpInventory(vendingMachine);
      Main.displayInventory(vendingMachine);

      console.log("|");
      console.log("clicking on InsertCoinButton");
      console.log("|");

      let vendingState = vendingMachine.getVendingMachineState();
      vendingState.clickOnInsertCoinButton(vendingMachine);

      vendingState = vendingMachine.getVendingMachineState();
      vendingState.insertCoin(vendingMachine, Coin.NICKEL);
      vendingState.insertCoin(vendingMachine, Coin.QUARTER);

      console.log("|");
      console.log("clicking on ProductSelectionButton");
      console.log("|");
      vendingState.clickOnStartProductSelectionButton(vendingMachine);

      vendingState = vendingMachine.getVendingMachineState();
      vendingState.chooseProduct(vendingMachine, 102);

      Main.displayInventory(vendingMachine);
    } catch (error) {
      console.error(error);
      Main.displayInventory(vendingMachine);
    }
  }

  private static fillUpInventory(vendingMachine: VendingMachine): void {
    const slots = vendingMachine.getInventory().getInventory();
    for (let i = 0; i < slots.length; i++) {
      let newItem;
      if (i >= 0 && i < 3) {
        newItem = new Item(ItemType.COKE, 12);
      } else if (i >= 3 && i < 5) {
        newItem = new Item(ItemType.PEPSI, 9);
      } else if (i >= 5 && i < 7) {
        newItem = new Item(ItemType.JUICE, 13);
      } else {
        newItem = new Item(ItemType.SODA, 7);
      }
      slots[i].setItem(newItem);
      slots[i].setSoldOut(false);
    }
  }

  private static displayInventory(vendingMachine: VendingMachine): void {
    const slots = vendingMachine.getInventory().getInventory();
    for (let i = 0; i < slots.length; i++) {
      console.log(
        `CodeNumber: ${slots[i].getCode()} Item: ${slots[i]
          .getItem()
          .getType()} Price: ${slots[i]
          .getItem()
          .getPrice()} isAvailable: ${!slots[i].isSoldOut()}`
      );
    }
  }
}

Main.main();
