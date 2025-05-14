import { Multer } from "multer"; // Multer's File type

export {}; // Mark this as a module

declare global {
    namespace Express {
        interface Request {
            userId?: string; // or a more specific type if you know it
            files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
        }
    }
}
