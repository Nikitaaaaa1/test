import axios from "axios";
import Person from "../types/T_Person";


export default async function getPersons(): Promise<Person[]> {
    return axios.get("http://localhost:3000/api/form", {})
    .then(res => {
        if (res.status > 299) throw Error(res.statusText)
        return res.data
    })
}
