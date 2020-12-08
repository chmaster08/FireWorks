import React,{Component} from "react";

class TaskData extends Component
{
    constructor(props)
    {
        super(props);
        this.starttime=props.starttime;
        this.endtime=props.endtime;
        this.theme=props.theme;
        this.memo=props.memo;
    }

    get timeSpan()
    {
        if(this.endtime-this.starttime>0)
        {
            return this.endtime-this.starttime;
        }
        else
        {
            console.log("invalid timespan");
            throw "Invalid Input Time";
        }
    }

    addtheme(theme)
    {
        this.theme.Add(theme);
    }
}

export default TaskData;