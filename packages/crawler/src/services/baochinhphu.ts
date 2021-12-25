import BaseService from './base'
import type { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { IParagraph, IParagraphImage, IPost } from 'shared-types'
import { text } from 'cheerio/lib/api/manipulation'

export const RSS_URL = 'http://baochinhphu.vn/Rss/Feed.aspx?EventID=115'

const parser = new RssParser({})

export default class BaoChinhPhu extends BaseService {
  constructor() {
    super()
  }
  async getLastedNews() {
    const feed = await parser.parseURL(RSS_URL)
    return feed.items.map((e) => e.link || '')
  }
  async getNewDetail(url: string) {
    const { data: $ } = await this.api.get<CheerioAPI>(url)
    const title = this.formatText($('.article-header > h1').text())
    const description = $('.summary > p').text()
    const paragraphs: IParagraph[] = []
    const content = $('.article-body').children()
    const publishedTime = this.formatTime($('.article-header .meta').text())
    for (const el of content) {
      if (el.tagName == 'p') {
        paragraphs.push({
          type: 'text',
          content: this.formatText($(el).text()),
        })
      }
      if (el.tagName == 'table') {
        const elem = $(el)
        const srcImg = elem.find('img').attr('src')
        const imageDescription = elem.find('.desc').text() || ''
        if (srcImg) {
          const imageUrl = `https://baochinhphu.vn/${srcImg}`
          paragraphs.push({
            type: 'image',
            imageUrl: [imageUrl],
            description: imageDescription,
          })
        }
      }
    }
    paragraphs.shift()
    const thumbnailUrl =
      (<IParagraphImage>paragraphs.find((e) => e.type === 'image'))?.imageUrl?.[0] || ''
    const result: IPost = {
      title: this.formatText(title),
      slug: BaseService.stringToSlug(title),
      thumbnailUrl,
      categories: [],
      description,
      status: 'publish',
      source: 'baochinhphu.vn',
      owner: 'Lam Sơn',
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
    const category = $('.breadcrums').find('a')
    const categories = [...category].map((e) => this.formatText($(e).text()))
    const categoriesId = (await Promise.all(categories.map(this.getCategoryId))).filter((e) => !!e)
    result.categories = categoriesId
    return result
  }
}
