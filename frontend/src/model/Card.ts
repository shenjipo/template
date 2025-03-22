export interface Card {
    title: string,
    icon: string,
    i: string,
    x: number,
    y: number,
    w: number,
    h: number,
    minH?: number
    minW?: number
    maxH?: number
    maxW?: number
    type: CARD_TYPE,
    custom: any,

}
export enum CARD_TYPE {
    'LineChartBase',
    'LineChartSmooth',
    'BarChartBase',
    'BarChartBackground',
}