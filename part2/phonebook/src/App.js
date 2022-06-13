import { useCallback, useEffect, useState } from 'react'
import contactService from './services/contacts'
import axios from 'axios'
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

useEffect(() => {
  contactService
    .getAll()
    .then(contacts => {
      setPersons(contacts)
    })
},[])

const notify = (message, type='info') => {
  setNotification({message, type})
  setTimeout(() => {
    setNotification(null)
  }, 3001)
}

const addName = (e) =>{
  e.preventDefault()
  console.log('button clicked', e.target)
  const nameObj = {
    id: persons.length + 1, name: newName, number: newNumber 
  }
  const existingPerson = persons.find(p => p.name === newName )
    if(existingPerson){
      const ok = window.confirm(`${existingPerson.name} is already in the phonebook, update number?`)
      if (ok) {
          contactService.update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(savedPerson => {
            console.log(savedPerson)
            notify(`updated info of ${savedPerson.data.name}`)
          })
          .catch(error => {
            console.error(error)
            notify(
              `the person ${existingPerson.name} had already been removed`, 'alert'
            )
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
          return 
      }
    }
    contactService.create(nameObj).then(savedPerson => {
      
      setPersons(persons.concat(savedPerson))
      console.log(persons)
      // notify(`added ${savedPerson.name}`)
    })

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
}

const filteredContacts = persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
        return <ContactInfo key={person.id} deleteInfo={deleteInfo} person={person}/>
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

const Notification = ({notification}) => {
  if (notification === null){
    return null
  }

  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return(
    <div style={style}>
      {notification.message}
    </div>
  )

}

export default App