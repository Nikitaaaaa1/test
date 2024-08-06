import Person from "../../../core/entity/person/person"
import PersonSchema from "../../../repository/database/schema/Person"

export type PersonId = number
export type Hash = string

// interface Connection {
//     connect(): SqliteConnection | PostgresConnection | null
// }

export default interface I_Person  {
    deleteAllPersons(): Promise<null>
    deletePerson (personId: PersonId): Promise<boolean>
    addPerson (name: string, surname: string, ContinentId: number, dateOfBirthd: moment.Moment): Promise<PersonSchema | null>
    getPerson (personId: number): Promise<PersonSchema | null>
    getPersons (): Promise<PersonSchema[]> 
    putPerson (name: string, surname: string, ContinentId: number, personId: PersonId, dateOfBirthd: moment.Moment): Promise<boolean>
}