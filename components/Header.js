import React,{Component} from 'react';
import Link from "next/link";
import Account from './Account';
import Router from 'next/router';
import { Button, InputLabel } from '@material-ui/core';



class Header extends Component
{
    headerStyle=
    {
        width:"auto",
        height:"50",
    }

    constructor(props)
    {
        super(props);
        this.login=this.login.bind(this);
    }

    login()
    {
        Router.push("/workrecorder");
    }

    render()
    {
        return(
            <header style={this.headerStyle}>
                <div>
                    <p>{this.props.header}</p>
                    <Account onLogined={this.login}/>
                    <Link href="/workrecorder">
                        <Button variant="contained">Record</Button>
                    </Link>
                    <Link href="/datalist">
                        <Button variant="contained">datalist</Button>
                    </Link>
                    <Link href="/analize">
                        <Button variant="contained">analize</Button>
                    </Link>
                </div>
                <h1>{this.props.title}</h1>
            </header>
        );
    }
}

export default Header;