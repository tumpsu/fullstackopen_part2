import { useState } from 'react';

const App = () => {
  //const [persons, setPersons] = useState([{ name: 'Arto Hellas' } ]); 
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
         <div>
        filter shown with: 
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h3>Add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
         <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {
      personsToShow.map((person, i) => (
        <div key={i}>{person.name}, phone number: {person.number}</div>
      ))}
    </div>
  )
}

export default App;