import BaseService from './base'
import type { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { IParagraph, IParagraphImage, IPost, MongoObjectId } from 'shared-types'

export const RSS_URL = 'https://vtc.vn/rss/feed.rss'

const parser = new RssParser({})

export default class VtcNews extends BaseService {
  constructor() {
    super('vtc.vn')
  }
  async getLastedNews() {
    const feed = await parser.parseURL(RSS_URL)
    return feed.items.map((e) => {
      return e.link || ''
    })
  }
  getTitle($: CheerioAPI): string {
    throw new Error('Method not implemented.')
  }
  getDescription($: CheerioAPI): string {
    throw new Error('Method not implemented.')
  }
  getKeywords($: CheerioAPI): string[] {
    throw new Error('Method not implemented.')
  }
  getParagraphs($: CheerioAPI): IParagraph[] {
    throw new Error('Method not implemented.')
  }
  getCategories($: CheerioAPI): Promise<MongoObjectId[]> {
    throw new Error('Method not implemented.')
  }
  getOwner($: CheerioAPI): string {
    throw new Error('Method not implemented.')
  }
  getTimeString($: CheerioAPI): string {
    throw new Error('Method not implemented.')
  }

  // async getNewDetail(url: string) {
  //   const { data: $ } = await this.api.get<CheerioAPI>(url)
  //   const title = this.formatText($('.mb5 .font28 ').text())
  //   const description = this.formatText($('.content-wrapper .font16').text())
  //   const data = $('.edittor-content').children()
  //   const publishedTime = this.formatTime($('.time-update').text())

  //   const paragraphs: IParagraph[] = []
  //   for (const el of data) {
  //     if (el.tagName == 'p') {
  //       paragraphs.push({
  //         type: 'text',
  //         content: this.formatText($(el).text()),
  //       })
  //     }
  //     if (el.tagName == 'figure') {
  //       const elem = $(el)
  //       const imageUrl = elem.find('img').attr('data-src') || ''
  //       const imageDescription = elem.find('figcaption > p.expEdit').text()
  //       if (imageUrl)
  //         paragraphs.push({
  //           type: 'image',
  //           imageUrl: [imageUrl],
  //           description: this.formatText(imageDescription),
  //         })
  //     }
  //   }
  //   const thumbnailUrl =
  //     (<IParagraphImage>paragraphs.find((e) => e.type === 'image'))?.imageUrl?.[0] || ''
  //   const result: IPost = {
  //     title,
  //     slug: BaseService.stringToSlug(title),
  //     thumbnailUrl,
  //     categories: [],
  //     description,
  //     status: 'publish',
  //     source: 'vtc.vn',
  //     owner: this.formatText($('.author-make > .uppercase').text()),
  //     publishedAt: publishedTime,
  //     sourceURL: url,
  //     paragraphs,
  //   }
  //   const category = $('.ms-navigation').find('li > a.active')
  //   const categories = [...category].map((e) => this.formatText($(e).text()))
  //   const categoriesId = (await Promise.all(categories.map(this.getCategoryId))).filter((e) => !!e)
  //   result.categories = categoriesId
  //   return result
  // }
}
