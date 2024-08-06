import { Hash, PersonId } from "../../interfaces/repositories/database/person"


export default class Person{
    protected Name?: string = ""
    protected Surname?: string = ""
    protected DateOfBirthd?: string = ""
    protected CountryCode?: string = ""
    private id?: PersonId = ""
    private hash?: Hash = ""
    constructor(name?: string, surname?: string, dateOfBirthd?: string, countryCode?: string, id?: PersonId, hash?: Hash){
        this.Name = name
        this.Surname = surname
        this.DateOfBirthd = dateOfBirthd
        this.id = id
        this.hash = hash
        this.CountryCode = countryCode
    }

    set setName(name: string) {
        if(!name || !this.Name) return
        this.Name = name
    }
    set setSurname(surname: string) {
        if(!surname || !this.Surname) return
        this.Surname = surname
    }

    get getId(): PersonId | undefined {return this.id}
    get getHash(): Hash  | undefined {return this.hash}
}