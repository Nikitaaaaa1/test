import getDBConnection from "../../../repository/database/getDBConnection";
export default async function DeletePerson(personId: number): Promise<boolean> {
    const db = getDBConnection("sqlite")
    if (!personId) throw Error("undefined userId") 
    return db.deletePerson(personId)
}