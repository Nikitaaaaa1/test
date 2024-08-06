import axios from "axios"
import Continent from "../types/Country"

export default function getContinents(): Promise<Continent[]> {
    return axios.get("http://localhost:3000/api/continents", {})
    .then(res => {
        if (res.status > 299) throw Error(res.statusText)
        return res.data
    })
}