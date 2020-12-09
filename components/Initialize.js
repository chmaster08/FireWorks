import React,{Component} from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import firebase from 'firebase';
import Lib from '../static/address_lib';
import Account from '../components/Account';


class Initialize extends Component
{
    constructor(props)
    {
        super(props);
        this.login=this.login.bind(this);

    }

    login()
    {
        console.log("Log in Success");
        Router.push("/workrecorder");
    }

    logout()
    {
        console.log("Logouted");
    }

    render()
    {
        return(
            <Account onLogined={this.login} onLogouted={this.logout}/>
        );
    }

}

export default connect((state)=>state)(Initialize);

