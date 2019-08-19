import React, {Component} from "react";
import {SERVER_URL} from "../constant";
import Carlist from "./Carlist";
//Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";



class Login extends Component{

    constructor(props){
        super(props);
        this.state = {username : '', password:'', isAuthenticated: false, open: false};
    }

    handleClose= (event)=>{
        this.setState({open:false});
    };

    handleChange = (event) =>{
        this.setState({[event.target.name] :
                event.target.value});
    };

    logout= () =>{
        sessionStorage.removeItem("jwt");
        this.setState({isAuthenticated:false});
    };

    login = () =>{
        const user=  {username: this.state.username, password: this.state.password};
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken= res.headers.get('Authorization');
                if (jwtToken != null){
                    sessionStorage.setItem("jwt", jwtToken);
                    this.setState({isAuthenticated: true})
                }else{
                    this.setState({open: true});
                }
            })
            .catch(err => console.error(err))
    };

    render() {
        if(this.state.isAuthenticated === true) {
            return (<Carlist/>);
        }
        else{
            return(
                <div>
                    <TextField name="username" placeholder="Username"
                               onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <TextField type={"password"} name="password" placeholder="Password"
                               onChange={this.handleChange} />
                    <br/>
                    <br/>
                    <Button variant="raised" color="primary"
                            onClick={this.login}>
                        Login
                    </Button>
                    <Snackbar open={this.state.open} onClose={this.handleClose} autoHideDuration={1500} message={"Username or Password is wrong"}/>
                </div>
            );
        }
    }
}

export default Login;