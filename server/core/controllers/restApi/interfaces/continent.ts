import { NextFunction, Response, Request } from "express";


export default interface I_Continent {
    getContinents(req: Request, res: Response, next: NextFunction): NextFunction | null
}