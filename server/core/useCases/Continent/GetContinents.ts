import I_Continent from "../../../repository/database/interfaces/I_Continent";
import Continent from "../../entity/Continent/continent";

export default async function GetContinents(db: I_Continent): Promise<any[]> {
    return db.getContinents()
    .then(res => res.map(i => new Continent(i.ContinentId, i.Name, i.Code).get()))
}