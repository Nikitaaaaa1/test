import express, { Router } from "express"
import Person from "../../core/controllers/restApi/person"
import I_Person_DB from "../../repository/database/Interfaces/I_Person"
import I_Validator from "../../core/validation/I_Validator"

export default class Router_Person {

    public router: Router
    constructor (db: I_Person_DB, validator: I_Validator) {
        this.router = express.Router()
        this.returnRoutes(db, validator)
    }
    public returnRoutes(db: I_Person_DB, validator: I_Validator) {
        const repo = new Person(db, validator)
        this.router.get("/form", repo.getPersons)
        this.router.get("/form/:userId", repo.getPerson)
        this.router.delete("/form/:userId", repo.deletePerson)
        this.router.delete("/form", repo.deleteAllPersons)
        this.router.post("/form", repo.addPerson)
    }
}

