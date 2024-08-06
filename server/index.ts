
import sequelize from "./repository/database/sequelize"
import express from "express"
import Router_Person from "./drivers/restApi/person"
import Router_Continent from "./drivers/restApi/continent"
import getDBConnection from "./repository/database/getDBConnection"
import Validator from "./core/validation/validator"
const cors = require("cors") 

const app = express()

sequelize.authenticate()
.then(() => console.log('Database Connected'))
.catch(err => console.log('Error: ', err))


app.use(cors())
app.use(express.json({ limit: "1MB" }));

const db = getDBConnection("sqlite")
const validator = new Validator(db)
app.use("/api", new Router_Person(db, validator).router)
app.use("/api", new Router_Continent(db).router)

app.listen(3000, () => {
  console.log("server run on port 3000")
})
