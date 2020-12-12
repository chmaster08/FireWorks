import React,{Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import TaskData from './TaskData';
import Lib from "../static/address_lib";

class WorkRecorder extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            starttime:"",
            hour:0,
            minutes:0,
            second:0,
            theme:"",
            themehistory:[],
            isEnable:false,
        }

        this.themes=[];

        this.startCount=this.startCount.bind(this);
        this.stopCount=this.stopCount.bind(this);
        this.resetCount=this.resetCount.bind(this);
        this.registerWork=this.registerWork.bind(this);
        this.onChangeTheme=this.onChangeTheme.bind(this);
        this.AddThemeAction=this.AddThemeAction.bind(this);
        this.registerDB=this.registerDB.bind(this);
        this.getThemeListData=this.getThemeListData.bind(this);
        this.UpdateThemeList=this.UpdateThemeList.bind(this);
        this.registerNewTheme=this.registerNewTheme.bind(this);
        this.getThemeListData();
    }

    countUp()
    {
        if(this.state.isEnable)
        {
            let incmin=Math.floor((this.state.second+1)/60);
            let inchour=Math.floor((this.state.minutes+incmin)/60);
            this.setState(
            {
                second:(this.state.second+1)%60,
                minutes:(this.state.minutes+incmin)%60,
                hour:(this.state.hour+inchour),
            }
        );
        }
        
    }

    startCount()
    {
        let timenow=Lib.getStringFromDate(new Date());
        this.setState({isEnable:true,starttime:timenow});
        setInterval(()=>this.countUp(),1000);
    }

    stopCount()
    {
        this.setState({isEnable:false});
    }

    registerWork()
    {
        console.log("Register");
        // let data=new TaskData();
        // data.setState({starttime:this.state.starttime});
        // data.setState({worktime:this.state.hour+":"+this.state.minutes+":"+this.state.second});
        // data.setState({themes:this.themes});
        let data=
        {
            worktime:this.state.hour+":"+this.state.minutes+":"+this.state.second,
            themes:this.themes,
        };

        this.registerDB(data);
        this.UpdateThemeList();
        this.resetCount();
    }

    registerDB(data)
    {
        
        let db=firebase.database();
        let ref=db.ref("FireWorks/"+Lib.encodeEmail(this.props.email)+"/WorkDataList/"+this.state.starttime);
        console.log(ref);
        this.props.dispatch({
            type:"UPDATE_USER_INFO",
            value:
            {
                login:this.props.login,
                username:this.props.username,
                email:this.props.email,
                isExistUpdate:true,
            }
        });
        ref.set(data);
    }

    getThemeListData()
    {
        let email=Lib.encodeEmail(this.props.email);
        let db=firebase.database();
        let ref=db.ref('FireWorks/'+Lib.encodeEmail(this.props.email)+'/ThemeList');
        let self=this;
        ref.orderByKey().on("value",(snapshot)=>{
            let d=Lib.deepcopy(snapshot.val());
            console.log(d);
            this.setState({themehistory:d});
            });
    }

    UpdateThemeList()
    {
        console.log(this.themes);
        if(this.state.themehistory==null)
        {
            for(let item in this.themes)
            {
                this.registerNewTheme(item);
            }
        }
        else
        {
            for(let item in this.themes)
            {
                if(this.state.themehistory.indexOf(item)==-1)
                {
                    this.registerNewTheme(item);
                }
            }
        }
    }

    registerNewTheme(item)
    {
        console.log(item);

        let db=firebase.database();
        let ref=db.ref("FireWorks/"+Lib.encodeEmail(this.props.email)+"/ThemeList");
        console.log(ref);
        ref.set(item);
    }

    
    resetCount()
    {
        this.setState(
            {
                starttime:"",
                hour:0,
                minutes:0,
                second:0,
                themes:[],
                isEnable:false,
            }
        );
    }

    onChangeTheme(e)
    {
        this.setState({theme:e.target.value});
    }
    AddThemeAction(e)
    {
        if(this.state.theme != "" && this.state.theme != undefined)
        {
            this.themes.push(this.state.theme);
            this.setState({theme:""});
        }
        
    }

    render()
    {
        return(
            <div>
                <h1>WorkRecorder</h1>
                <p>{this.state.hour}:{this.state.minutes}:{this.state.second}</p>
                <div>
                    <button onClick={this.startCount}>Start</button>
                    <button onClick={this.stopCount}>Stop</button>
                    <button onClick={this.resetCount}>Reset</button>
                </div>
                <input type="text" size="30" value={this.state.theme} onChange={this.onChangeTheme}/>
                <button onClick={this.AddThemeAction}>AddTheme</button>
                <button onClick={this.registerWork}>Register</button>
            </div>
        );
    }
}

export default connect((state)=>state)(WorkRecorder);