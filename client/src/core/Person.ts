import person from "./types/T_Person"
import deletePersonByPk from "./UseCases/deletePersonByPk"
export default class Person{
    private ContinentId: number
    private ContinentName: string
    private DateOfBirthd: string
    private Name: string
    private Surname?: string
    private id: number

    constructor(p: person) {
        this.ContinentId = p.ContinentId
        this.ContinentName = p.ContinentName
        this.DateOfBirthd = p.DateOfBirthd
        this.Name = p.Name
        this.Surname = p.Surname
        this.id = p.id
    }
    get getId(): number {return this.id}
    get getContinentName(): string {return this.ContinentName}
    get getContinentId(): number {return this.ContinentId}
    get getDateOfBirthd(): string {return this.DateOfBirthd}
    get getName(): string {return this.Name}
    get getSurname(): string {return this.Surname || ""}

    public delete(): Promise<any> {
        return deletePersonByPk(this.id)
    }
}