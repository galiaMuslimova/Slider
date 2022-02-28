class Observer {
  observers: { key: string, observer: (data: any) => void }[];

  constructor() {
    this.observers = [];
  }

  // use type any, cause any can subscribe

  subscribe(fn: { key: string, observer: (data: any) => void }) {
    this.observers.push(fn);
  }

  unsubscribe(fn: { key: string, observer: (data: any) => void }) {
    this.observers = this.observers.filter((item) => item !== fn);
  }

  notify(key: string, data: any) {
    this.observers.forEach((item) => {
      if (item.key === key) {
        item.observer(data);
      }
    });
  }
}

export default Observer;
