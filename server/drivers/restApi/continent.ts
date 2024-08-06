import express, { Router } from "express"
import getDBConnection from "../../repository/database/getDBConnection"
import Continent from "../../core/controllers/restApi/continent"
import DBType from "../../repository/database/types/T_DBType"
import I_Continent_DB from "../../repository/database/Interfaces/I_Continent"
import I_Continent from "../../core/controllers/restApi/interfaces/continent"

export default class Router_Continent {
    // private repo: I_Continent
    public router: Router
    constructor (db: I_Continent_DB) {
        this.router  = express.Router()
        this.returnRoutes(db)
    }
    protected returnRoutes(db: I_Continent_DB) {
        const repo = new Continent(db)
        this.router.get("/continents", repo.getContinents)
    }
}
