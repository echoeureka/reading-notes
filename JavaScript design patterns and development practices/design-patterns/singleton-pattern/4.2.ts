import { document } from '../../../utils/window'

const Div = (() => {
  let instance = null

  const Div = function (html: HTMLElement) {
    if (instance === null) {
      this.html = html
      this.init()
      instance = this
    } else {
      this.html = instance.html
      this.init()
    }
  }

  Div.prototype.init = function () {
    const div = document.createElement('div')
    div.innerHTML = this.html
  }

  return Div
})()

const div = new Div(document.createElement('div'))
const span = new Div(document.createElement('span'))

console.log(div, span)

console.log(div === span)
