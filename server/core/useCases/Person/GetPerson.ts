import I_Person from "../../../repository/database/Interfaces/I_Person";
import Person from "../../entity/Person/person";
import moment from "moment";

export default async function GetPerson(personId: number, db: I_Person): Promise<any> {
    if (!personId) throw Error("undefined userId") 
    return db.getPerson(personId).then(rows => {
        return new Person(
            rows?.Name,
            rows?.Surname,
            rows?.DateOfBirthd && moment(rows?.DateOfBirthd, "YYYY-MM-DD HH:mm:ss"),
            rows?.ContinentId ? rows?.ContinentId : undefined,
            rows?.PersonId
        ).get()
    })
}