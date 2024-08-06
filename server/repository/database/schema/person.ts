import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import Continent from "./Continent"; 

class Person extends Model {
    public PersonId!: number;
    public Surname!: string;
    public Name!: string;
    public DateOfBirthd!: Date;
    public ContinentId!: number;
    public continent!: Continent
}

Person.init(
    {
        PersonId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DateOfBirthd: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ContinentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Continent,
                key: 'ContinentId'
            }
        }
    },
    {
        sequelize,
        modelName: 'Person',
        tableName: 'tblPerson',
    }
);

Person.belongsTo(Continent, {
    foreignKey: 'ContinentId',
    as: 'continent'
});

export default Person;
