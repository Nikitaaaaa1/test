import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import Continent from "./continent"; 
import { CreatedAt, UpdatedAt } from "sequelize-typescript";

class Person extends Model {
    public PersonId!: number;
    public Surname!: string;
    public Name!: string;
    public DateOfBirthd!: Date;
    public ContinentId!: number | null;
    public continent!: Continent | null
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
            allowNull: true,
        },
        DateOfBirthd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ContinentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Continent,
                key: 'ContinentId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
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
    as: 'continent',
    targetKey: 'ContinentId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});


export default Person;
