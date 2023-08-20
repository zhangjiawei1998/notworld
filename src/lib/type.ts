
export interface ImageType {
    id: string
    origin_width: number
    origin_height: number
    origin_url: string
    rw300_width: number
    rw300_height: number
    rw300_url: string
}
export interface AlbumType {
    key: number
    title: number
    date: number
    desc: string
    imageList: Array<ImageType>
    videoList: Array<ImageType>
}


export type AlbumListType = Array<AlbumType>
