import { NewsDetail, ShortDetailNews } from '../types'
import axios, { AxiosInstance } from 'axios'
import cheerio from 'cheerio'
import { IPost } from '../@types/post'
import { PostModel } from '../models/post'

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
  abstract getNewDetail(url: string): Promise<IPost>
  async updateDatabase(post: IPost) {
    const postData = await PostModel.findOneAndUpdate(
      { slug: post.slug },
      {
        ...post,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    return postData
  }
}
