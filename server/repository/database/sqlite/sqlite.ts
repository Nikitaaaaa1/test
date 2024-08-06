import { SqliteConnection } from "@sequelize/sqlite3";
import I_Person, { PersonId } from "../../../interfaces/repositories/database/person";
import Person from "../../../entity/person/person";
import sqlite3, { verbose } from "sqlite3";
import path from "path"

const driver = sqlite3.verbose() 

const filepath: sqlite.filepath = path.join(__dirname, "../sqlite/sqlite.sql")
export default class sqlite implements I_Person{
    connect(): SqliteConnection {
        return new driver.Database(this.filepath, (err) => {
            if (err) {
                // TODO: make a custom error
                throw Error(`\ncan\`t connect to database: ${err}\n`)
            }
        })
    }
    deletePerson (personId: PersonId): boolean {return false}
    addPerson (name: string, surname: string, countryCode: string): Person {return new Person()}
    getPerson (personId: string): Person {return new Person()}
    putPerson (name: string, surname: string, countryCode: string, personId: PersonId): Person {return new Person()}
}