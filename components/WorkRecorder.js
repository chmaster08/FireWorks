import React,{Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import TaskData from './TaskData';
import Lib from "../static/address_lib";
import style from "../static/Style";
import Router from 'next/router';
import { Button, InputLabel } from '@material-ui/core';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import ButtonGroup from '@material-ui/core/ButtonGroup';


class WorkRecorder extends Component
{
    timeStyle=
    {
        fontSize:"50pt",
        alignItems:"center",
    }


    paperStyle=
    {
        padding: '2px 4px',
        alignItems: 'center',
        width:"20px"
    }
    
    selectstyle=
    {
        margin:"0px auto",
        minWidth:120,
        maxWidth:200,
        justifyContent:"center",
        display:"flex",
    }

    themestyle={
        margin:"10px",
    }
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
            selectedtheme:[],
            themehistorylist:[],
            memo:"",
            isEnable:false,
        }

        this.useStyles = makeStyles((theme) => ({
            root: {
              display: 'flex',
              '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(16),
                height: theme.spacing(16),
              },
            },
          }));


        this.themes=[];
        this.themehistory=[];

        this.startCount=this.startCount.bind(this);
        this.stopCount=this.stopCount.bind(this);
        this.resetCount=this.resetCount.bind(this);
        this.registerWork=this.registerWork.bind(this);
        this.onChangeTheme=this.onChangeTheme.bind(this);
        this.AddThemeAction=this.AddThemeAction.bind(this);
        this.registerDB=this.registerDB.bind(this);
        this.getThemeListData=this.getThemeListData.bind(this);
        this.UpdateThemeList=this.UpdateThemeList.bind(this);
        this.updateSelectedThemeView=this.updateSelectedThemeView.bind(this);
        this.updateThemeHistoryView=this.updateThemeHistoryView.bind(this);
        this.onChangeSelectedHistory=this.onChangeSelectedHistory.bind(this);
        this.onChangememo=this.onChangememo.bind(this);
        this.useStyle=this.useStyle.bind(this);
        this.onDeleteThemes=this.onDeleteThemes.bind(this);
        this.getThemeListData();
        this.ppStyle=this.useStyle();
        console.log(this.ppStyle);

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

    useStyle()
    {
        return(
            makeStyles((theme) => ({
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  '& > *': {
                    margin: theme.spacing(1),
                  },
                },
                bu: {
                    '& > *': {
                      margin: theme.spacing(1),
                    },
                  },
              }))
        );
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
            starttime:this.state.starttime,
            memo:this.state.memo,
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
            if(d!=null)
            {
                this.addThemeHistory(d);
            }
            });

        console.log(this.themehistory);
    }

    UpdateThemeList()
    {
        console.log(this.themes);
        let senddata=this.themehistory;
        if(this.themehistory==null)
        {
            for(let item in this.themes)
            {
                senddata.push(this.themes[item]);
            }
        }
        else
        {
            for(let item in this.themes)
            {
                if(this.themehistory.indexOf(this.themes[item])==-1)
                {
                    senddata.push(this.themes[item]);
                }
            }
        }
        this.themehistory=senddata;
        console.log(this.themehistory);
        let db=firebase.database();
        let ref=db.ref("FireWorks/"+Lib.encodeEmail(this.props.email)+"/ThemeList");
        
        ref.set(this.themehistory);

    }

    addThemeHistory(items)
    {
        for(let i in items)
        {
            this.themehistory.push(items[i]);
        }
        this.updateSelectedThemeView();
        this.updateThemeHistoryView();
    }

    addTheme(theme)
    {
        if(this.themes.indexOf(theme)==-1)
        {
            this.themes.push(theme);
        }
    }


    updateSelectedThemeView()
    {
        let dom=[];
        for(let item in this.themes)
        {
            dom.push(
                <Chip label={this.themes[item]} onDelete={this.onDeleteThemes(item)}/>
            );
        }
        this.setState({selectedtheme:dom});
    }

    updateThemeHistoryView()
    {
        let dom=[];
        for(let item in this.themehistory)
        {
            dom.push(<MenuItem value={this.themehistory[item]}>{this.themehistory[item]}</MenuItem>);
        }
        this.setState({themehistorylist:dom});

    }

    
    resetCount()
    {
        this.setState(
            {
                starttime:"",
                hour:0,
                minutes:0,
                second:0,
                theme:"",
                selectedtheme:[],
                themehistorylist:[],
                memo:"",
                isEnable:false,
            }
        );
        this.themes=[];
        this.themehistory=[],
        this.getThemeListData();
    }

    onChangeTheme(e)
    {
        this.setState({theme:e.target.value});
    }
    AddThemeAction(e)
    {
        if(this.state.theme != "" && this.state.theme != undefined)
        {
            this.addTheme(this.state.theme);
            this.setState({theme:""});
            this.updateSelectedThemeView();
        }
        
    }

    onChangeSelectedHistory(e)
    {
        this.addTheme(e.target.value);
        this.updateSelectedThemeView();
    }

    checklogin()
    {
        firebase.auth().onAuthStateChanged((user)=>
        {
            if(!user)
            {
                Router.push("/");
            }
        })
    }

    onChangememo(e)
    {
        this.setState({memo:e.target.value});
    }

    componentWillMount()
    {
        this.updateThemeHistoryView();
    }

    onDeleteThemes(e)
    {
        console.log(e);
        let ar=[];
        ar=Object.assign({},...this.state.selectedtheme);
        let arr=Array.from(ar);
        if(e>=0)
        {
            arr.splice(e,1);
            this.setState({selectedtheme:arr});
        }
    }

    render()
    {
        return(
            <div>
                {style}
                <p style={this.timeStyle}>{this.state.hour}:{this.state.minutes}:{this.state.second}</p>
                <ButtonGroup style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" color="primary" onClick={this.startCount}>Start</Button>
                    <Button variant="contained" color="secondary" onClick={this.stopCount}>Stop</Button>
                    <Button variant="contained" onClick={this.resetCount}>Reset</Button>
                </ButtonGroup>
                <br/>
                <Paper className={this.ppStyle.root} style={{width:"50",height:"50",display:"fixed"}}>
                    {this.state.selectedtheme}
                </Paper>
                <Container style={{display: 'flex', justifyContent: 'center'}}>
                    <TextField variant="standard" value={this.state.theme} onChange={this.onChangeTheme}/>
                    <Button onClick={this.AddThemeAction} variant="contained" color="secondary">Add</Button>
                </Container>
                <FormControl style={{display:"block", justifyContent: 'center',width:"50"}} >
                        <Select size="5" onChange={this.onChangeSelectedHistory} style={this.selectstyle}>
                    {this.state.themehistorylist}
                    </Select>
                </FormControl>
                <br/>
                <br/>
                <Container style={{display:"flex",justifyContent:"center"}}>
                    <TextField variant="outlined" onChange={this.onChangememo}></TextField>
                </Container>
                <Button variant="contained" style={{justifyContent:"center",display:"flex",margin:"0px auto"}} onClick={this.registerWork} disabled={!this.props.login}>Register</Button>
            </div>
        );
    }
}

export default connect((state)=>state)(WorkRecorder);