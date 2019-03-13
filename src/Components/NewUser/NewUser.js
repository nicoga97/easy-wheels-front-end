import {Component} from "react";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import user from "../Images/user.svg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";
import "./NewUser.css"

class NewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", password: "", confirmPassword: "", doRedirect: false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.confirmPassword === this.state.password) {
            if (localStorage.getItem(this.state.username) === null) {
                this.createUser();
                this.setState({name: "", email: "", password: "", confirmPassword: ""});
                this.setState({doRedirect: true})
            } else {
                alert("User with selected username already exists");
            }
        } else {
            alert("The password and the confirmation do not make match")
        }
    }

    createUser() {
        const info = {
            "name": this.state.name,
            "email": this.state.email
        };
        const user = {
            "username": this.state.username,
            "password": this.state.password
        };
        localStorage.setItem(this.state.username, JSON.stringify(info));
        const usersCache = localStorage.getItem("users");
        let users;
        if (usersCache)
            users = [...JSON.parse(usersCache), user];
        else users = [user];
        localStorage.setItem("users", JSON.stringify(users))
    }

    render() {
        return (
            <>
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Registration</Typography>
                    <img src={user} alt="user" className="img"/>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField required label="Full name" fullWidth
                                   onChange={event => this.setState({name: event.target.value})}/>
                        <TextField required label="Email" fullWidth
                                   onChange={event => this.setState({email: event.target.value})}/>
                        <TextField required label="Username" fullWidth
                                   onChange={event => this.setState({username: event.target.value})}/>
                        <TextField required label="Password" type="password" fullWidth
                                   onChange={event => this.setState({password: event.target.value})}/>
                        <TextField required label="Confirm password" type="password" fullWidth
                                   onChange={event => this.setState({confirmPassword: event.target.value})}/>
                        <br/><br/>
                        <Button type="submit" color="primary" variant="contained" fullWidth>
                            Create account
                        </Button>
                        {this.state.doRedirect && <Redirect to={"/"}/>}
                    </form>
                </Paper>
            </>
        );
    }
}

export default NewUser;
