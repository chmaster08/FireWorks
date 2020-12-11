import React,{Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

class WorkRecorder extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            hour:0,
            minutes:0,
            second:0,
            isEnable:false,
        }

        this.startCount=this.startCount.bind(this);
        this.stopCount=this.stopCount.bind(this);
        this.resetCount=this.resetCount.bind(this);
        this.registerWork=this.registerWork.bind(this);
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
        this.setState({isEnable:true});
        setInterval(()=>this.countUp(),1000);
    }

    stopCount()
    {
        this.setState({isEnable:false});
    }

    registerWork()
    {
        console.log("Register");
        this.resetCount();
    }

    resetCount()
    {
        this.setState(
            {
                hour:0,
                minutes:0,
                second:0,
                isEnable:false,
            }
        );
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
                <button onClick={this.registerWork}>Register</button>
            </div>
        );
    }
}

export default connect((state)=>state)(WorkRecorder);