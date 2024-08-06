import moment from "moment"
import Person from "../../entity/Person/person"
import I_Person from "../../../repository/database/Interfaces/I_Person"
import I_Validator from "../../validation/I_Validator"

export default async function CreatePerson(
    name: string
    , surname: string
    , continentId: number
    , dateOfBirthd: string
    , db: I_Person
    , validator: I_Validator
): Promise<any> 
{ 
    validator.validateUser(name, surname, continentId, dateOfBirthd)
    .then(res => !res && Error("user don`t complete require") )
    .then(() => {
        return db.addPerson(name, surname, continentId, dateOfBirthd ? moment(dateOfBirthd, "YYYY-MM-DD HH:mm:ss") : undefined)
        .then(rows => {
            if (!rows?.PersonId) throw Error("cannot find userId. Possibly, the user won't created\n")
            return new Person(
                rows.Name
                , rows.Surname
                , rows.DateOfBirthd &&
                moment(
                    rows.DateOfBirthd, "YYYY-MM-DD HH:mm:ss"
                )
                , rows.ContinentId ? rows.ContinentId : null
            ) 
        })
    })
}