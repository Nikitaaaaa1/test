import I_Continent from "../../../interfaces/repositories/database/continent";
import Continent from "../../entity/continent/continent";

export default async function GetContinents(db: I_Continent): Promise<any[]> {
    return db.getContinents()
    .then(res => res.map(i => new Continent(i.ContinentId, i.Name, i.Code).get()))
}