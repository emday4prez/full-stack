import { useEffect, useState } from 'react'
import contactService from './services/contacts'




const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
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
      contactService
        .create(nameObj)
        .then(response => {
          setPersons(persons.concat(nameObj))
          setNewName('')
          setNewNumber('')
        })
      
    }
}

const deleteInfo = (id) => {
  
  contactService
    .deleteContact(id)
  setPersons(persons.filter(person => person.id !== id))
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
      <Search handleFilterChange={handleFilterChange} filter={filter}/>
      <h4>-------------------------------------</h4>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
     <Contacts filteredContacts={filteredContacts} deleteInfo={deleteInfo}/>
      
    </div>
  )
}





const Search = ({filter, handleFilterChange}) => {
  return (
    <>
      find <input value={filter} onChange={handleFilterChange}/>
    </>
  )
}

const Contacts = ({filteredContacts, deleteInfo}) => {
  return(
    <>
      <h2>Numbers</h2>
      {filteredContacts.map(person => {
        return <ContactInfo key={person.name} deleteInfo={deleteInfo} person={person}/>
      })}
    </>
  )
}

const ContactInfo = ({person, deleteInfo}) => {
  return(
    <>
      <p key={person.id}>{person.name} - {person.number}<button onClick={() => deleteInfo(person.id)}>delete</button></p>
    </>
  )
}

export default App