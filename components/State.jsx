import React from 'react';
import City from './City.jsx';

class State extends React.Component {

   constructor() {
      super();
		
      this.state = {
         states: [],
         stateId: ""
      }

      fetch('http://localhost:8081/states',
         {  
            method: 'GET',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            }
      })
      .then(result => {
            return result.json();
      })
      .then(data => {
         this.state.states = data;
         this.forceUpdate();
      })

      this.change = this.change.bind(this);

   }

   change(val){
      this.state.stateId = val.target.value;
      this.forceUpdate();
   }

   render() {
      return (
         <div>
            <h1>TP: 3</h1>
            <label>Estado</label>
            <select onChange={this.change}>{this.state.states.map(x => <option value={x.id} key={x.id}>{x.name}</option>)}</select>
            <City  stateId={this.state.stateId} />
         </div>
      );
   }
}



export default State;