export class Singer {
  constructor (id, name, picUrl) {
    this.id = id
    this.name = name
    this.picUrl = picUrl
  }
}

export const getData = (el, name, val) => {
  const prefix = 'data-'
  const finalName = prefix + name
  if (val) return el.setAttribute(finalName, val)
  else return el.getAttribute(finalName)
}
