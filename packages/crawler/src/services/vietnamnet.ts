import BaseService from './base'
import type { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { IParagraph, IParagraphImage, IPost } from 'shared-types'

export const RSS_URL = 'https://vietnamnet.vn/rss/tin-moi-nhat.rss'

const parser = new RssParser({})

export default class VietNamNet extends BaseService {
  constructor() {
    super()
  }
  async getLastedNews() {
    const feed = await parser.parseURL(RSS_URL)
    return feed.items.map((e) => e.link || '')
  }
  async getNewDetail(url: string) {
    const { data: $ } = await this.api.get<CheerioAPI>(url)
    const title = $('.ArticleDetail > h1').text()
    const description = this.formatText($('#ArticleContent > .ArticleLead > p').text())
    const paragraphs: IParagraph[] = []
    const content = $('#ArticleContent').children()
    const publishedTime = this.formatTime($('.ArticleDate').text())
    for (const el of content) {
      if (el.tagName == 'p') {
        paragraphs.push({
          type: 'text',
          content: this.formatText($(el).text()),
        })
      }
      if (el.tagName == 'table') {
        const elem = $(el)
        const imageUrl = elem.find('img').attr('src')
        const imageDescription = elem.find('.image_desc').text() || ''
        if (imageUrl) {
          paragraphs.push({
            type: 'image',
            imageUrl: [imageUrl],
            description: this.formatText(imageDescription),
          })
        }
      }
    }
    const thumbnailUrl =
      (<IParagraphImage>paragraphs.find((e) => e.type === 'image'))?.imageUrl?.[0] || ''
    const result: IPost = {
      title: this.formatText(title),
      slug: BaseService.stringToSlug(title),
      thumbnailUrl,
      categories: [],
      description,
      status: 'publish',
      source: 'vietnamnet.vn',
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
    const category = $('.top-cate-head-title').find('a')
    const categories = [...category].map((e) => this.formatText($(e).text()))
    const categoriesId = (await Promise.all(categories.map(this.getCategoryId))).filter((e) => !!e)
    result.categories = categoriesId
    return result
  }
}
