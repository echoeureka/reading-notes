const delay =
  (f, time = 0) =>
  value =>
    setTimeout(() => {
      f(value)
    }, time)
const isFunction = obj => typeof obj === 'function'
const toString = Object.prototype.toString
const isObject = obj => toString.call(obj) === '[object Object]'
const isThenable = obj => (isObject(obj) || isFunction(obj)) && 'then' in obj
const isPromise = promise => promise instanceof Promise

const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

const notify = (handler, state, result) => {
  const { onFulfilled, onRejected, resolve, reject } = handler
  try {
    if (state === FULFILLED)
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    else if (state === REJECTED)
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
  } catch (error) {
    reject(error)
  }
}

const notifyAll = delay(promise => {
  const { handlers, state, result } = promise
  while (handlers.length) notify(handlers.shift(), state, result)
})

const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return
  promise.state = state
  promise.result = result
  notifyAll(promise)
}

const checkValue = (promise, value, onFulfilled, onRejected) => {
  if (value === promise)
    return onRejected(new TypeError('Can not fulfill promise with itself'))
  if (isPromise(value)) return value.then(onFulfilled, onRejected)
  if (isThenable(value)) {
    try {
      const then = value.then
      if (isFunction(then))
        return new Promise(then.bind(value)).then(onFulfilled, onRejected)
    } catch (error) {
      return onRejected(error)
    }
  }
  onFulfilled(value)
}

const Promise = function (f) {
  this.state = PENDING
  this.handlers = []

  const onFulfilled = value => transition(this, FULFILLED, value)
  const onRejected = reason => transition(this, REJECTED, reason)
  let ignore = false
  const resolve = value => {
    if (ignore) return
    ignore = true
    checkValue(this, value, onFulfilled, onRejected)
  }
  const reject = reason => {
    if (ignore) return
    ignore = true
    onRejected(reason)
  }
  try {
    f(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    this.handlers.push({ onFulfilled, onRejected, resolve, reject })
    this.state !== PENDING && notifyAll(this)
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.resolve = value => new Promise(resolve => resolve(value))
Promise.reject = reason => new Promise((_, reject) => reject(reason))

module.exports = Promise
