import { NextFunction,  Request, Response} from "express";
import I_Person from "./interfaces/person";
import I_Person_DB from "../../../repository/database/Interfaces/I_Person";
import CreatePerson from "../../useCases/Person/CreatePerson";
import DeletePerson from "../../useCases/Person/DeletePerson";
import GetPersons from "../../useCases/Person/GetPersons";
import GetPerson from "../../useCases/Person/GetPerson";
import DeleteAllPersons from "../../useCases/Person/DeleteAllPersons";
import I_Validator from "../../validation/I_Validator";

interface PersonRequestBody {
    Name: string;
    Surname: string;
    ContinentId: number;
    DateOfBirthd: string;
}

export default class Person implements I_Person{
    public db: I_Person_DB
    public validator: I_Validator
    constructor(db: I_Person_DB, validator: I_Validator) {
        this.db = db
        this.validator = validator
        this.deletePerson = this.deletePerson.bind(this) 
        this.addPerson = this.addPerson.bind(this) 
        this.getPersons = this.getPersons.bind(this) 
        this.deleteAllPersons = this.deleteAllPersons.bind(this) 
        this.putPerson = this.putPerson.bind(this) 
        this.getPerson = this.getPerson.bind(this) 
    }
    public deletePerson(req: Request, res: Response): NextFunction | null{
        const {userId} = req.params
        DeletePerson(Number(userId), this.db)
        .then(() => res.json({message: "user deleted successfully"}) )
        .catch(e => {
            res.status(500).json(e)
        })
        return null
    }
    public addPerson(req: Request, res: Response): NextFunction | null{
        const { Name, Surname, ContinentId, DateOfBirthd }: PersonRequestBody =  req.body;
        CreatePerson(Name, Surname, ContinentId, DateOfBirthd, this.db, this.validator)
        .then(() => res.json({message: "user added successfully"}) )
        .catch(e => {
            console.log(e)
            res.status(500).json(e)
        })
        return null
    }
    public getPersons(req: Request, res: Response): NextFunction | null{
        GetPersons(this.db).then(persons => res.json(persons))
        .catch(e => {
            console.log(e)
            res.status(500).json(e)
        })
        return null
    }
    public deleteAllPersons(req: Request, res: Response): NextFunction | null{
        DeleteAllPersons(this.db).then(() => res.json())
        .catch(e => {
            console.log(e)
            res.status(500).json(e)
        })
        return null
    }
    public putPerson(req: Request, res: Response, next: NextFunction): NextFunction | null{
        return null // TODO: later
    }
    public getPerson(req: Request, res: Response, next: NextFunction): NextFunction | null{
        const {userId} = req.params
        GetPerson(Number(userId), this.db)
        .then(person => res.json(person))
        .catch(e => {
            res.status(500).json(e)
        })
        return null
    }
}