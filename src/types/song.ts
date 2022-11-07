export interface SongInfo {
  id: number
  name: string
  album: AlbumInfo
  alias: null
  artists: ArtistInfo[]
  Hash: string
}

export interface AlbumInfo {
  artistId: number
  description: string
  id: number
  name: string
  picId: number
  picUrl: string
}

export interface ArtistInfo {
  alias: null
  description: string
  id: number
  name: string
  picId: number
  picUrl: string
}

export interface SongListInfo {
  commentCount: number
  coverImgId: number
  coverImgUrl: string
  createTime: number
  description: string
  id: number
  name: string
  playCount: number
  status: number
  subscribedCount: number
  tags: string[]
  updateTime: number
  userId: number
}
