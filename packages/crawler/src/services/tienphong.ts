import BaseService from './base'
import type { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { IParagraph, IParagraphImage, IPost, MongoObjectId } from 'shared-types'

export const RSS_URL = 'https://tienphong.vn/rss/home.rss'

const parser = new RssParser({})

export default class TienPhong extends BaseService {
  constructor() {
    super('tienphong.vn', 'DD/MM/YYYY | hh:mm')
  }
  async getLastedNews() {
    const feed = await parser.parseURL(RSS_URL)
    return feed.items.map((e) => e.link || '')
  }
  getTitle($: CheerioAPI): string {
    return this.formatText($('.cms-title').text())
  }
  getDescription($: CheerioAPI): string {
    return this.formatText($('.cms-desc').text())
  }
  getKeywords($: CheerioAPI): string[] {
    const keywords = [...$('.article__tag .box-content a')].map((e) => this.formatText($(e).text()))
    return keywords
  }
  getParagraphs($: CheerioAPI): IParagraph[] {
    return [] as IParagraph[]
  }
  async getCategories($: CheerioAPI): Promise<MongoObjectId[]> {
    const breadcrumbs = $('.main-cate').find('a')
    if (breadcrumbs.length <= 1) return [] as MongoObjectId[]
    const [_, ...categoriesName] = [...breadcrumbs].map((e) => this.formatText($(e).text()))

    const categories = await Promise.all(categoriesName.map(this.getCategoryId))
    return categories
  }
  getOwner($: CheerioAPI): string {
    return this.formatText($('.cms-author').text())
  }
  getTimeString($: CheerioAPI): string {
    return this.formatText($('.article__meta time').text())
  }
  // async getNewDetail(url: string) {
  //   const { data: $ } = await this.api.get<CheerioAPI>(url)
  //   const title = $('.cms-title').text()
  //   const description = this.formatText($('.cms-desc').text())
  //   const paragraphs: IParagraph[] = []
  //   const content = $('.cms-body').children()
  //   const publishedTime = this.formatTime($('.time').text())
  //   for (const el of content) {
  //     if (el.tagName == 'p') {
  //       if ($(el).attr('class')) {
  //       } else {
  //         paragraphs.push({
  //           type: 'text',
  //           content: this.formatText($(el).text()),
  //         })
  //       }
  //     }
  //     if (el.tagName == 'table') {
  //       const elem = $(el)
  //       const imageUrl = elem.find('tr td img').attr('data-src')
  //       const imageDescription = elem.find('.caption > p').text() || ''
  //       if (imageUrl) {
  //         paragraphs.push({
  //           type: 'image',
  //           imageUrl: [imageUrl],
  //           description: this.formatText(imageDescription),
  //         })
  //       }
  //     }
  //   }
  //   const thumbnailUrl =
  //     (<IParagraphImage>paragraphs.find((e) => e.type === 'image'))?.imageUrl?.[0] || ''
  //   const result: IPost = {
  //     title: this.formatText(title),
  //     slug: BaseService.stringToSlug(title),
  //     thumbnailUrl,
  //     categories: [],
  //     description,
  //     status: 'publish',
  //     source: 'tienphong.vn',
  //     owner: this.formatText($('.article__author span').text()),
  //     publishedAt: publishedTime,
  //     sourceURL: url,
  //     paragraphs,
  //   }
  //   const category = $('.main-cate ').find('a')
  //   const categories = [...category].map((e) => this.formatText($(e).text()))
  //   const categoriesId = (await Promise.all(categories.map(this.getCategoryId))).filter((e) => !!e)
  //   result.categories = categoriesId
  //   return result
  // }
}
