import React,{Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import TaskData from './TaskData';
import Lib from "../static/address_lib";
import style from "../static/Style";
import Router from 'next/router';

class Analize extends Component
{
    constructor(props)
    {
        super(props);
        this.updateDataTable=this.updateDataTable.bind(this);
        this.UpdateThemeList=this.UpdateThemeList.bind(this);
        this.datalist=[];
        this.themelist=[];

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
                this.datalist=d;
            }
            });
        console.log(this.datalist);
    }


    UpdateThemeList()
    {
        let email=Lib.encodeEmail(this.props.email);
        let db=firebase.database();
        let ref=db.ref('FireWorks/'+Lib.encodeEmail(this.props.email)+'/ThemeList');
        let self=this;
        ref.on("value",(snapshot)=>{
            let d=Lib.deepcopy(snapshot.val());
            console.log(d);
            if(d!=null)
            {
                this.themelist=d;
            }
            });
        console.log(this.themelist);
    }

    componentWillMount()
    {
        this.updateDataTable();
        this.UpdateThemeList();
        console.log("before render");
    }

    render()
    {
        return(<h1>Hello Analize</h1>);
    }
}

export default connect((state)=>state)(Analize);


