import moment from 'moment'
import axios, { AxiosInstance } from 'axios'
import cheerio, { CheerioAPI } from 'cheerio'
import { IPost, ObjectId, MongoObjectId, IParagraph, IParagraphImage } from 'shared-types'
import { PostModel } from '../models/post'
import { PublisherModel } from '../models/publisher'
import { CategoryModel } from '../models/category'
import Client from '../client'
import { UserModel } from '../models/user'
import fs from 'fs'
import path from 'path'
const client = Client.getInstance().client
const tempDir = path.join(__dirname, '../../temp')
export default abstract class BaseService {
  api: AxiosInstance
  publisherId: string = ''
  adminId: string = '61bd9533706e03a795f2a64a'
  timeFormat: string
  hostname: string

  constructor(hostname: string, timeFormat: string = 'DD/MM/YYYY, HH:mm (Z)') {
    this.api = axios.create({
      transformResponse: function (data, header) {
        fs.writeFileSync(path.resolve(tempDir, './' + hostname + '.html'), data)
        const result = cheerio.load(data)
        return result
      },
      responseType: 'text',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
      },
    })
    this.timeFormat = timeFormat
    this.hostname = hostname
  }
  async initPublisher(hostname: string) {
    const publisher = await PublisherModel.findOneAndUpdate(
      { hostname },
      { name: hostname, logo: '', home: '' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    if (publisher) {
      this.publisherId = publisher._id
    }
  }
  async initAdmin() {
    const admin = await UserModel.findOne({
      role: 'admin',
    })
    if (admin) {
      this.adminId = admin._id
    } else {
      this.adminId = '61bd9533706e03a795f2a64a'
      const user = new UserModel({
        _id: this.adminId,
        email: 'admin@gmail.com',
        password: 'password',
        role: 'admin',
      })
      await user.save()
    }
  }
  setUp() {
    return Promise.all([this.initAdmin(), this.initPublisher(this.hostname)])
  }
  abstract getLastedNews(): Promise<string[]>

  abstract getTitle($: CheerioAPI): string
  abstract getDescription($: CheerioAPI): string
  abstract getKeywords($: CheerioAPI): Array<string>
  abstract getParagraphs($: CheerioAPI): Array<IParagraph>
  abstract getCategories($: CheerioAPI): Promise<MongoObjectId[]>
  abstract getOwner($: CheerioAPI): string
  abstract getTimeString($: CheerioAPI): string

  async getNewDetail(url: string): Promise<Omit<IPost, 'slug'>> {
    const { data } = await this.api.get(url)
    const $ = data as CheerioAPI
    const title = this.getTitle($)
    const description = this.getDescription($)
    const categories = await this.getCategories($)
    const keywords = this.getKeywords($)
    const owner = this.getOwner($)
    const timeString = this.getTimeString($)
    const paragraphs = this.getParagraphs($)
    const lastImageParagraph = paragraphs.find((e) => e.type === 'image') as
      | IParagraphImage
      | undefined
    const thumbnailUrl = lastImageParagraph?.imageUrl[0] || ''
    const post: Omit<IPost, 'slug'> = {
      title,
      categories,
      description,
      keywords,
      paragraphs,
      publisher: new ObjectId(this.publisherId),
      status: 'publish',
      sourceURL: url,
      thumbnailUrl,
      viewCount: 0,
      writter: new ObjectId(this.adminId),
      owner,
      publishedAt: this.formatTime(timeString),
    }
    return post
  }
  async updateDatabase(post: Omit<IPost, 'slug'>) {
    const postM = new PostModel(post)
    if (!postM.title || postM.paragraphs.length === 0) return
    const postData = await PostModel.findOneAndUpdate(
      { sourceURL: post.sourceURL },
      {
        ...post,
        slug: postM.generateSlug(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    return postData
  }
  formatText(text: string) {
    return text.replace(/\n/g, '').replace(/\s+/g, ' ').trim()
  }
  formatTime(time = 'Thứ ba, 21/12/2021, 08:32 (GMT+7)') {
    const date = moment(time, this.timeFormat)
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
    const newName = categoryName
      .split(' ')
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())
      .join(' ')
    const category = await CategoryModel.findOneAndUpdate(
      {
        title: {
          $regex: new RegExp(newName, 'i'),
        },
      },
      {
        slug: BaseService.stringToSlug(newName),
        title: newName,
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
