import React,{Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

class Account extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            loading:false,
            email:"",
            password:"",
        }

        this.login_check=this.login_check.bind(this);
        this.login=this.login.bind(this);

    }
    getInitialState()
    {
        return ()=>this.login_check();
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
    }

    componentDidMount()
    {
        this.login_check();
        console.log("componentDidMount");
    }


    render()
    {
        return(
            <div>
                <button onClick={this.login_check}>Login</button>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}
Account=connect((state)=>state)(Account);
export default Account;