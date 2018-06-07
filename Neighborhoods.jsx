import React from 'react';

class Neighborhoods extends React.Component {

   constructor(props) {
      super(props);
		
      this.state = {
         neighborhoods: []
      }

      this.getNeighborhoods(this.props.cityId);
      this.change = this.change.bind(this);

   };

   getNeighborhoods(id){
      if (id.length > 0 ){
      fetch('http://localhost:8081/neighborhoods/'+id,
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
         this.state.neighborhoods = data;
         this.forceUpdate();
      })
   }else {
      this.state.neighborhoods = [];
      this.forceUpdate();
   }
   }

   change(val){
      console.log(val.target.value);
   }

   shouldComponentUpdate(newProps, newState) {
      this.getNeighborhoods(newProps.cityId);
      return true;
   }

   render() {
      return (
         <div>
             <label>Barrio</label>
            <select onChange={this.change}>{this.state.neighborhoods.map(x => <option value={x.id} key={x.id}>{x.name}</option>)}</select>
         </div>
      );
   }
}



export default Neighborhoods;