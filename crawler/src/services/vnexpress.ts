import { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { NewsParagraph } from '../types'
import BaseService from './base'

export const RSS_URL = 'https://vnexpress.net/rss/tin-moi-nhat.rss'

const parser = new RssParser({})

export default class VNExpress extends BaseService {
  constructor() {
    super()
  }
  async getLastedNews() {
    const feed = await parser.parseURL(RSS_URL)
    return feed.items.map((e) => {
      return {
        title: e.title || '',
        link: e.link || '',
        contentSnippet: e.contentSnippet || '',
        pubDate: e.isoDate || e.pubDate || '',
      }
    })
  }
  async getNewDetail(url: string) {
    const { data: $ } = await this.api.get<CheerioAPI>(url)
    const title = $('.title-detail').text()
    const description = $('.description').text()
    const data = $('.fck_detail').children()
    const paragraphs: NewsParagraph[] = []
    for (const el of data) {
      if (el.tagName == 'p') {
        paragraphs.push({
          type: 'text',
          content: $(el).text(),
        })
      }
      if (el.tagName == 'figure') {
        const elem = $(el)
        const imageUrl = elem.find('meta[itemprop="url"]').attr('content') || ''
        const imageDescription = elem.find('figcaption[itemprop="description"] p').text()
        if (imageUrl)
          paragraphs.push({
            type: 'image',
            imageUrl,
            description: imageDescription,
          })
      }
    }
    // console.log(data)

    return {
      title,
      description,
      paragraphs,
    }
  }
}
