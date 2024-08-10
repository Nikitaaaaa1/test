import I_Person, { PersonId } from "./Interfaces/I_Person";
import PersonSchema from "./schema/person";
import ContinentSchema from './schema/continent'
import moment from "moment";
import I_Continent from "./interfaces/I_Continent";

export default  class database implements I_Person, I_Continent {
    async deletePerson (personId: PersonId): Promise<boolean> {
        return PersonSchema.destroy({
            where: {
                PersonId: personId
            }
        })
        .then(() => true )
    }
    async deleteAllPersons (): Promise<boolean> {
        return PersonSchema.truncate().then(() => true)
    }
    async addPerson (
        name: string, 
        surname: string, 
        ContinentId: number, 
        dateOfBirthd: moment.Moment
    ): Promise<PersonSchema | null>  {
        return PersonSchema.create(
            {
                Surname: surname,
                Name: name,
                DateOfBirthd: dateOfBirthd.toISOString(),
                ContinentId: ContinentId
            }
        )
    }
    async getPerson(personId: number): Promise<PersonSchema | null> {
        return PersonSchema
        .findByPk(personId)
    }
    async getPersons(): Promise<PersonSchema[]> {
        return PersonSchema
        .findAll({
            include: [
                {
                    model: ContinentSchema,
                    as: 'continent',
                    required: false
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        },
    )
    }
    async putPerson (
        name: string, 
        surname: string, 
        continentId: number, 
        personId: PersonId
    ): Promise<boolean> {
        return PersonSchema.update(
            {
                Name: name,
                Surname: surname,
                ContinentId: continentId
            },
            {
                where: {
                    PersonId: personId
                }
            }
        )
        .then( count => {
            return !!count
        })
    }
    async getContinents(): Promise<ContinentSchema[]> {
        return ContinentSchema
        .findAll()
    }
}