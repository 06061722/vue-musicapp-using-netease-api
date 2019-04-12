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

export const formatTimeOne = (raw) => {
  function pad (num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  }
  raw = raw | 0
  const minute = raw / 60 | 0
  const second = pad(raw % 60)
  return `${minute}:${second}`
}
export const formatTimeTwo = (raw) => {
  raw = raw / 1000
  raw = formatTimeOne(raw)
  return raw
}

export const shuffle = (arr) => {
  arr = JSON.parse(JSON.stringify(arr))
  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  console.log('shuffle')
  return arr
}
