import { useState } from 'react';
import Filter from './compoments/Filter';
import PersonForm from './compoments/PersonForm';
import Person from './compoments/Person';
import Persons from './compoments/Persons';

const App = () => {
  //const [persons, setPersons] = useState([{ name: 'Arto Hellas' } ]); 
  // Test data
  const [persons, setPersons] = useState([ 
    { name: 'Arto Hellas', number: '040-123456' }, 
    { name: 'Ada Lovelace', number: '39-44-5323523' }, 
    { name: 'Dan Abramov', number: '12-43-234345' }, 
    { name: 'Mary Poppendieck', number: '39-23-6423122' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Handle submit: ', newName);

    // Check is name already in list? 
    const nameExists = persons.some(person => person.name === newName);

    if (nameExists) 
    { 
      alert(`${newName} is already added to phonebook`);
       return; 
    }

    const nameObject = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(nameObject));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    console.log('handleNameChange is: ', event.target.value);
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => { 
    console.log('handleNumberChange: ', event.target.value);
    setNewNumber(event.target.value); 
  }
  const handleFilterChange = (event) => {
     console.log('handleFilterChange, ', event.target.value);
    setFilter(event.target.value);
  }
  // case-insensive filter 
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
       <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange} 
          handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App;