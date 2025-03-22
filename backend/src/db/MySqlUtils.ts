import mysql, { MysqlError, FieldInfo } from "mysql"


export const Mysql = (sql: string, query?: Array<any>): Promise<{ rows: any, err: Nullable<MysqlError> }> => {
    console.log(process.env.DB_HOST, 'DB_HOST')
    const mysqlInstance = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 3306,
        database: process.env.DB_NAME
    })

    mysqlInstance.connect()
    return new Promise((resolve, reject) => {
        //增删改
        if (query !== null) {
            mysqlInstance.query(sql, query, (err, rows) => {
                resolve({ err, rows })
            })
        } else {
            mysqlInstance.query(sql, (err, rows) => {
                resolve({ err, rows })
            })
        }
        mysqlInstance.end()
    })


}
