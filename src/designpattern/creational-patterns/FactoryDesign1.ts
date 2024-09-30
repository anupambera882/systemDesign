// Subject interface
interface Channel {
  subscribe: (subscriber: Subscriber) => void;
  unsubscribe: (subscriber: Subscriber) => void;
  notifySubscribers: () => void;
  getChannelName: () => String;
}

// ConcreteSubject class
class YouTubeChannel implements Channel {
  private channelName: String;
  private subscribers: Subscriber[] = [];

  public constructor(channelName: String) {
    this.channelName = channelName;
  }

  public subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);

    console.log(subscriber.getName() + " subscribed to " + this.channelName);
  }

  public unsubscribe(subscriber: Subscriber): void {
    this.subscribers = this.subscribers.filter((item) => item !== subscriber);
    console.log(
      subscriber.getName() + " unsubscribed from " + this.channelName
    );
  }

  public notifySubscribers(): void {
    console.log("Notifying subscribers of new video on " + this.channelName);

    for (const subscriber of this.subscribers) {
      subscriber.update(this.channelName);
    }
  }

  public getChannelName(): String {
    return this.channelName;
  }

  // Simulate uploading a new video
  public uploadVideo(): void {
    this.notifySubscribers();
  }
}

// Observer interface
interface Subscriber {
  getName: () => String;
  update: (channelName: String) => void;
}

// ConcreteObserver class
class YouTubeSubscriber implements Subscriber {
  private name: String;

  public constructor(name: String) {
    this.name = name;
  }

  public getName(): String {
    return this.name;
  }

  public update(channelName: String): void {
    console.log(this.name + ": New video uploaded on " + channelName);
  }
}

export default class FactoryDesign1 {
  public static main(): void {
    const channel = new YouTubeChannel("Programming Tutorials");

    const subscriber1 = new YouTubeSubscriber("Alice");
    const subscriber2 = new YouTubeSubscriber("Bob");

    channel.subscribe(subscriber1);
    channel.subscribe(subscriber2);

    channel.uploadVideo();

    channel.unsubscribe(subscriber1);

    channel.uploadVideo();
  }
}
