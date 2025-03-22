export class Page {
    current: number = 1
    size = 10
    total = 0
}

export type PageParam<T = unknown> = T & {
    current: number
    size: number
}

export interface PageList<T> {
    records: Array<T>,
    total: number
}