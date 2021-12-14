import { NewsDetail, ShortDetailNews } from '../types'
import axios, { AxiosInstance } from 'axios'
import cheerio from 'cheerio'

export default abstract class BaseService {
  api: AxiosInstance
  constructor() {
    this.api = axios.create({
      transformResponse: function (data, header) {
        const result = cheerio.load(data)
        return result
      },
    })
  }
  abstract getLastedNews(): Promise<ShortDetailNews[]>
  abstract getNewDetail(url: string): Promise<NewsDetail>
}
