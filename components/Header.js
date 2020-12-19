import React,{Component} from 'react';
import Link from "next/link";
import Account from './Account';
import Router from 'next/router';
import { Button, InputLabel } from '@material-ui/core';
import style from '../static/Style';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { route } from 'next/dist/next-server/server/router';




class Header extends Component
{
    headerStyle=
    {
        alignItems:"center",
        margin:"0 auto",
    }

    constructor(props)
    {
        super(props);
        this.login=this.login.bind(this);
        this.useStyles=this.useStyles.bind(this);
        this.classes=this.useStyles();
        this.state=
        {
            currentpage:"",
        }
    }

    login()
    {
        Router.push("/workrecorder");
    }

    useStyles()
    {
        return makeStyles({
            root: {
              flexGrow: 1,
            },
          });
    }

    onHandleEvent(event,newValue)
    {
        switch(newValue)
        {
            case 0:
                Router.push("/workrecorder");
                break;
            case  1:
                Router.push('/datalist');
                break;
            case 2:
                Router.push("/analize");
                break;
            default:
                break;
        }
    }

    render()
    {
        return(
            <Paper className={this.classes.root}>
                <Account onLogined={this.login}/>
                <Tabs
                    value={this.state.currentpage}
                    onChange={this.onHandleEvent}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Record" />
                    <Tab label="datalist" />
                    <Tab label="analize" />
                </Tabs>
            </Paper>
            
        );
    }
}

export default Header;