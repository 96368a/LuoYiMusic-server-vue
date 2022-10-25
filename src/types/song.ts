export interface SongInfo {
  id: number
  name: string
  album: Album
  alias: null
  artists: Artist[]
  Hash: string
}

export interface Album {
  artistId: number
  description: string
  id: number
  name: string
  picId: number
  picUrl: string
}

export interface Artist {
  alias: null
  description: string
  id: number
  name: string
  picId: number
  picUrl: string
}
