import React,{Component} from 'react';
import {connect, ReactReduxContext} from 'react-redux';
import firebase from 'firebase';
import TaskData from './TaskData';
import Lib from "../static/address_lib";
import Router from 'next/router';
import DataItem from './DataItem';
import { DataGrid } from '@material-ui/data-grid';
import { Container } from 'next/app';
import  MediaQuery from "react-responsive";



class DataGridComp extends Component
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
            rows:[],
        }

        this.datalist=[];
        this.onRefreshTable=this.onRefreshTable.bind(this);
        this.updateDataTable=this.updateDataTable.bind(this);
        this.setDataList=this.setDataList.bind(this);
        this.onSelectTableItem=this.onSelectTableItem.bind(this);
        this.TimeCompare=this.TimeCompare.bind(this);
        // this.updateDataTable();
        this.widecolumns=[
            {field:'id',headerName:'StartTime',width:200},
            {field:'themes',headerName:'Theme',width:200},
            {field:'worktime',headerName:'WorkTime',width:200},
            {field:'memo',headerName:'Memo',width:300},
        ];
        this.narrowcolumns=[
            {field:'id',headerName:'StartTime',width:120},
            {field:'themes',headerName:'Theme',width:120},
            {field:'worktime',headerName:'WorkTime',width:110},
        ];
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
        let datalist=[];
        for(let i in data)
        {
            console.log(i);
            console.log(data[i]);
            domlist.push(
                <DataItem themes={data[i].themes} starttime={data[i].starttime} worktime={data[i].worktime} memo={data[i].memo}/>
            );
            datalist.push({id:data[i].starttime,themes:data[i].themes,worktime:data[i].worktime,memo:data[i].memo});
        }
        datalist.sort(this.TimeCompare);
        this.setState({dom:domlist});
        this.setState({rows:datalist});
    }

    onRefreshTable(e)
    {
        this.datalist=[];
        this.updateDataTable();
    }
    onSelectTableItem(e,item)
    {
        console.log(e);
        console.log(item);
    }

    componentWillMount()
    {
        this.updateDataTable();
        console.log("before render");
    }

    TimeCompare(a,b)
    {
        return Lib.GetDateFromString(b.id)-Lib.GetDateFromString(a.id);
    }
    render()
    {
        console.log("renderrrr");
        return(
            <Container style={{display:"flex"}}>
                <MediaQuery query="(max-width:767px)">
                    <div style={{ height:600,width:350, justifyContent:"center",margin:"0px auto",paddingTop:"20px"}} onChange={this.onSelectTableItem}>
                        <DataGrid rows={this.state.rows} columns={this.narrowcolumns} pageSize={15} />
                    </div>
                </MediaQuery>
                <MediaQuery query="(min-width:767px)">
                    <div style={{ height:800,width:950, justifyContent:"center",margin:"0px auto",padding:"20px"}} onChange={this.onSelectTableItem}>
                        <DataGrid rows={this.state.rows} columns={this.widecolumns} pageSize={15} checkboxSelection />
                    </div> 
                </MediaQuery>
            </Container>
        );
        if(this.props.isResonsible)
        {
              return(
                <div style={{ height:800,width:750, justifyContent:"center",margin:"0px auto",padding:"20px"}} onChange={this.onSelectTableItem}>
                    <DataGrid rows={this.state.rows} columns={this.narrowcolumns} pageSize={15} checkboxSelection />
                </div> 
              );  
        }
        else
        {
            return(
                <div style={{ height:800,width:950, justifyContent:"center",margin:"0px auto",padding:"20px"}} onChange={this.onSelectTableItem}>
                    <DataGrid rows={this.state.rows} columns={this.widecolumns} pageSize={15} checkboxSelection />
                </div> 
            );
        }
    }
}


export default connect((state)=>state)(DataGridComp);