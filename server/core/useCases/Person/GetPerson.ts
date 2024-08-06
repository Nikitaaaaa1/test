import I_Person from "../../../interfaces/repositories/database/person";
import Person from "../../entity/person/person";
import moment from "moment";
import getDBConnection from "../../../repository/database/getDBConnection";

export default async function GetPerson(personId: number): Promise<any> {
    const db = getDBConnection("sqlite")
    if (!personId) throw Error("undefined userId") 
    return db.getPerson(personId).then(rows => {
        return new Person(
            rows?.Name,
            rows?.Surname,
            moment(rows?.DateOfBirthd),
            rows?.ContinentId,
            rows?.PersonId
        ).get()
    })
}