import express, { Router } from "express"
import Continent from "../../core/controllers/restApi/continent"
import I_Continent_DB from "../../repository/database/interfaces/I_Continent"

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
