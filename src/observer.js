export default class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);  
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(item => item !== fn)
  }

  notify(key, data) {
    this.observers.forEach(item => { 
      if (item.key == key) {
        item.observer(data)
      }            
    });
  }
}