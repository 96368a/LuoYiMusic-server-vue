import axios from '.'
import type { AlbumInfo, ArtistInfo, SongInfo, SongListInfo } from '~/types/song'

export const getSongs = async (name: string, page: number, pageSize: number) => {
  return axios.get('/song/search', { params: { name, page, pageSize } })
}
export const delSong = async (song: SongInfo) => {
  return axios.post('/api/song/del', { id: song.id })
}

export const getAlbums = async (name: string, page: number, pageSize: number) => {
  return axios.get('/album/search', { params: { name, page, pageSize } })
}

export const delAlbum = async (album: AlbumInfo) => {
  return axios.post('/api/album/del', { id: album.id })
}

export const getArtists = async (name: string, page: number, pageSize: number) => {
  return axios.get('/artist/search', { params: { name, page, pageSize } })
}

export const delArtist = async (artist: ArtistInfo) => {
  return axios.post('/api/artist/del', { id: artist.id })
}

export const getSongLists = async (name: string, page: number, pageSize: number) => {
  return axios.get('/api/playlist/search', { params: { name, page, pageSize } })
}

export const delSongList = async (playlist: SongListInfo) => {
  return axios.post('/api/playlist/del', { id: playlist.id })
}
