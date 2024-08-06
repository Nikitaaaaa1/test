import express from "express"
import Person from "../../repository/restApi/controllers/person"
import getDBConnection from "../../repository/database/getDBConnection"

export default class Router_Person {
    public returnRoutes() {
        const repo = new Person(getDBConnection("sqlite"))
        const router = express.Router()
        router.get("/form", repo.getPersons)
        router.get("/form/:userId", repo.getPerson)
        router.delete("/form/:userId", repo.deletePerson)
        router.delete("/form", repo.deleteAllPersons)
        router.post("/form", repo.addPerson)
        return router
    }
}

