import BaseService from './base'
import type { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { IParagraph, IParagraphImage, IPost, MongoObjectId } from 'shared-types'
import logger from '../logger'

export const RSS_URL = 'https://vnexpress.net/rss/tin-moi-nhat.rss'

const parser = new RssParser({})

export default class VNExpress extends BaseService {
  constructor() {
    super('vnexpress.net')
  }
  async getLastedNews() {
    const feed = await parser.parseURL(RSS_URL)
    return feed.items.map((e) => {
      return e.link || ''
    })
  }
  getTitle($: CheerioAPI): string {
    return this.formatText($('.title-detail').text())
  }
  getDescription($: CheerioAPI): string {
    return this.formatText($('.description').text())
  }
  getKeywords($: CheerioAPI): string[] {
    const keywordsRaw = $('.tags .item-tag')
    const keywords = [...keywordsRaw].map((e) => this.formatText($(e).text()))
    return keywords
  }
  getParagraphs($: CheerioAPI): IParagraph[] {
    const paragraphs: IParagraph[] = []
    const content = [...$('.fck_detail').children()]
    content.forEach((el) => {
      const elem = $(el)
      // && elem.attr('class') == 'Normal'
      if (el.tagName == 'p' && !elem.attr('style')) {
        const content = this.formatText(elem.text())
        if (!content) return
        paragraphs.push({
          type: 'text',
          content,
        })
      }
      if (el.tagName == 'figure') {
        let imageUrl = elem.find('meta[itemprop="url"]').attr('src')
        const imageDescription = elem.find('figcaption[itemprop="description"] p').text()
        if (!imageUrl) {
          const srcSet = elem.find('source').attr('data-srcset')?.split(',') || []
          if (srcSet.length == 0) return
          imageUrl = srcSet[srcSet.length - 1].trim().split(' ')[0]
        }
        if (!imageUrl) {
          imageUrl = elem.find('img').attr('data-src') || elem.find('img').attr('src') || ''
        }
        if (!imageUrl) return
        paragraphs.push({
          type: 'image',
          imageUrl: [imageUrl],
          description: this.formatText(imageDescription),
        })
      }
    })
    return paragraphs
  }

  async getCategories($: CheerioAPI): Promise<MongoObjectId[]> {
    const categoriesName = [...$('ul.breadcrumb').find('li')].map((e) =>
      this.formatText($(e).text())
    )
    const categories = await Promise.all(categoriesName.map(this.getCategoryId))
    return categories
  }

  getOwner($: CheerioAPI): string {
    const owner = $('p.author_mail').text() || $('p.Normal[style="text-align:right;"]').text()
    return this.formatText(owner)
  }

  getTimeString($: CheerioAPI): string {
    return this.formatText($('span.date').text())
  }
}
