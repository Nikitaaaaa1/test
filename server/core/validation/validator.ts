import GetContinents from "../useCases/Continent/GetContinents";
import I_MergedInterface from "../../repository/database/interfaces/I_MergedInterface";
import moment from "moment";

export default class Validator{
    protected db: I_MergedInterface
    constructor(db: I_MergedInterface) {
        this.db = db
    }
    async validateUser(name: string, surname: string, continentId: number, dateOfBirthd: string): Promise<boolean> {
        const europeId = await GetContinents(this.db)
            .then(continents => continents.find(c => c.Code === "EU"))
            .then(europe => europe.continentId)
            .catch(e => {
                console.log(e)
                return 0
            })
        if (
            (!europeId || !name)
            || (europeId === continentId && surname.length < 2)
            || (Number(moment.duration(moment().diff(moment(dateOfBirthd)))) < 0)
        ) return false
        return true 
    }
}
