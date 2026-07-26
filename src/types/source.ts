export type SourceType = 'pdf' | 'text' | 'youtube'

export type Source = {
  id: string
  type: SourceType
  title: string
  url?: string
  fileName?: string
  createdAt: number
}
