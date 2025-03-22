import { Request, Response, Express } from 'express';
import { Mysql } from '../db/MySqlUtils';
import jwt from "jsonwebtoken"
const SECRET_KEY = 'login2021'
import { PrefixPath } from '../constant/Constant';

const Login = async (req: Request, res: Response) => {

    let { account, password } = req.body;

    const sql = "select * from `user` where `account` = ? AND `password` = ?"
    const { err, rows } = await Mysql(sql, [account, password])
    console.log(err, rows, 'err')
    if (err == null && rows.length > 0) {
        const token = jwt.sign(
            { user: { name: account, password: password } },
            SECRET_KEY,
            { expiresIn: '3h' }
        )

        let admin_info = rows[0]
        admin_info.password = ""
        console.log('🚀 → token', token)
        res.send({
            code: 200,
            msg: "登录成功",
            data: {
                user: admin_info,
                token: token
            }
        })
    } else {
        res.send({
            code: 500,
            msg: "登录失败"
        })
    }

}

const InitLoginApi = (app: Express) => {
    app.use(PrefixPath + '/login', Login)
}
export default InitLoginApi
