import ky from 'ky'

const baseClient = ky.extend({
  prefixUrl: 'https://go-savee.herokuapp.com',
})

export interface ApiImage {
  id: number
  url: string
  autor: string
  alt: string
  size: {
    width: number
    height: number
  }
}

export class ApiClient {
  static getImages(total?: number) {
    return baseClient
      .get('images', {
        searchParams: {
          total,
        } as any,
      })
      .json<ApiImage[]>()
  }
}
