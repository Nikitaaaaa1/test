import axios from 'axios'
import moment from 'moment';
export default async function addPerson(
    name: string
    , surname?: string
    , continentId?: number
    , dateOfBirthd?: string
): Promise<boolean> {
    if(!moment(dateOfBirthd).isValid) return false
    const body = {
        Name:name
        , Surname:surname
        , ContinentId: continentId
        , DateOfBirthd: moment(dateOfBirthd).format("YYYY-MM-DDT00:00:00Z")
    }
    return axios.post("http://localhost:3000/api/form", body)
    .then(res => {
        if (res.status > 299) throw Error(res.statusText)
        return res.data
    })
} 