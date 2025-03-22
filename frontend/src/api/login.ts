import type { AxiosResponse } from "axios"
import { http } from "./axios"
import type { Account } from "@/model/Account"
import type { Response } from "@/model/Response"


export class LoginApi {
    static login(params: { account: string, password: string }) {
        return http.post('/login', params).then((res: AxiosResponse<Response<{
            token: string,
            user: Account
        }>>) => {
           
            return res.data
        })
    }
}