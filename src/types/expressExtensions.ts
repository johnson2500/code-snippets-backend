

// export interface IRequest extends express.Request<string> {
//     ownerId?: string;
// }

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Express {
    export interface Request {
       ownerId?: string;
       token?: string;
    }
 }
