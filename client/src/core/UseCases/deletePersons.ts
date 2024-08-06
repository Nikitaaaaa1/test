import axios from 'axios'
export default async function deleteAllPersons(): Promise<boolean> {
    return axios.delete("http://localhost:3000/api/form")
    .then(res => {
        if (res.status > 299) throw Error(res.statusText)
        return true
    })
} 