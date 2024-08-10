import { NextFunction,  Request, Response} from "express";
import I_Continent from "./interfaces/continent";
import I_Continent_DB from "../../../repository/database/interfaces/I_Continent";


export default class Continent implements I_Continent{
    protected db: I_Continent_DB
    constructor(db: I_Continent_DB) {
        this.db = db
        this.getContinents = this.getContinents.bind(this)
    }
    public getContinents(req: Request, res: Response, next: NextFunction): NextFunction | null {
        this?.db?.getContinents()
        .then(continents => res.json(continents))
        .catch(e => {
            res.status(500).json({message: e})
        })
        return null
    }
}