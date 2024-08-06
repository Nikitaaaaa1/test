import axios from 'axios'
export default async function deletePersonByPk(id: number): Promise<boolean> {
    return axios.delete(`http://localhost:3000/api/form/${id}`)
    .then(res => {
        if (res.status > 299) throw Error(res.statusText)
        return true
    })
} 