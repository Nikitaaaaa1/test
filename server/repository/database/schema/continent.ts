import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize"; 

class Continent extends Model {
    public ContinentId!: number;
    public Name!: string;
    public Code!: string;
}

Continent.init(
    {
        ContinentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Code: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Continent",
        tableName: "tblContinent"
    }
);

export default Continent;
