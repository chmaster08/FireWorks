import React,{Component} from "react";
import {getStringFromDate} from "../static/address_lib";

class TaskData extends Component
{
    constructor(props)
    {
        super(props);
    }

    get timeSpan()
    {
        return new Date(this.endtime)-new Date(this.starttime);
    }

    set startTime(time)
    {
        this.starttime=getStringFromDate(time);
    }

    set endTime(time)
    {
        this.endtime=getStringFromDate(time);
    }

    addtheme(theme)
    {
        this.theme.Add(theme);
    }
}

export default TaskData;