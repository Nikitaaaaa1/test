export default class Continent {
    private ContinentId: number = 0
    private Name: string = ""
    private Code: string = ""
    constructor(continentId: number, name: string, code: string) {
        this.ContinentId = continentId
        this.Name = name
        this.Code = code
    }
    get(){
        return {
            ContinentId: this.ContinentId,
            Name: this.Name,
            Code: this.Code
        }
    }
}