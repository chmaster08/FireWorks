import React,{Component} from 'react';
import {connect, ReactReduxContext} from 'react-redux';
import firebase from 'firebase';
import TaskData from './TaskData';
import Lib from "../static/address_lib";
import Router from 'next/router';
import DataItem from './DataItem';



class DataGrid extends Component
{
    constructor(props)
    {
        super(props);
        if(this.props.login==false)
        {
            Router.push("/");
        }
        this.state=
        {
            dom:[],
        }

        this.datalist=[];
        this.onRefreshTable=this.onRefreshTable.bind(this);
        this.updateDataTable=this.updateDataTable.bind(this);
        this.setDataList=this.setDataList.bind(this);
        // this.updateDataTable();
        console.log("end constructor");
 
    }

    updateDataTable()
    {
        let email=Lib.encodeEmail(this.props.email);
        let db=firebase.database();
        let ref=db.ref('FireWorks/'+Lib.encodeEmail(this.props.email)+'/WorkDataList');
        let self=this;
        ref.on("value",(snapshot)=>{
            let d=Lib.deepcopy(snapshot.val());
            console.log(d);
            if(d!=null)
            {
                this.setDataList(d);
            }
            });
        console.log(this.datalist);
        
    }

    getTagDOM(themes)
    {
        let ret=[];
        for(let i in themes)
        {
            ret.push(themes[i]);
        }
        return ret.join(',');
    }

    setDataList(data)
    {
        let domlist=[];
        for(let i in data)
        {
            console.log(i);
            console.log(data[i]);
            domlist.push(
                <DataItem themes={data[i].themes} starttime={data[i].starttime} worktime={data[i].worktime} memo={data[i].memo}/>
            );
        }
        this.setState({dom:domlist});
    }

    onRefreshTable(e)
    {
        this.datalist=[];
        this.updateDataTable();
    }

    componentWillMount()
    {
        this.updateDataTable();
        console.log("before render");
    }
    render()
    {
        console.log("renderrrr");
        return(
            <div>
                <button onClick={this.onRefreshTable}>refresh</button>
            <table>
                <tbody>
                    {this.state.dom}
                </tbody>
            </table>
            </div>
            
        );
    }
}


export default connect((state)=>state)(DataGrid);