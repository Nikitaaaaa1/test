import moment from "moment"
import { Hash, PersonId } from "../../../interfaces/repositories/database/person"


export default class Person{
    private Name?: string = ""
    private Surname?: string = ""
    private DateOfBirthd?: moment.Moment 
    private ContinentId?: number
    private id?: PersonId
    private hash?: Hash = ""
    private ContinentName?: string = ""
    constructor(name?: string, surname?: string, dateOfBirthd?: moment.Moment, continentId?: number, id?: PersonId, continentName?: string){
        this.Name = name
        this.Surname = surname
        this.DateOfBirthd = dateOfBirthd
        this.id = id
        this.ContinentId = continentId
        this.ContinentName = continentName
    }

    set setName(name: string) {
        if(name.length < 2 || !this.Name) return
        this.Name = name
    }
    set setSurname(surname: string) {
        if(surname.length < 2 || !this.Surname) return
        this.Surname = surname
    }
    set setDateOfBirthd(dateOfBirthd: moment.Moment) {
        if (!dateOfBirthd.isValid()) {
            throw Error("incorrect date format")
        }
        this.DateOfBirthd = dateOfBirthd
    }
    set setRegionId(code: number) {
        this.ContinentId = code
    }

    get name(): string | undefined {return this.Name}
    get surname(): string | undefined {return this.Surname}
    get dateOfBirthd(): moment.Moment | undefined {return this.DateOfBirthd}
    get continentId(): number | undefined {return this.ContinentId}
    get getId(): PersonId | undefined {return this.id}
    get getHash(): Hash  | undefined {return this.hash}
    get() {
        return {
            Name: this.Name,
            Surname: this.Surname,
            DateOfBirthd: moment(this.DateOfBirthd).format("DD/MM/YYYY"),
            id: this.id,
            ContinentId: this.ContinentId,
            ContinentName: this.ContinentName
        }
    }
}


