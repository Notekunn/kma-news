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
    return this.formatText($('.nd-detail .mb5 .font28').text())
  }
  getDescription($: CheerioAPI): string {
    return this.formatText($('.inline-nb').text())
  }
  getKeywords($: CheerioAPI): string[] {
    const keywords = [...$('.keylink li a')].map((e) => this.formatText($(e).text()))
    return keywords
  }
  getParagraphs($: CheerioAPI): IParagraph[] {
    const paragraphs: IParagraph[] = []
    const content = [...$('[itemprop="articleBody"]').children()]
    content.forEach((el) => {
      const elem = $(el)
      if (el.tagName == 'p') {
        const content = this.formatText(elem.text())
        if (!content) return
        paragraphs.push({
          type: 'text',
          content,
        })
      }
      if (el.tagName == 'figure') {
        const imageUrl = elem.find('img').attr('data-src')
        const imageDescription = elem.find('figcaption p').text()
        if (!imageUrl) return
        paragraphs.push({
          type: 'image',
          imageUrl: [imageUrl],
          description: this.formatText(imageDescription),
        })
      }
    })
    if (paragraphs.length < 1) return paragraphs
    const last = paragraphs.splice(-1)[0]
    if (last.type === 'text') return paragraphs
    return [...paragraphs, last]
  }
  async getCategories($: CheerioAPI): Promise<MongoObjectId[]> {
    const categoriesName = [...$('.nd-detail').find('.mt-category')].map((e) =>
      this.formatText($(e).text())
    )
    const categories = await Promise.all(categoriesName.map(this.getCategoryId))
    return categories
  }
  getOwner($: CheerioAPI): string {
    return this.formatText($('.author-make a').last().text())
  }
  getTimeString($: CheerioAPI): string {
    return this.formatText($('.time-update').text())
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
