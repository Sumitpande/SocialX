declare global {
    namespace Express {
        interface Request {
            userId?: any;
            files?: any;
        }
    }
}
export { };
