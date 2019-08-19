import React, { Component } from "react";
//notification this has been removed......... we're using snackbar component from material UI look below
// import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
//table
import ReactTable from "react-table";
import 'react-table/react-table.css';
//pop up alert
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
//export csv
import {CSVLink} from "react-csv";
//material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
//import AddCar Component
import AddCar from "./AddCar";
//
import {SERVER_URL} from "../constant";

class Carlist extends Component{

    constructor(props){
        super(props);
        this.state= {cars : [], open: false, message:''};
    };

    componentDidMount(){
        this.fetchCars();
    }

    //get all cars
    fetchCars= ()=>{
        //for reading token from session storage (web browser)
        //and include it to authorization header
        const token= sessionStorage.getItem("jwt");
        fetch(SERVER_URL+'api/cars',
            {
                headers: {'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    //embeded dari response api spring. cek response
                    cars: responseData._embedded.cars,
                });
                console.log('fetchCars executed (App.js) ~abu');
            })
            .catch(err => console.error(err));
    };

    //AddCar
    addCar(car){
        const token= sessionStorage.getItem('jwt');
        fetch('http://localhost:8080/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : token
            },
            body: JSON.stringify(car)
        })
            .then(res => this.fetchCars())
            .catch(err=> console.error(err));
    }

    //handleClose Snackbar function
    handleClose= (event, reason)=> {
        this.setState({open:false});
    };

    // Popup message confirm delete
    confirmDelete= (link) => {
        confirmAlert({
            message: 'Are you sure to delete?',
            buttons:[
                {
                    label: 'Yes',
                    onClick: () => this.onDelClick(link)
                },
                {
                    label: 'No',
                }
            ]}
        )
    };


    //delete car
    onDelClick=(link) => {
        const token= sessionStorage.getItem('jwt');
        fetch(link, {method: 'DELETE', headers : {'Authorization': token}})
        //when success excute fetchCars again without user refresh
        //using without popup message
        //when success
        // .then(res => this.fetchCars())
        //when error
        // .catch(err => console.log(err))

        //using toaster notification pop-up when delete
        //when success
        //     .then(res => {
        //         toast.success("Car deleted ", {
        //             position: toast.POSITION.BOTTOM_LEFT
        //         });
        //         //refresh table
        //         this.fetchCars();
        //     })
        //     //when error catch it. dont using 'then again' :(
        //     .catch(err => {
        //         toast.error("Error when deleting",{
        //             position: toast.POSITION.BOTTOM_LEFT
        //         });
        //         console.error(err)
        //     })

        //using SnackBar message
            .then(res => {
                this.setState({open:true, message:'Car Deleted'});
                this.fetchCars();
            })
            .catch(err => {
                this.setState({open:true, message:'Error when deleting'});
                console.error(err)
            })

    };

    //edit function
    renderEditable = (cellinfo)=>{
        return(
            <div style={{backgroundColor: "#fafafa"}}
                 contentEditable
                 suppressContentEditableWarning
                 onBlur={e => {
                     const data= [...this.state.cars];
                     data[cellinfo.index][cellinfo.column.id]= e.target.innerHTML;
                     this.setState({cars: data})
                 }}
                 dangerouslySetInnerHTML={{
                     __html: this.state.cars[cellinfo.index][cellinfo.column.id]
                 }}
            />

        )
    };

    //to update edited table
    updateCar(car, link){
        const token= sessionStorage.getItem('jwt');
        fetch(link,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(car)
        })
            // .then(res =>
            //     toast.success("Changes saved", {
            //         position: toast.POSITION.BOTTOM_LEFT
            //     })
            // )
            // .catch(err =>
            //     toast.error("Error when saving", {
            //         position: toast.POSITION.BOTTOM_LEFT
            //     })
            // )

            //using snackbar
            .then(rest =>
                this.setState({open:true, message: 'Changes saved'})
            )
            .catch(err=>
                this.setState({open:true,message:'Error when saving'})
            )
    }



    render(){
        const columns =[
            {
                Header: 'Brand',
                accessor: 'brand',
                Cell: this.renderEditable
            }, {
                Header: 'Model',
                accessor:'model',
                Cell: this.renderEditable
            },{
                Header: 'Color',
                accessor: 'color',
                Cell: this.renderEditable
            },{
                Header: 'Year',
                accessor:'year',
                Cell: this.renderEditable
            },{
                Header: 'Price $',
                accessor: 'price',
                Cell: this.renderEditable
            },{
                id:'savebutton',
                sortable:false,
                filterable:false,
                width: 100,
                accessor:'_links.self.href',
                Cell:({value, row }) =>
                    // (<button onClick={() => this.updateCar(row, value)}>Save</button>)
                    (<Button size="small" variant="primary" onClick={() => {this.updateCar(row, value)}}>
                        Save
                    </Button>)
            },{
                id:'delbutton',
                sortable:false,
                filterable: false,
                width: 100,
                //_links.self.href from json response backend
                accessor: '_links.self.href',
                Cell: ({value}) =>
                    // (<button onClick={() => {this.confirmDelete(value)}}> Delete</button>)
                    (<Button size="small" variant="flat" color="secondary" onClick={() => {this.confirmDelete(value)}}>
                        Delete
                    </Button> )
            }
        ]
        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddCar addCar={this.addCar} fetchCars={this.fetchCars}/>
                    </Grid>
                    <Grid item style={{padding:20}}>
                        <CSVLink data={this.state.cars} separator=";">Export to CSV</CSVLink>
                    </Grid>
                </Grid>
                <ReactTable data={this.state.cars} columns={columns} filterable={true} pagesize={10}/>
                <Snackbar style={{width: 300, color: 'green'}} open={this.state.open} onClose={this.handleClose}
                          autoHideDuration={1500} message={this.state.message}/>
                {/*<ToastContainer autoClose={1500}/>*/}
            </div>
        )
    }

}

export default Carlist;
