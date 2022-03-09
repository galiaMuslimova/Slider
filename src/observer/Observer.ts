class Observer {
  public observers: { key: string, observer: (data: any) => void }[];

  constructor() {
    this.observers = [];
  }

  // use type any, cause any can subscribe

  public subscribe(fn: { key: string, observer: (data: any) => void }) {
    this.observers.push(fn);
  }

  public unsubscribe(fn: { key: string, observer: (data: any) => void }) {
    this.observers = this.observers.filter((item) => item !== fn);
  }

  public notify(key: string, data: any) {
    this.observers.forEach((item) => {
      if (item.key === key) {
        item.observer(data);
      }
    });
  }
}

export default Observer;
