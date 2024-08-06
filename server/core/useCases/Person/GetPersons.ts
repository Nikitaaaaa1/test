import I_Person from "../../../repository/database/Interfaces/I_Person";
import Person from "../../entity/Person/person";
import moment from "moment";

export default async function GetPersons(db: I_Person): Promise<any[]> {
    return db
    .getPersons()
    .then(rows => {
        if(!rows.length) return []
        return rows.map(row => {
            return new Person(
                row?.Name,
                row?.Surname,
                row?.DateOfBirthd && moment(row.DateOfBirthd, "YYYY-MM-DD HH:mm:ss"),
                row?.ContinentId ? row?.ContinentId : undefined,
                row?.PersonId,
                row?.continent ? row?.continent.Name : ""
            ).get()
        })
    })
}