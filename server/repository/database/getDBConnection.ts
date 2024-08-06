import I_Continent from "../../interfaces/repositories/database/continent";
import I_Person from "../../interfaces/repositories/database/person";
import sqlite from "./database";
import DBType from "./types/T_DBType";

interface MergedInterface extends I_Person, I_Continent {}

export default function getDBConnection (database: DBType): MergedInterface {
    switch (database) {
        case "postgres":
            return connectPostrgres()
        case "sqlite":
            return connectSqlite()
    }
}



function connectPostrgres(): MergedInterface {
    return new sqlite()
} 
function connectSqlite(): MergedInterface {
    return new sqlite()
} 