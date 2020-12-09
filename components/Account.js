import React,{Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

class Account extends Component
{
    constructor(props)
    {
        super(props);
        this.login_check=this.login_check.bind(this);
    }

    login()
    {
        let provider=new firebase.auth.GoogleAuthProvider();
        var self=this;
        firebase.auth().signInWithPopup(provider)
        .then((result)=>{
            this.props.dispatch({
                type:"UPDATE_USER_INFO",
                value:{
                    login:true,
                    username:result.user.displayName,
                    email:result.user.email,
                }
            })
            this.props.onLogined();
            console.log(result);
        });
    }

    logout()
    {
        console.log("Log out");
        firebase.auth().signOut();
        this.props.dispatch({
            type:"UPDATE_USER_INFO",
            value:{
                    login:false,
                    username:"Sign in",
                    email:"",
                }
        });
        this.props.onLogouted();
    }

    login_check()
    {
        if(this.props.login==false)
        {
            this.login();
        }
        else
        {
            this.logout();
        }
    }

    render()
    {
        return(
            <button onClick={this.login_check}>Login</button>
        );
    }
}
Account=connect((state)=>state)(Account);
export default Account;