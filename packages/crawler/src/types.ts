export interface ShortDetailNews {
  title: string
  link: string
  contentSnippet: string
  pubDate: string
}

export interface NewsDetail {
  title: string
  description: string
  paragraphs: Array<NewsParagraph>
}

export type NewsParagraph =
  | {
      type: 'text'
      content: string
    }
  | {
      type: 'image'
      imageUrl: string
      description: string
    }
