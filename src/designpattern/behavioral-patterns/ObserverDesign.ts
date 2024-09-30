// design notify me for an e-commerce
interface NotificationAlertObserver {
  update: () => void;
}

interface StocksObservable {
  add: (observer: NotificationAlertObserver) => void;

  remove: (observer: NotificationAlertObserver) => void;

  notifySubscribers: () => void;

  setStockCount: (NewStockCount: number) => void;

  getStockCount: () => number;
}

class EmailAlertObserVable implements NotificationAlertObserver {
  public emailId: string;
  public observable: StocksObservable;

  public constructor(emailId: string, observable: StocksObservable) {
    this.emailId = emailId;
    this.observable = observable;
  }

  public update(): void {
    this.sendMail(this.emailId, "Product is in stock hurry up");
  }

  private sendMail(emailID: string, message: string) {
    console.log(`mail send to ${emailID}, message: ${message}`);
  }
}

class MobileAlertObserVable implements NotificationAlertObserver {
  public userName: string;
  public observable: StocksObservable;

  public constructor(userName: string, observable: StocksObservable) {
    this.userName = userName;
    this.observable = observable;
  }

  public update(): void {
    this.sendMail(this.userName, "Product is in stock hurry up");
  }

  private sendMail(userName: string, message: string) {
    console.log(`message send to ${userName}, message: ${message}`);
  }
}

class IphoneObservable implements StocksObservable {
  public observerList: NotificationAlertObserver[] = [];
  public stockCount = 0;

  add(observer: NotificationAlertObserver): void {
    this.observerList.push(observer);
  }

  remove(observer: NotificationAlertObserver): void {
    this.observerList = this.observerList.filter((value) => value !== observer);
  }

  notifySubscribers(): void {
    for (const observer of this.observerList) {
      observer.update();
    }
  }

  setStockCount(newStockCount: number): void {
    if (!this.stockCount) {
      this.notifySubscribers();
    }
    this.stockCount += newStockCount;
  }

  getStockCount(): number {
    return this.stockCount;
  }
}

// client code
export default class ObserverDesign {
  public static main() {
    const iphoneStockObservable = new IphoneObservable();

    const observer1 = new EmailAlertObserVable(
      "test@email.com",
      iphoneStockObservable
    );
    const observer2 = new EmailAlertObserVable(
      "test1@email.com",
      iphoneStockObservable
    );
    const observer3 = new MobileAlertObserVable(
      "test123",
      iphoneStockObservable
    );

    iphoneStockObservable.add(observer1);
    iphoneStockObservable.add(observer2);
    iphoneStockObservable.add(observer3);

    iphoneStockObservable.setStockCount(10);
  }
}
