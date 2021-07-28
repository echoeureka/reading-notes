const Singleton = function (name: string) {
  this.name = name
}

Singleton.instance = null

Singleton.prototype.getName = function () {
  return this.name
}

Singleton.getInstance = function (name: string) {
  if (Singleton.instance) {
    return Singleton.instance
  }
  Singleton.instance = new Singleton(name)
  return Singleton.instance
}

// const sg1 = Singleton.getInstance('Ryan Moyo 1')
// const sg2 = Singleton.getInstance('Ryan Moyo 2')

Singleton.getInstance = (function () {
  let instance = null
  return (name: string) => {
    if (instance) {
      return instance
    }
    instance = new Singleton(name)
    return instance
  }
})()

const sg1 = Singleton.getInstance('Ryan Moyo 1')
const sg2 = Singleton.getInstance('Ryan Moyo 2')

console.log(sg1 === sg2) // true
