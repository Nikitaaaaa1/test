
import sequelize from "./repository/database/sequelize"
import express from "express"
import Router_Person from "./adapters/restApi/person"
import Router_Continent from "./adapters/restApi/continent"
const cors = require("cors") 

const app = express()

sequelize.authenticate()
.then(() => console.log('Database Connected'))
.catch(err => console.log('Error: ', err))

app.use(cors())
app.use(express.json({ limit: "1MB" }));

app.use("/api", new Router_Person().returnRoutes())
app.use("/api", new Router_Continent().returnRoutes())

app.listen(3000, () => {
  console.log("server run on port 3000")
})
