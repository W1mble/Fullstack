import React, { useState, useEffect } from "react"
import personService from "./services/persons"
import Error from './components/Error'
import Success from './components/Success'

const ShowAllPersons = ({ persons, filterName, deletePerson }) => {
  if (filterName === "") {
    return (
      <>
        {persons.map(({ name, number }) => (
          <p key={name}>
            {" "}
            {name} {number}{" "}
            {
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${name}?`)) {
                    deletePerson(name)
                  }
                }}
              >
                Delete
              </button>
            }
          </p>
        ))}
      </>
    )
  }
  return (
    <>
      <FindPerson
        persons={persons}
        filterName={filterName}
        deletePerson={deletePerson}
      />
    </>
  )
}

const Filter = ({ filterName, handleFilterPersonChange }) => {
  return (
    <>
      Filter shown with{" "}
      <input value={filterName} onChange={handleFilterPersonChange} />
    </>
  )
}

const FindPerson = ({ persons, filterName, deletePerson }) => {
  let result = persons.filter((personObject) =>
    personObject.name.toLowerCase().includes(filterName.toLowerCase())
  )
  return (
    <>
      {result.map(({ name, number }) => (
        <p key={name}>
          {" "}
          {name} {number}{" "}
          {
            <button
              onClick={() => {
                if (window.confirm(`Delete ${name}?`)) {
                  deletePerson(name)
                }
              }}
            >
              Delete
            </button>
          }
        </p>
      ))}
    </>
  )
}

const PersonForm = ({
  addName,
  newName,
  handlePersonChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div className="name">
        Name: <input pattern="[a-zA-Z äåöÄÖÅ]+$" value={newName} onChange={handlePersonChange} />
      </div>
      <div className="number">
        Number: <input pattern="[0-9]*" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add person</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [filterName, setFilterName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const timeout = 2500

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: newName.trim(),
    }

    if (
      !persons.find(({ id }) => id === personObject.id) &&
      newNumber !== "" &&
      newName !== ""
    ) {
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
          setSuccessMessage(
            `Person '${newName}' was successfully added!`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, timeout)
        })
        .catch((error) => {
          setErrorMessage(
            `Can't create person!`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, timeout)
        })
    } else if (newNumber !== "" && newName !== "")  {
        if (window.confirm(`Update ${newName}?`)) {
          updatePerson(newName)
          setNewName("")
          setNewNumber("")
        }
    } else {
      window.alert("Name or number can't be empty!")
    }
  }

  const deletePerson = (id) => {
    personService
      .deleteperson(id)
      .then(() => {
        const copy = persons.filter((item) => item.id !== id)
        setPersons(copy)
        setSuccessMessage(
          `Person '${id}' was successfully deleted!`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, timeout)
      })
      .catch((error) => {
        setErrorMessage(
          `Person '${newName}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, timeout)
      })
  }

  const updatePerson = (id) => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setSuccessMessage(
          `Person '${newName}' was successfully updated!`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, timeout)
      })
      .catch(error => {
        setErrorMessage(
          `Persons '${newName}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, timeout)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterPersonChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Error message={errorMessage} />
      <Success message={successMessage} />
      <Filter
        filterName={filterName}
        handleFilterPersonChange={handleFilterPersonChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ShowAllPersons
        persons={persons}
        filterName={filterName}
        deletePerson={deletePerson}
      />
    </>
  )
}

export default App
