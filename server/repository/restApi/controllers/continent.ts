import { NextFunction,  Request, Response} from "express";
import getDBConnection from "../../database/getDBConnection";
import I_Continent_Schema from "../../../interfaces/repositories/database/continent";
import I_Continent from "../../../interfaces/adapters/restApi/continent";




export default class Continent implements I_Continent{
    public db: I_Continent_Schema = getDBConnection("sqlite")
    constructor(db: I_Continent_Schema) {
        this.db = db
    }
    getContinents(req: Request, res: Response, next: NextFunction): NextFunction | null {
        const db: I_Continent_Schema = getDBConnection("sqlite")

        db.getContinents()
        .then(continents => res.json(continents))
        .catch(e => {
            res.status(500).json({message: e})
        })
        return null
    }
}