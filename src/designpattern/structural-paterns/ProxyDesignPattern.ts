// Subject
interface Image {
  display: () => void;
}

class RealImage implements Image {
  private filename: string;

  public constructor(filename: string) {
    this.filename = filename;
    this.loadImageFromDisk();
  }

  private loadImageFromDisk() {
    console.log("Loading image: " + this.filename);
  }

  public display() {
    console.log("Displaying image: " + this.filename);
  }
}

// Proxy
class ProxyImage implements Image {
  private realImage: RealImage | null = null;
  private filename: string;

  public constructor(filename: string) {
    this.filename = filename;
  }

  public display() {
    if (this.realImage == null) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Client code
const image = new ProxyImage("example.jpg");
image.display(); // Image will be loaded from disk only when display() is called
image.display(); // Image will not be loaded again, as it has been cached in the Proxy
