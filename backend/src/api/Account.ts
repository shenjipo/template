import { Request, Response, Express } from 'express';
import { Mysql } from '../db/MySqlUtils';
import jwt from "jsonwebtoken"
const SECRET_KEY = 'login2021'
import { PrefixPath } from '../constant/Constant';
import { v4 as uuidv4 } from 'uuid';

// 新建博客
const queryAccount = async (req: Request, res: Response) => {


    const sql = "select `account`, `password`, `uuid`, `createTime`, `updateTime` from `user`"

    const { err, rows } = await Mysql(sql, [])
    if (err == null && rows.length > 0) {

        res.send({
            code: 200,
            msg: "查询成功",
            data: rows
        })
    } else {
        res.send({
            code: 500,
            msg: "查询失败"
        })
    }
}


// 创建账号
const addAccount = async (req: Request, res: Response) => {


    const { username, password, createTime } = req.body;
    const uuid = uuidv4()
    const insert_sql = "INSERT INTO `user` (`account`,`password`, `createTime`, `uuid`) VALUES (?,?,?,?)"

    const params = [username, password, createTime, uuid]

    const { err, rows } = await Mysql(insert_sql, params)

    if (err == null) {
        res.send({
            code: 200,
            data: {
                uuid: uuid
            },
            msg: "添加成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "添加失败",
            data: {}
        })
    }
}


// 删除账号
const deleteAccount = async (req: Request, res: Response) => {


    const { uuid } = req.body;
    const { err, rows } = await Mysql("delete from `user` where `uuid` = ?", [uuid])

    if (err === null) {
        res.send({
            code: 200,
            msg: "删除成功",
            data: null
        })
    } else {
        res.send({
            code: 500,
            msg: "删除失败"
        })
    }
}

// 根据uuid修改密码
const editAccount = async (req: Request, res: Response) => {


    const { uuid, password, updateTime } = req.body;
    const { err, rows } = await Mysql("update `user` set `password` = ?,  `updateTime` = ? where `uuid` = ?",
        [password, updateTime, uuid])

    if (err === null) {
        res.send({
            code: 200,
            msg: "删除成功",
            data: null
        })
    } else {
        res.send({
            code: 500,
            msg: "删除失败"
        })
    }
}


const InitAccountApi = (app: Express) => {
    app.use(PrefixPath + '/queryAccount', queryAccount)
    app.use(PrefixPath + '/addAccount', addAccount)
    app.use(PrefixPath + '/deleteAccount', deleteAccount)
    app.use(PrefixPath + '/editAccount', editAccount)
}
export default InitAccountApi
