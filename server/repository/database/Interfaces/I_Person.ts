import PersonSchema from "../schema/person"

export type PersonId = number
export type Hash = string


export default interface I_Person  {
    deleteAllPersons(): Promise<boolean>
    deletePerson (personId: PersonId): Promise<boolean>
    addPerson (name: string, surname: string, ContinentId: number | null | undefined, dateOfBirthd: moment.Moment | undefined): Promise<PersonSchema | null>
    getPerson (personId: number): Promise<PersonSchema | null>
    getPersons (): Promise<PersonSchema[]> 
    putPerson (name: string, surname: string, ContinentId: number | null | undefined, personId: PersonId, dateOfBirthd: moment.Moment): Promise<boolean>
}