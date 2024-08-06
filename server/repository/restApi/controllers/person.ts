import { NextFunction,  Request, Response} from "express";
import I_Person from "../../../interfaces/adapters/restApi/person";
import I_Person_DB  from "../../../interfaces/repositories/database/person";
import CreatePerson from "../../../core/useCases/Person/CreatePerson";
import getDBConnection from "../../database/getDBConnection";
import DeletePerson from "../../../core/useCases/Person/DeletePerson";
import GetPersons from "../../../core/useCases/Person/GetPersons";
import GetPerson from "../../../core/useCases/Person/GetPerson";
import DeleteAllPersons from "../../../core/useCases/Person/DeleteAllPersons";


interface PersonRequestBody {
    Name: string;
    Surname: string;
    ContinentId: number;
    DateOfBirthd: string;
}

export default class Person implements I_Person{
    public db: I_Person_DB = getDBConnection("sqlite")
    constructor(db: I_Person_DB) {
        this.db = db
    }
    public deletePerson(req: Request, res: Response): NextFunction | null{
        const {userId} = req.params
        DeletePerson(Number(userId))
        .then(() => res.json({message: "user deleted successfully"}) )
        .catch(e => {
            res.status(500).json({message: e})
        })
        return null
    }
    public addPerson(req: Request, res: Response): NextFunction | null{
        const { Name, Surname, ContinentId, DateOfBirthd }: PersonRequestBody =  req.body;
        CreatePerson(Name, Surname, ContinentId, DateOfBirthd)
        .then(() => res.json({message: "user added successfully"}) )
        .catch(e => {
            console.log(e)
            res.status(500).json({message: e.message})
        })
        return null
    }
    public getPersons(req: Request, res: Response): NextFunction | null{
        GetPersons().then(persons => res.json(persons))
        .catch(e => {
            res.status(500).json({message: e})
        })
        return null
    }
    public deleteAllPersons(req: Request, res: Response): NextFunction | null{
        DeleteAllPersons().then(() => res.json())
        .catch(e => {
            console.log(e)
            res.status(500).json({message: e})
        })
        return null
    }
    public putPerson(req: Request, res: Response, next: NextFunction): NextFunction | null{
        return null // TODO: later
    }
    public getPerson(req: Request, res: Response, next: NextFunction): NextFunction | null{
        const {userId} = req.params
        GetPerson(Number(userId))
        .then(person => res.json(person))
        .catch(e => {
            res.status(500).json({message: e})
        })
        return null
    }
}