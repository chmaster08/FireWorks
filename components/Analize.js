import React,{Component} from 'react';
import Lib from "../static/address_lib";
import {connect} from 'react-redux';
import firebase from 'firebase';
import TaskData from './TaskData';
import style from "../static/Style";
import Router from 'next/router';
import Enumerable from  "linq";
import {PieChart ,Pie,Text,Tooltip,Cell,Sector,BarChart,Bar,XAxis,YAxis,CartesianGrid,Legend} from "recharts";
import { Container } from 'next/app';
import {DataGrid} from "@material-ui/data-grid";

class Analize extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            monthlyThemeHour:[],
            PieData:[],
            BarData:[],
            GridData:[],

        }
        this.datalist=[];
        this.themelist=[];
        this.monthlyThemeData=[];
        this.PieLable="";
        this.updateDataTable=this.updateDataTable.bind(this);
        this.UpdateThemeList=this.UpdateThemeList.bind(this);
        this.CalcMonthlyThemeHour=this.CalcMonthlyThemeHour.bind(this);
        this.SetPieData=this.SetPieData.bind(this);
        this.timeCompareFunc=this.timeCompareFunc.bind(this);
        this.setDataGridData=this.setDataGridData.bind(this);
        this.SetBarData=this.SetBarData.bind(this);

        this.columns=[
            {field:'id',headerName:'rank',width:80},
            {field:'theme',headerName:'Theme',width:100},
            {field:'worktime',headerName:'WorkTime',width:100},
        ];
        this.COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
        this.RADIAN = Math.PI / 180;  
        this.renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
         const x  = cx + radius * Math.cos(-midAngle * this.RADIAN);
         const y = cy  + radius * Math.sin(-midAngle * this.RADIAN);
        
         return (
           <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
               {this.state.PieData[index].name+":"+`${(percent * 100).toFixed(0)}%`}
           </text>
         );
       };


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
        this.CalcMonthlyThemeHour();
        this.SetPieData();
        this.setDataGridData();
        this.SetBarData();
    }

    CalcMonthlyThemeHour()
    {
        let themear=[];
        for(let i in this.themelist)
        {
            let data={hour:0,minutes:0,second:0,totalsec:0,totalhour:0,theme:this.themelist[i]};
            themear.push(data);
        }
        console.log(themear);

        for(let i in this.datalist)
        {
            let containtheme=Array.from(this.datalist[i].themes);
            let timearray=Lib.getWorkTimeArrayFromString(this.datalist[i].worktime);

            for(let j in themear)
            {
                if(containtheme.indexOf(themear[j]["theme"])!=-1)
                {
                    let newh=themear[j].hour+timearray[0]+Math.floor((themear[j].minutes+timearray[1])/60);
                    let newm=(themear[j].minutes+timearray[1])%60+Math.floor((themear[j].second+timearray[2])/60);
                    let news=(themear[j].second+timearray[2])%60;
                    let newtheme=themear[j].theme;
                    let newtotal=news+newm*60+newh*3600;
                    let newtotalhour=newh+newm/60;
                    
                    themear[j]={hour:newh,minutes:newm,second:news,totalsec:newtotal,totalhour:newtotalhour,theme:newtheme};
                }
            }

            
        }
        console.log(themear);
        themear.sort(this.timeCompareFunc);
        this.setState({monthlyThemeHour:themear});
        this.monthlyThemeData=themear;
        console.log(this.monthlyThemeData);
    }

    SetPieData()
    {
        let retpiedata=[];
        for(let item in this.monthlyThemeData)
        {
            retpiedata.push({index:item,name:this.monthlyThemeData[item].theme,value:this.monthlyThemeData[item].totalsec});
        }
        this.setState({PieData:retpiedata});
    }
    SetBarData()
    {
        let retpiedata=[];
        for(let item in this.monthlyThemeData)
        {
            retpiedata.push({index:item,name:this.monthlyThemeData[item].theme,value:parseFloat(this.monthlyThemeData[item].totalhour).toFixed(2)});
        }
        this.setState({BarData:retpiedata});
    }

    setDataGridData()
    {
        let retdatagrid=[];
        for(let item in this.monthlyThemeData)
        {
            retdatagrid.push({id:Number(item)+1,theme:this.monthlyThemeData[item].theme,worktime:parseFloat(this.monthlyThemeData[item].totalhour).toFixed(2)});
        }

        this.setState({GridData:retdatagrid});
    }

    timeCompareFunc(a,b)
    {
        return b.totalsec-a.totalsec;
    }


    render()
    {
        return(
            <div style={{display:'flex'}}>
                <PieChart width={500} height={500}>
                    <Pie
                    data={this.state.PieData} 
                    cx="50%" 
                    cy="50%"
                    labelLine={false}
                    label={this.renderCustomizedLabel}
                    fill="#8884d8"
                    >
                        {
                        this.state.PieData.map((entry, index) => <Cell fill={this.COLORS[index % this.COLORS.length]}/>)
                    }
                    </Pie>
                    <Tooltip/>
                </PieChart>
                <BarChart width={600} height={300} data={this.state.BarData} style={{marginTop:"100px"}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="value" fill="#82ca9d"/>
                </BarChart>
                <div style={{ height:300,width:290, justifyContent:"center",margin:"0px auto",paddingTop:"20px"}} onChange={this.onSelectTableItem}>
                    <DataGrid rows={this.state.GridData} columns={this.columns} pageSize={1} />
                </div>
            </div>
            );
    }
}

export default connect((state)=>state)(Analize);


