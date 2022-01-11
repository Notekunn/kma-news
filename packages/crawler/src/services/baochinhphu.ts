import BaseService from './base'
import type { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { IParagraph, MongoObjectId } from 'shared-types'
export const RSS_URL = 'https://baochinhphu.vn/Rss/Feed.aspx?EventID=115'

const parser = new RssParser({})

export default class BaoChinhPhu extends BaseService {
  constructor() {
    super('baochinhphu.vn', 'hh:mm DD/MM/YYYY')
  }
  async getLastedNews() {
    const feed = await parser.parseURL(RSS_URL)
    return feed.items.map((e) => e.link || '')
  }
  getTitle($: CheerioAPI): string {
    return this.formatText($('.article-header > h1').text())
  }
  getDescription($: CheerioAPI): string {
    return this.formatText($('.summary').text())
  }
  getKeywords($: CheerioAPI): string[] {
    const keywordsRaw = $('.keywords .word').find('a')
    const keywords = [...keywordsRaw].map((e) => this.formatText($(e).text())).filter((e) => !!e)
    return keywords
  }
  getParagraphs($: CheerioAPI): IParagraph[] {
    const content = [...$('.article-body').children()]
    const paragraphs: IParagraph[] = []
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
      if (el.tagName == 'table') {
        const srcImage = elem.find('img').attr('src')
        if (!srcImage) return
        const imageDescription = elem.find('.caption > p').text() || ''
        paragraphs.push({
          type: 'image',
          imageUrl: [`https://baochinhphu.vn/${srcImage}`],
          description: this.formatText(imageDescription),
        })
        return
      }
      return
    })
    if (paragraphs.length <= 1) return []
    const last = paragraphs.splice(-1)[0]
    if (last.type == 'text') return paragraphs
    return [...paragraphs, last]
  }
  async getCategories($: CheerioAPI): Promise<MongoObjectId[]> {
    const breadcrumbs = $('.breadcrums').find('a')
    if (breadcrumbs.length <= 1) return [] as MongoObjectId[]
    const [_, ...categoriesName] = [...breadcrumbs].map((e) => this.formatText($(e).text()))

    const categories = await Promise.all(categoriesName.map(this.getCategoryId))
    return categories
  }
  getOwner($: CheerioAPI): string {
    return this.formatText($('.article-body .strong')?.text())
  }
  getTimeString($: CheerioAPI): string {
    return this.formatText($('.article-header .meta').text())
  }
}
