import { Dashboard } from "@/model/Dashboard"
import { http } from "./axios"
import { Response } from './login'
import { useStore } from '@/store/index'
const store = useStore()



export class DashBoardManageApi {
    // 查询所有仪表盘
    static queryDashboardList(par: { currPage: number, pageSize: number })
        : Promise<{ tableData: Array<Dashboard>, total: number }> {

        return http.post('/queryDashboardList', {
            authorUuid: store.userStore.user.uuid,
            ...par
        }).then(res => {
            res.tableData.forEach((item: Dashboard) => {
                item.custom = JSON.parse(item.custom)
            });
            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }

    // 根据id删除
    static deleteDashboardById(id: number): Promise<any> {
        return http.post('/deleteDashboardById', { id }).then(res => {
            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }


    // 根据id更新仪表盘
    static updateDashboardById(params: { id: number, custom: string, updateTime?: string }): Promise<any> {
        params.updateTime = new Date().getTime().toString()
        return http.post('/updateDashboardById', params).then(res => {
            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }

    // 新建仪表盘
    static saveDashBoard(params: { custom: string, createTime?: string, authorUuid?: string }): Promise<{ id: string }> {
        params.authorUuid = store.userStore.user.uuid
        params.createTime = new Date().getTime().toString()
        return http.post('/saveDashboard', params).then(res => {
            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }

    // 根据id更新仪表盘的卡片
    static updateCardListById(params: { id: string, cardList: string, updateTime?: string }): Promise<any> {
        params.updateTime = new Date().getTime().toString()
        return http.post('/updateCardListById', params).then(res => {
            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }

    // 根据id查询仪表盘所有信息
    static queryDashboardById(id: string): Promise<Dashboard> {
        return http.post('/queryDashboardById', { id }).then(res => {
            res.cardList = JSON.parse(res.cardList)
            res.custom = JSON.parse(res.custom)
            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }

}