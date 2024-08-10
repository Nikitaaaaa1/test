import I_Person from "../../../repository/database/Interfaces/I_Person";


export default async function DeleteAllPersons(db: I_Person): Promise<boolean> {
    return db.deleteAllPersons()
}