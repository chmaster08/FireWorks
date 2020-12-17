import React,{Component} from 'react';
import Link from "next/link";
import Account from './Account';
import Router from 'next/router';
import { Button, InputLabel } from '@material-ui/core';
import style from '../static/Style';
import Container from '@material-ui/core/Container';




class Header extends Component
{
    headerStyle=
    {
        alignItems:"center",
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
                {style}
                <Container>
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
                </Container>
            </header>
        );
    }
}

export default Header;