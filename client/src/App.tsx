import {useEffect, useState } from 'react'
import {FormControl, Box, Button, Typography } from '@mui/material'
import './App.css'
import {createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles"
import InputComponent from './components/input'
import PersonTable from './components/table'
import Dropdown from './components/dorpdown'
import Continent from './types/Country'
import getContinents from './getters/getContinents'
import moment from 'moment'
import addPerson from './useCases/addPerson'
import getPersons from './getters/getPersons'
import Person from './types/Person'
import deleteAllPersons from './useCases/deletePersons'
import deletePersonByPk from './useCases/deletePersonByPk'

type newPerson = {
  Name: string,
  Surname?: string,
  DateOfBirthd: string,
  ContinentId: number,
}

interface theme extends ThemeOptions {
  typography: {
    fontSize: number
  },
}
function App() {
  const defaultTheme = createTheme({
    typography: {
      fontSize: 14
    }
  });
  const defaultTheme2 = createTheme({
    typography: {
      fontSize: 28
    }
  });
  const [isValidName, setIsValidName] = useState(false)
  const [continents, setContinents] = useState<Continent[] | null>(null)
  const [theme, setTheme] = useState<theme>(defaultTheme)
  const [europeId, setEuropeId] = useState<number | null>(0)
  const [showUnderSelectCommunicat, setShowUnderSelectCommunicat] = useState<boolean>(false)
  const [persons, setPersons] = useState<Person[] | null>(null)
  const [enableToSave, setEnableToSave] = useState<boolean>(false)
  const [chosedItem, setChosedItem] = useState<number | null>(null)
  const [data, setData] = useState<newPerson>( {
    Name: "",
    Surname: "",
    DateOfBirthd: "",
    ContinentId: -1,
  })

  useEffect(() => {
    !isValidName 
    || showUnderSelectCommunicat
    || !moment(data.DateOfBirthd).isValid()
    || !data.ContinentId
    || Number(moment.duration(moment().diff(moment(data.DateOfBirthd)))) < 0
    ? setEnableToSave(false)
    : setEnableToSave(true)
  }, [data, isValidName, showUnderSelectCommunicat])

  const deleteAll = () => {
    deleteAllPersons()
    .then(() => {
      return getPersons()
      .then(p => setPersons(p))
      .catch(e => console.log(e)) 
    })
    .catch(e => console.log(e))
  }
  const deleteByPK = (id: number) => {
    deletePersonByPk(id)
    .then(() => {
      return getPersons()
      .then(p => setPersons(p))
      .catch(e => console.log(e)) 
    })
    .catch(e => console.log(e))
  }

  const handleChangeChoice = (id: number) => {
    if (chosedItem === id) return setChosedItem(null)  
    setChosedItem(id)
  }
  const postUser = () => {
    addPerson(data.Name,
      data.Surname,
      data.ContinentId,
      data.DateOfBirthd)
    .then(added => {
      if (!added) {
        window.alert("porazka")
        return
      }
      window.alert("sukces")
      const m = moment(data.DateOfBirthd) 
      if (m.isValid() && moment.duration(moment().diff(m)).asYears() > 60 ) {
        setTheme(defaultTheme2)
      } 
      else {
        if (theme.typography.fontSize !== 14) {
          setTheme(defaultTheme)
        }
      }
      setData({
        Name: "",
        Surname: "",
        DateOfBirthd: "",
        ContinentId: 0,
      })
      return getPersons()
      .then(p => setPersons(p))
      .catch(e => console.log(e)) 
    })
    .catch(e => console.log(e))
  }



  const handleChangeName = (evt: string) => {
    if(evt.length > 100) return
    setData(prev => ({
      ...prev,
      Name: evt,
    }));
  };
  
  const handleChangeSurname = (evt: string) => {
    if(evt.length > 100) return
    setData(prev => ({
      ...prev,
      Surname:  evt,
    }));
  };
  
  const handleChangeDateOfBirth = (evt: string) => {
    setData(prev => ({
      ...prev,
      DateOfBirthd: evt,
    }));
  };
  
  const handleChangeContinentId = (evt: number) => {
    setData(prev => ({
      ...prev,
      ContinentId: Number(evt)
    }));
  };
  
  useEffect(() => {setIsValidName(!!data.Name.length)}, [data.Name] )
  useEffect(() => {
    if(data.ContinentId === europeId && String(data.Surname).length < 2) {
      setShowUnderSelectCommunicat(true)
    } else {
      setShowUnderSelectCommunicat(false)
    }
  }, [data])
  useEffect(() => {
      getPersons()
      .then(p => setPersons(p))
      .catch(e => console.log(e)) 
  }, [])
  useEffect(() => {

  }, [data.DateOfBirthd] )

  useEffect(() => {
    getContinents().then(res => {
      setContinents(res)
      if(Array.isArray(res)) {
        const europe = res.find(i => i.Code === "EU")
        if (europe) setEuropeId(Number(europe?.ContinentId))
      }
    })
  }, [])



  return (
    <>
      <ThemeProvider theme={theme}>

      <div className="border-solid border-2 rounded-sm	 border-cyan-600">
        <Box>
          <Typography variant="h6" align="left" m={2} >
            Utwórz nowego użytkownika
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" className="flex">
          <FormControl fullWidth>
            <InputComponent
              setState={handleChangeName}
              state={data?.Name || ""}
              placeholder='Wpisz imię...'
              isValid={isValidName}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputComponent
              setState={handleChangeSurname}
              state={data?.Surname || ""}
              placeholder='Wpisz nazwisko...'
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" className="flex" m={2}> 
            <InputComponent
              setState={handleChangeDateOfBirth}
              state={data?.DateOfBirthd || ""}
              placeholder='Wybierz datę urodzenia'
              type="date"
            />
          {continents && (
            <Dropdown
              setState={handleChangeContinentId}
              state={data?.ContinentId || 0}
              data={new Map(continents.map(i => [i.ContinentId, i.Name]))}
              placeholder='Wybierz kontynent'
              showHelper={showUnderSelectCommunicat}
              helperText='"Nie spełnione kryteria'
            />
          )}
          <Button
            variant="contained"
            color="info"
            size="large"
            disabled={!enableToSave}
            onClick={postUser}
          >
            Wyślij
          </Button>
        </Box>
      </div>

        <Box display="flex" justifyContent="space-between" alignItems="center" className="flex" m={2}> 
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={deleteAll}
          >Usuń wszystkich</Button>
        </Box>

    <div>
      <PersonTable
        persons={persons}
        setChosedItem={handleChangeChoice}
        chosedItem={chosedItem}
        deleteFunction={deleteByPK}
      />
    </div>
    </ThemeProvider>
    </>
  )
}

export default App
