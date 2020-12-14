import React,{Component} from 'react';
import {connect, ReactReduxContext} from 'react-redux';
import firebase from 'firebase';
import TaskData from './TaskData';
import Lib from "../static/address_lib";
import Router from 'next/router';


class DataItem extends Component
{
    tdstyle={
        fontSize:"12pt",
        padding:"5px 20px"
    }

    trstyle={
        height:"30",
        margin:"5px",
    }
    constructor(props)
    {
        super(props);

        this.state=
        {
            themes:this.props.themes,
            starttime:this.props.starttime,
            worktime:this.props.worktime,
            memo:this.props.memo,
        }


    }

    render()
    {
        return(
            <tr key={this.starttime} style={this.trstyle}>
                        <td style={this.tdstyle}>{this.state.themes.join(",")}</td>
                        <td style={this.tdstyle}>{this.state.worktime}</td>
                        <td style={this.tdstyle}>{this.state.starttime}</td>
                        <td style={this.tdstyle}>{this.state.memo}</td>
                </tr>
        );
    }
}


export default DataItem;