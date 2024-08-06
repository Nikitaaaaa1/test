import { FC } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import Person from '../types/Person'

type Props = {
    persons: Person[] | null
    setChosedItem: (id: number) => void
    deleteFunction: (id: number)=>void
    chosedItem: number | null
} 

const PersonTable: FC<Props> = ({persons, setChosedItem, deleteFunction, chosedItem}) => {

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
                            onClick={() => setChosedItem(i.id)}
                        >
                            <TableCell>{i.Name}</TableCell>
                            <TableCell>{i.Surname}</TableCell>
                            <TableCell>{i.DateOfBirthd}</TableCell>
                            <TableCell>{i.ContinentName}</TableCell>
                            <TableCell
                                align="center"
                                sx = {{
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    disabled={!(chosedItem === i.id)}
                                    onClick={() => deleteFunction(i.id)}
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