import { http } from "./axios"
import type { Response } from "@/model/Response"
import type { Account } from "@/model/Account"
import type { PageList, PageParam } from "@/model/Page"
import type { AxiosResponse } from "axios"
/* 登录接口参数类型 */

interface AddAccount {
    username: string,
    password: string,
    createTime?: string
}

export class AccountManageApi {
    // 查询所有账号
    static queryAccountList(val: PageParam<{}>) {
        return http.post('/queryAccount', val).then((res: AxiosResponse<Response<PageList<Account>>>) => {
            return res.data
        })
    }

    // 根据uuid查询账号
    static queryAccountByUuid(uuid: string) {
        return http.post('/queryAccountByUuid', {
            uuid
        }).then((res: AxiosResponse<Response<Account>>) => {
            return res.data
        })
    }

    // 新建账号
    static addAccount(params: AddAccount): Promise<{ id: number }> {
        params.createTime = new Date().getTime().toString()

        return http.post('/addAccount', params).then(res => {

            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }

    // 删除账号
    static deleteAccount(params: { uuid: string }): Promise<null> {
        return http.post('/deleteAccount', params).then(res => {
            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }

    // 修改账号
    static editAccount(params: { uuid: string, password: string, updateTime?: string }): Promise<null> {
        params.updateTime = new Date().getTime().toString()

        return http.post('/editAccount', params).then(res => {
            return res
        }).catch((err: any) => {
            return Promise.reject(err)
        })
    }
}