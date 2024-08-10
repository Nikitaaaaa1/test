import {useEffect, useState } from 'react'
import { Box, Button, Snackbar, SnackbarCloseReason } from '@mui/material'
import './App.css'
import {createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles"
import PersonTable from './views/PersonTable'
import Continent from './core/types/T_Country'
import getContinents from './core/UseCases/getContinents'
import moment from 'moment'
import getPersons from './core/UseCases/getPersons'
import Person from './core/Person'
import deleteAllPersons from './core/UseCases/deletePersons'
import T_NewPerson from './core/types/T_NewPerson'
import NewUser from './views/NewUser'
import postUser from './core/UseCases/postPerson'



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
  const [hideUnderInputNameCommunicat, setShowUnderInputNameCommunicat] = useState<boolean>(true)
  const [persons, setPersons] = useState<Person[] | null>([])
  const [enableToSave, setEnableToSave] = useState<boolean>(false)
  const [chosedItem, setChosedItem] = useState<number | null>(null)
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T_NewPerson>( {
    Name: "",
    Surname: "",
    DateOfBirthd: "",
    ContinentId: -1,
  })

  useEffect(() => {
    (Number(moment.duration(moment().diff(moment(data?.DateOfBirthd)))) < 0)
    ? setEnableToSave(false)
    : setEnableToSave(true)
  }, [data.DateOfBirthd])

  const deleteAll = () => {
    deleteAllPersons()
    .then(() => {
      return getPersons()
      .then(p => setPersons(p.map(i => new Person(i))))
      .catch(e => console.log(e)) 
    })
    .catch(e => console.log(e))
  }
  const deleteByPK = (i: Person) => {
    i.delete()
    .then(() => {
      return getPersons()
      .then(p => setPersons(p.map(i => new Person(i))))
      .catch(e => console.log(e)) 
    })
    .catch(e => console.log(e))
  }

  const handleCloseAlert = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const changeTheme = () => {
    const m = moment(data.DateOfBirthd) 
    if (m.isValid() && moment.duration(moment().diff(m)).asYears() > 60 ) {
      setTheme(defaultTheme2)
    } 
    else {
      if (theme.typography.fontSize !== 14) {
        setTheme(defaultTheme)
      }
    }
  }

  const handleChangeChoice = (id: number) => {
    if (chosedItem === id) return setChosedItem(null)  
    setChosedItem(id)
  }
  const handleSubmit = () => {
    postUser(
      data,
      setData,
      setPersons,
      changeTheme,
      europeId,
      setShowUnderInputNameCommunicat
    )
    setOpen(true)
  }



  
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
      .then(p => setPersons(p.map(i => new Person(i))))
      .catch(e => console.log(e)) 
  }, [])

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
        <NewUser
          data={data}
          setData={setData}
          continents={continents}
          enableToSave={enableToSave}
          postUser={handleSubmit}
          isValidName={isValidName}
          showUnderSelectCommunicat={showUnderSelectCommunicat}
          hideUnderInputNameCommunicat={hideUnderInputNameCommunicat}
        />
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
        deleteByPK={deleteByPK}
      />
    </div>

    <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        message="Sukces"
      />
    </ThemeProvider>
    </>
  )
}

export default App
