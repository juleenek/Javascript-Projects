'use strict';

class Subject {
  constructor() {
    this.observers = [];
    this.timer = 1;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const removeIndex = this.observers.findIndex(obs => {
      return observer === obs;
    });

    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  notify() {
    if (this.observers.length > 0) {
      this.observers.forEach(observer => observer.update(this.timer));
    }
  }

  interval() {
    setInterval(() => {
      this.timer++;
      this.notify();
    }, 2000);
  }
}

class Logger {
  static log(data) {
    console.log(data);
  }
}

const subject = new Subject();
subject.interval();
subject.addObserver(saveCToSessionStorage);
subject.addObserver(discoverPowerBallNumber);


function saveCToSessionStorage(data) {
  console.log('[reader C]', data);
  const storageData = { data };
  sessionStorage.setItem('C', JSON.stringify(storageData));
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
  Logger.log(data);
}

function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100);
  console.log('[powerball number]', data);
}
