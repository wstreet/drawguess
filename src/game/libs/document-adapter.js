

const oldCreateElement = document.createElement

window.copyDocument = {...document}
Object.assign(copyDocument, {
  createElement(tag) {
    if (tag == 'textarea' || tag == 'input') {
      const input = new window.Element()
      
      input.value = ''
      input.getBoundingClientRect = function() {
        return {}
      }
      return input
    }
    return oldCreateElement(tag)
  }
})

canvas.getBoundingClientRect = function() {
  return {}
}