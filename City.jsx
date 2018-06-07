import React from 'react';
import Neighborhoods from './Neighborhoods.jsx'

class City extends React.Component {

   constructor(props) {
      super(props);
		
      this.state = {
         cities: [],
         cityId: ""
      }

      this.getCities(this.props.stateId);
      this.change = this.change.bind(this);

   };

   getCities(id){
      if (id.length > 0 ){
      fetch('http://localhost:8081/cities/'+id,
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
         this.state.cities = data;
         this.state.cityId = "";
         this.forceUpdate();
      })
   }
   }

   change(val){
      this.state.cityId = val.target.value;
      this.forceUpdate();
   }

   shouldComponentUpdate(newProps, newState) {
      this.getCities(newProps.stateId);
      return true;
   }

   render() {
      return (
         <div>
            <label>Ciudad</label>
            <select onChange={this.change}>{this.state.cities.map(x => <option value={x.id} key={x.id}>{x.name}</option>)}</select>
            <Neighborhoods  cityId={this.state.cityId} />
         </div>
      );
   }
}



export default City;