import BaseService from './base'
import type { CheerioAPI } from 'cheerio'
import RssParser from 'rss-parser'
import { IParagraph, IParagraphImage, IPost, MongoObjectId } from 'shared-types'

export const RSS_URL = 'https://vietnamnet.vn/rss/tin-moi-nhat.rss'

const parser = new RssParser({})

export default class VietNamNet extends BaseService {
  constructor() {
    super('vietnamnet.vn', 'DD/MM/YYYY hh:mm')
  }
  async getLastedNews() {
    const feed = await parser.parseURL(RSS_URL)
    console.log(feed)
    return feed.items.map((e) => e.link || '')
  }
  // async getNewDetail(url: string) {
  //   const { data: $ } = await this.api.get<CheerioAPI>(url)
  //   const title = $('.ArticleDetail > h1').text()
  //   const description = this.formatText($('#ArticleContent > .ArticleLead > p').text())
  //   const paragraphs: IParagraph[] = []
  //   const content = $('#ArticleContent').children()
  //   const publishedTime = this.formatTime($('.ArticleDate').text())
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
  //       const imageUrl = elem.find('img').attr('src')
  //       const imageDescription = elem.find('.image_desc').text() || ''
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
  //     source: 'vietnamnet.vn',
  //     owner: 'Lam Sơn',
  //     publishedAt: publishedTime,
  //     sourceURL: url,
  //     paragraphs,
  //   }
  //   const last = paragraphs.splice(-1)
  //   if (last.length != 1) return result
  //   if (last[0].type === 'text') {
  //     result.owner = last[0].content
  //     result.paragraphs = paragraphs
  //   } else {
  //     result.paragraphs = [...paragraphs, ...last]
  //   }
  //   const category = $('.top-cate-head-title').find('a')
  //   const categories = [...category].map((e) => this.formatText($(e).text()))
  //   const categoriesId = (await Promise.all(categories.map(this.getCategoryId))).filter((e) => !!e)
  //   result.categories = categoriesId
  //   return result
  // }
  getTitle($: CheerioAPI): string {
    return this.formatText($('.ArticleDetail > h1').text())
  }
  getDescription($: CheerioAPI): string {
    return this.formatText($('#ArticleContent > .ArticleLead > p').text())
  }
  getKeywords($: CheerioAPI): string[] {
    const keywords = [...$('.tagBoxContent .clearfix li a')].map((e) =>
      this.formatText($(e).text())
    )
    return keywords
  }
  getParagraphs($: CheerioAPI): IParagraph[] {
    const paragraphs: IParagraph[] = []
    const content = [...$('.ArticleContent').children()]
    content.forEach((el) => {
      const elem = $(el)
      if (el.tagName == 'p' && elem.attr('class') == 't-j') {
        const content = this.formatText(elem.text())
        if (!content) return
        paragraphs.push({
          type: 'text',
          content,
        })
      }
      if (el.tagName == 'figure') {
        const imageUrl = elem.find('img').attr('src')
        const imageDescription = elem.find('figcaption').text()
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
    const categoriesName = [...$('.top-cate-head-title').find('a')].map((e) =>
      this.formatText($(e).text())
    )
    const categories = await Promise.all(categoriesName.map(this.getCategoryId))
    return categories
  }
  getOwner($: CheerioAPI): string {
    return this.formatText($('#ArticleContent p.t-j').last().text())
  }
  getTimeString($: CheerioAPI): string {
    return this.formatText($('.ArticleDate').text())
  }
}
