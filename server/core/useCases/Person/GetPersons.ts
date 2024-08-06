import I_Person from "../../../interfaces/repositories/database/person";
import getDBConnection from "../../../repository/database/getDBConnection";
import Person from "../../entity/person/person";
import moment from "moment";

export default async function GetPersons(): Promise<any[]> {
    const db = getDBConnection("sqlite")
    return db
    .getPersons()
    .then(rows => {
        if(!rows.length) return []
        return rows.map(row => {
            return new Person(
                row?.Name,
                row?.Surname,
                row?.DateOfBirthd ? moment(row.DateOfBirthd) : moment(Date.now().toString()),
                row?.ContinentId,
                row?.PersonId,
                row?.continent.Name
            ).get()
        })
    })
}