import I_Person from "../../../repository/database/Interfaces/I_Person";

export default async function DeletePerson(personId: number, db: I_Person): Promise<boolean> {
    if (!personId) throw Error("undefined userId") 
    return db.deletePerson(personId)
}