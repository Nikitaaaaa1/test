import moment from "moment"
import NoRequiredFieldProvided from "../../exeptions/NoRequiredFieldProvided"
import Person from "../../entity/person/person"
import getDBConnection from "../../../repository/database/getDBConnection"

export default async function CreatePerson(name: string, surname: string, ContinentId: number, dateOfBirthd: string): Promise<any> { 
    const db = getDBConnection("sqlite")
    // get params from /restApi folder and database instence 
    const requireField: [string, number, string] = [name, ContinentId, dateOfBirthd] // create aliases to escape many of "||" operators
    const dateIsValid = moment(dateOfBirthd).isValid()
    if (
        requireField.some(i => !i || i == 0 || i == "") ||
        !dateIsValid ||
        name.length < 2
    ) throw new NoRequiredFieldProvided<string>(
            "", // use default message
            ["name", "ContinentId", "dateOfBirthd"] // set fields name
            , [!!name, !!ContinentId, dateIsValid] // type conversion to boolean
        ).throw()

    return db.addPerson(name, surname, ContinentId, moment(dateOfBirthd))
    .then(rows => {
        // check userId. class instance could be created without id. But in this case, we must get their Id
        if (!rows?.PersonId) throw Error("cannot find userId. Possibly, the user won't created\n")
        return new Person(rows.Name, rows.Surname, moment(rows.DateOfBirthd), rows.ContinentId) 
    })
}