import express from "express"
import getDBConnection from "../../repository/database/getDBConnection"
import DBType from "../../repository/database/types/T_DBType"
import Continent from "../../repository/restApi/controllers/continent"


export default class Router_Continent {
    public returnRoutes() {
        const repo = new Continent(getDBConnection("sqlite"))
        const router = express.Router()
        router.get("/continents", repo.getContinents)
        return router
    }
}
