// complete the js code
class CustomPromise {
  // write your code here
	
  constructor() {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    this.onFinallyCallbacks = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback(this.value));
        this.onFinallyCallbacks.forEach(callback => callback());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback(this.reason));
        this.onFinallyCallbacks.forEach(callback => callback());
      }
    };

    this.resolve = resolve;
    this.reject = reject;
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    } else if (this.state === 'rejected') {
      onRejected(this.reason);
    } else {
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }
    return this;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    if (this.state !== 'pending') {
      onFinally();
    } else {
      this.onFinallyCallbacks.push(onFinally);
    }
    return this;
  }


window.CustomPromise = CustomPromise;
