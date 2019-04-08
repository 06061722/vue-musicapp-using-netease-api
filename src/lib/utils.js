export class Singer {
  constructor (id, name, picUrl) {
    this.id = id
    this.name = name
    this.picUrl = picUrl
  }
}

export class Song {
  constructor ({ id, name, time, singer, picUrl }) {
    this.id = id
    this.name = name
    this.time = time
    this.singer = singer
    this.picUrl = picUrl
  }
}

export const createSongArr = (hotSongs) => {
  let songArr = []
  let id
  let name
  let time
  let singer
  let picUrl
  hotSongs.forEach(item => {
    singer = ''
    item.ar.forEach(item => {
      singer += item.name + '/'
    })
    singer = singer.slice(0, -1)
    picUrl = item.al.picUrl
    time = item.dt
    name = item.name
    id = item.id
    const song = new Song({ id, name, time, singer, picUrl })
    songArr.push(song)
  })
  return songArr
}

export const getData = (el, name, val) => {
  const prefix = 'data-'
  const finalName = prefix + name
  if (val) return el.setAttribute(finalName, val)
  else return el.getAttribute(finalName)
}
