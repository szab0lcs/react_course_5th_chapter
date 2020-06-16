import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
class App extends Component {
  state = {
    persons: [
      {id: 'asd1', name: 'Max', age: 28},
      {id: 'asf1', name: 'John', age: 25},
       {id: 'afe11', name: 'Jack', age: 20}
     ],
     showPersons: false
   }

   nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    const person = {
      ...this.state.persons[personIndex]
    }
    // const person = Object.assign({}, this.state.persons[personIndex]); -- ALTERNATIVE

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    //  const persons = this.state.persons.slice(); - ALTERNATIVE
    const persons = [...this.state.persons];
     persons.splice(personIndex, 1);
     this.setState({persons: persons});
   }

   togglePersonsHandler = () => {
    const doesShow =this.state.showPersons;
    this.setState({showPersons: !doesShow});
   }

   render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid black',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)} 
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => {
                return this.nameChangedHandler(event, person.id);
              }}/>
          })}
        </div>
      );
      style.backgroundColor = 'red';
    
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }


     return (
       <div className="App">
        <h1>It's a React app.</h1>
        <p className={classes.join(' ')}>version 1.0</p>
        <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    //return React.createElement( 'div',{className:'App'},React.createElement( 'h1', null,'Does this work?'))
  }
}
export default App;