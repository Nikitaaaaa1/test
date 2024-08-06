import getDBConnection from "../../../repository/database/getDBConnection"
export default async function DeleteAllPersons(): Promise<null> {
    const db = getDBConnection("sqlite")
    return db.deleteAllPersons()
}