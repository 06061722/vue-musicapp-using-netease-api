export const getData = (el, name, val) => {
  const prefix = 'data-'
  const finalName = prefix + name
  if (val) return el.setAttribute(finalName, val)
  else return el.getAttribute(finalName)
}
const elementStyle = document.createElement('div').style
const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) return key
  }
  return false
})()

export const prefixStyle = (style) => {
  if (vendor === false) return false
  if (vendor === 'standard') return style
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
