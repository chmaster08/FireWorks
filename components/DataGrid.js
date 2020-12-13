import React,{Component} from 'react';
import {connect, ReactReduxContext} from 'react-redux';
import firebase from 'firebase';
import TaskData from './TaskData';
import Lib from "../static/address_lib";
import Router from 'next/router';



class DataGrid extends Component
{
    constructor(props)
    {
        super(props);
        console.log("constructot");
        if(this.props.login==false)
        {
            Router.push("/");
        }
        this.state=
        {
            dom:[],
        }
        this.onRefreshTable=this.onRefreshTable.bind(this);
        this.setDataGrid=this.setDataGrid.bind(this);
        console.log("end constructor");
 
    }

    setDataGrid()
    {
        console.log("Setadata");
        let datalist=[];
        datalist=this.getDataListFromDB();
        console.log(datalist);
        let domlist=[];
        for(let i in datalist)
        {
            console.log(i);
            console.log(datalist[i]);
            domlist.push(
                <tr key={i}>
                        <td>{this.getTagDOM(datalist[i].themes)}</td>
                        <td>{datalist[i].worktime}</td>
                        <td>{datalist[i].starttime}</td>
                        <td>{datalist[i].memo}</td>
                </tr>
            );
        }
        console.log(domlist);
        this.setState({dom:domlist});
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

    getDataListFromDB()
    {
        let ret;
        let email=Lib.encodeEmail(this.props.email);
        let db=firebase.database();
        let ref=db.ref('FireWorks/'+Lib.encodeEmail(this.props.email)+'/WorkDataList');
        let self=this;
        ref.orderByKey().on("value",(snapshot)=>{
            let d=Lib.deepcopy(snapshot.val());
            console.log(d);
            if(d!=null)
            {
                ret=d;
            }
            });
        return ret;
    }

    onRefreshTable(e)
    {
        this.setDataGrid();
    }

    componentWillMount()
    {
        this.setDataGrid();
        console.log("COmp");
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