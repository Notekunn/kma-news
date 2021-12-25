import { NewsDetail, ShortDetailNews } from '../types'
import axios, { AxiosInstance } from 'axios'
import cheerio from 'cheerio'
import { IPost } from 'shared-types'
import { PostModel } from '../models/post'
import moment from 'moment'
import { CategoryModel } from '../models/category'

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
  abstract getLastedNews(): Promise<string[]>
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
  formatText(text: string) {
    return text.replace(/\n/g, '').replace(/\s+/g, ' ').trim()
  }
  formatTime(time = 'Thứ ba, 21/12/2021, 08:32 (GMT+7)') {
    const date = moment(time, 'DD/MM/YYYY, HH:mm (Z)')
    return date.toDate()
  }
  static stringToSlug(str: string) {
    //Đổi chữ hoa thành chữ thường
    let slug = str.toLowerCase()

    //Đổi ký tự có dấu thành không dấu
    slug = slug
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
    //Xóa các ký tự đặc biệt
    slug = slug.replace(/\s/g, '-').replace(/[^\w-]+/g, '')
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/(\-)+/gi, '-')
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = slug.replace(/^\-|\-$/gi, '')
    return slug
  }
  async getCategoryId(categoryName: string) {
    const category = await CategoryModel.findOneAndUpdate(
      { title: categoryName },
      {
        slug: BaseService.stringToSlug(categoryName),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    return category?._id
  }
}
