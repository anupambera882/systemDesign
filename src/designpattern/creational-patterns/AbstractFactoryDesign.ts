interface IButton {
  press: () => void;
}

class MacButton implements IButton {
  public press(): void {
    console.log("Mac Button Pressed");
  }
}

class WinButton implements IButton {
  public press(): void {
    console.log("Win Button Pressed");
  }
}

interface ITextBox {
  showText: () => void;
}

class MacTextBox implements ITextBox {
  public showText(): void {
    console.log("Showing Mac TextBox");
  }
}

class WinTextBox implements ITextBox {
  public showText(): void {
    console.log("Showing Win Button Pressed");
  }
}

interface IFactory {
  createButton: () => IButton;

  createTextBox: () => ITextBox;
}

class MacFactory implements IFactory {
  public createButton(): IButton {
    return new MacButton();
  }

  public createTextBox(): ITextBox {
    return new MacTextBox();
  }
}

class WinFactory implements IFactory {
  public createButton(): IButton {
    return new WinButton();
  }

  public createTextBox(): ITextBox {
    return new WinTextBox();
  }
}

export default class AbstractFactoryDesign {
  public static createFactory(osType: String): IFactory {
    switch (osType) {
      case "windows":
        return new WinFactory();

      case "mac":
        return new MacFactory();

      default:
        return new MacFactory();
    }
  }
}


// AbstractFactory
const fact = AbstractFactoryDesign.createFactory("windows");
const button = fact.createButton();
button.press();
const textBox = fact.createTextBox();
textBox.showText();
