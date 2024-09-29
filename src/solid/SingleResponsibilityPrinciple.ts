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
  private marker: Marker;
  private quantity: number;

  public constructor(marker: Marker, quantity: number) {
    this.marker = marker;
    this.quantity = quantity;
  }

  public calculate(): number {
    const price = this.marker.price * this.quantity;
    return price;
  }

  public createInvoice() {
    // create invoice and return
    return "invoice created"
  }
}

export class SaveInvoice {
  private CreateInvoice: CreateInvoice;

  public constructor(CreateInvoice: CreateInvoice) {
    this.CreateInvoice = CreateInvoice;
  }

  public saveInvoice(): void {
    this.CreateInvoice.createInvoice();
    // save this invoice
  }
}
