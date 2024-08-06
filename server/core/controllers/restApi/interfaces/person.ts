import { NextFunction, Response, Request } from "express";


export default interface I_Person {
    deletePerson (req: Request, res: Response, next: NextFunction): NextFunction | null
    deleteAllPersons (req: Request, res: Response, next: NextFunction): NextFunction | null
    addPerson (req: Request, res: Response, next: NextFunction): NextFunction | null
    getPerson (req: Request, res: Response, next: NextFunction): NextFunction | null
    putPerson (req: Request, res: Response, next: NextFunction): NextFunction | null
}

