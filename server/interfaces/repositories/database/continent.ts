import ContinentSchema from "../../../repository/database/schema/Continent";

export default interface I_Continent {
    getContinents(): Promise<ContinentSchema[]>
}