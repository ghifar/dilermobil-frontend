import React, {Component} from "react";
import SkyLight from "react-skylight";

//material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class AddCar extends Component{

    constructor(props){
        super(props);
        this.state={brand: '', model:'', year:'', color:'', price:''};
    }

    // handle field form
    handleChange= (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    //button event save car and close  modal form
    handleSubmit = (event) =>{
      event.preventDefault();
      var newCar= {brand: this.state.brand, model: this.state.model,
      year:this.state.year, color:this.state.color, price: this.state.price};

      this.props.addCar(newCar);
      this.refs.addDialog.hide();
    };

    //button cancel event to close modal form
    cancelSubmit= (event) =>{
        event.preventDefault();
        this.refs.addDialog.hide();
    };

    render() {
        return(
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New Car</h3>
                    <form>
                        {/*<input type="text" placeholder="Brand" name="brand" onChange={this.handleChange} />*/}
                        <TextField label="Brand" placeholder="Brand" name="brand" onChange={this.handleChange}/>
                        <br/>
                        <TextField label="Model" placeholder="Model" name="model" onChange={this.handleChange}/>
                        <br/>
                        <TextField label="Color" placeholder="Color" name="color" onChange={this.handleChange}/>
                        <br/>
                        <TextField label="Year" placeholder="Year" name="year" onChange={this.handleChange}/>
                        <br/>
                        <TextField label="Price" placeholder="Price" name="price" onChange={this.handleChange}/>
                        <br/>
                        <br/>
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button>
                        {/*default button from react, we're using Button from material above*/}
                        {/*<button onClick={this.handleSubmit}>Submit</button>*/}
                        {/*<button onClick={this.cancelSubmit}>Cancel</button>*/}
                    </form>
                </SkyLight>
                <div>
                    <Button variant="raised" color="primary" style={{'margin' : '10px'}}
                            onClick={() =>this.refs.addDialog.show()}>New Car</Button>
                    {/*<button style={{'margin': '10px'}} onClick={() =>*/}
                    {/*    this.refs.addDialog.show()}>New Car*/}
                    {/*</button>*/}
                </div>
            </div>
        );
    }

}
export default AddCar;