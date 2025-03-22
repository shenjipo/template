import type { AxiosResponse } from "axios"
import { http } from "./axios"
import type { Account } from "@/model/Account"
/* 登录接口参数类型 */
export interface Response<T> {
    code: number,
    msg: string,
    data: T
}

interface LoginData {
    token: string,
    user: any
}
export class LoginApi {
    static login(params: {
        account: string,
        password: string
    }) {
        return http.post('/login', params).then((res: AxiosResponse<Response<any>>) => {
            return res.data
        })
    }
}