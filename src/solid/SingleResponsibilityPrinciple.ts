// A class should have a single, well-defined responsibility or job.
// This makes code more modular and easier to maintain and extend

class Marker {
  name: string;
  color: string;
  year: number;
  price: number;

  public constructor(name: string, color: string, year: number, price: number) {
    this.name = name;
    this.color = color;
    this.year = year;
    this.price = price;
  }
}

export class CreateInvoice {
  public constructor(private marker: Marker, private quantity: number) {}

  public calculate(): number {
    const price = this.marker.price * this.quantity;
    return price;
  }

  public createInvoice() {
    // create invoice and return
    return "invoice created";
  }
}

export class SaveInvoice {

  public constructor(private createInvoice: CreateInvoice) {
  }

  public saveInvoice(): void {
    this.createInvoice.createInvoice();
    // save this invoice
  }
}
