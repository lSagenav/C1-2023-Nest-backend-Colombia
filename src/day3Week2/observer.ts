interface Observer {
  update(): void;
}

interface subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}

class Observable implements subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }
  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify(): void {
    this.observers.forEach((observer) => observer.update());
  }
}

class SomeObserve implements Observer {
  update(): void {
    console.log('Evento');
  }
}

const ob = new Observable();
const o = new SomeObserve();
const o2 = new SomeObserve();

ob.subscribe(o);
ob.subscribe(o2);
ob.notify();
ob.unsubscribe(o);
ob.notify();

// metodo terminado
