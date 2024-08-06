import { FC } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import Person from '../core/Person'

type Props = {
    persons: Person[] | null
    setChosedItem: (id: number) => void
    chosedItem: number | null
    deleteByPK: (person: Person) => void
} 

const PersonTable: FC<Props> = ({persons, setChosedItem, chosedItem, deleteByPK}) => {

    const rows: string[] = ["Imię", "Nazwisko", "Data urodzenia", "Kontynent"]
    return (
        <div>
            <TableContainer>
                <Table
                    className="w-100"
                >
                    <TableHead>
                        <TableRow>
                            {rows.map((i, idx) => (<TableCell key={idx}>{i}</TableCell>))}
                            <TableCell></TableCell>
                        </TableRow>
                        
                    </TableHead>
                    <TableBody>
                    {persons && persons.map((i, idx) => (
                        <TableRow 
                            key={idx}
                            onClick={() => setChosedItem(i.getId)}
                        >
                            <TableCell>{i.getName}</TableCell>
                            <TableCell>{i.getSurname}</TableCell>
                            <TableCell>{i.getDateOfBirthd}</TableCell>
                            <TableCell>{i.getContinentName}</TableCell>
                            <TableCell
                                align="center"
                                sx = {{
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    disabled={!(chosedItem === i.getId)}
                                    onClick={() => deleteByPK(i)}
                                >Usuń</Button>
                            </TableCell>
                            
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PersonTable