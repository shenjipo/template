export { }

declare global {
    namespace Express {
        export interface Request {
            user: {
                name: string
                password: string
            }

        }
    }
}