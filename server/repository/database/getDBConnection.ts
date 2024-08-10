import I_MergedInterface from "./interfaces/I_MergedInterface";
import sqlite from "./database";
import DBType from "./types/T_DBType";



export default function getDBConnection (database: DBType): I_MergedInterface {
    switch (database) {
        case "postgres":
            return new sqlite()
        case "sqlite":
            return connectSqlite()
    }
}



function connectPostrgres(): I_MergedInterface {
    return new sqlite()
} 
function connectSqlite(): I_MergedInterface {
    return new sqlite()
} 