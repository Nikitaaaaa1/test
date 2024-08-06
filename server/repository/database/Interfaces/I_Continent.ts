import ContinentSchema from "../schema/continent";

export default interface I_Continent {
    getContinents(): Promise<ContinentSchema[]>
}