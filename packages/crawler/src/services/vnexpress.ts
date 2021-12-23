import BaseService from './base'
import type { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { IParagraph, IParagraphImage, IPost } from 'shared-types'

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
    const publishedTime = this.formatTime($('span.date').text())

    const paragraphs: IParagraph[] = []
    for (const el of data) {
      if (el.tagName == 'p') {
        paragraphs.push({
          type: 'text',
          content: this.formatText($(el).text()),
        })
      }
      if (el.tagName == 'figure') {
        const elem = $(el)
        const imageUrl = elem.find('meta[itemprop="url"]').attr('content') || ''
        const imageDescription = elem.find('figcaption[itemprop="description"] p').text()
        if (imageUrl)
          paragraphs.push({
            type: 'image',
            imageUrl: [imageUrl],
            description: imageDescription,
          })
      }
    }
    const thumbnailUrl =
      (<IParagraphImage>paragraphs.find((e) => e.type === 'image'))?.imageUrl?.[0] || ''
    const result: IPost = {
      title,
      slug: BaseService.stringToSlug(title),
      thumbnailUrl,
      categories: [],
      description,
      status: 'publish',
      source: 'vnexpress.net',
      owner: 'Đức Cường',
      publishedAt: publishedTime,
      paragraphs,
    }
    const last = paragraphs.splice(-1)
    if (last.length != 1) return result
    if (last[0].type === 'text') {
      result.owner = last[0].content
      result.paragraphs = paragraphs
    } else {
      result.paragraphs = [...paragraphs, ...last]
    }
    const category = $('ul.breadcrumb').find('li')
    const categories = [...category].map((e) => this.formatText($(e).text()))
    const categoriesId = (await Promise.all(categories.map(this.getCategoryId))).filter((e) => !!e)
    result.categories = categoriesId
    return result
  }
}
