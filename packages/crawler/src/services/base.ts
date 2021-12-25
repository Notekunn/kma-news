import { createClient } from 'redis'
import axios, { AxiosInstance } from 'axios'
import cheerio from 'cheerio'
import { IPost } from 'shared-types'
import { PostModel } from '../models/post'
import moment from 'moment'
import { CategoryModel } from '../models/category'
import Client from '../client'
const client = Client.getInstance().client

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
  /**
   * Hàm kiểm tra xem trang web đã được crawl chưa
   * @param link Link trang web crawl
   * @returns Xem da crawl hay chua
   */
  static async checkDupicate(link: string): Promise<boolean> {
    // https://stackoverflow.com/questions/9312838/checking-if-a-value-exists-in-a-list-already-redis
    const data = await client.sIsMember('crawled_link', link)
    if (data) {
      return true
    }
    await client.sAdd('crawled_link', link)
    return false
  }

  static async addCache(link: string) {
    await client.sAdd('crawled_link', link)
  }
  // Xóa nếu k thành công
  static async removeCache(link: string) {
    await client.sRem('crawled_link', link)
  }

  async lastedLinkFilter(links: string[]) {
    // Cách 1: Lấy tất cả link đã crawl rồi so sánh
    // Không phù hợp lắm vì phải check cả mảng với mỗi phần tử
    // const data = await client.sMembers('crawled_link')
    // return links.filter((link) => {
    //   return !data.includes(link)
    // })

    // Cách 2: Duyệt qua từng link đến lúc trùng thì dừng lại
    // vì mấy bài sau đều cũ hơn và chắc đã crawl rồi
    // cách này phù hợp hơn
    const result: string[] = []
    for (const link of links) {
      const isDupicate = await BaseService.checkDupicate(link)
      // Nếu link đã crawl thì chắc chắn mấy link sau cũng vậy
      if (isDupicate) return result
      result.push(link)
    }
    return result
  }
}
