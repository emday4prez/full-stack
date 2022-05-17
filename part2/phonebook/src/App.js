import { useEffect, useState } from 'react'
import axios from 'axios'

const Search = ({filter, handleFilterChange}) => {
  return (
    <>
      find <input value={filter} onChange={handleFilterChange}/>
    </>
  )
}

const Contacts = ({filteredContacts}) => {
  return(
    <>
      <h2>Numbers</h2>
      {filteredContacts.map(person => {
        return <ContactInfo key={person.name}  person={person}/>
      })}
    </>
  )
}

const ContactInfo = ({person}) => {
  return(
    <>
      <p key={person.id}>{person.name} - {person.number}</p>
    </>
  )
}


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

const addName = (e) =>{
  e.preventDefault()
  console.log('button clicked', e.target)
  const nameObj = {
    name: newName, number: newNumber, id: persons.length + 1
  }
  const isFound = persons.some(element => {
    if (element.name === newName){
      return true
    }
    return false;
  })
    if(isFound){
      alert(`${newName} is already in the phone book`)
      setNewName('')
    }else{
      setPersons(persons.concat(nameObj))
  setNewName('')
  setNewNumber('')
    }
}

const handleNameChange = (e) => {
  setNewName(e.target.value)
}

const handleNumberChange = (e) => {
  setNewNumber(e.target.value)
}
const handleFilterChange = (e) => {
  setFilter(e.target.value)
  console.log(filter)
 
}

const filteredContacts = persons.filter((person) => {
  return person.name.toLowerCase().includes(filter) 
})

  return (
    <div>
      <h2>Phonebook</h2>
      <h4>-------------------------------------</h4>
      <Search onChange={handleFilterChange} filter={filter}/>
      <h4>-------------------------------------</h4>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
     <Contacts filteredContacts={filteredContacts}/>
      
    </div>
  )
}

export default App