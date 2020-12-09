import React,{Component} from "react";
import {getStringFromDate} from "../static/address_lib";

class TaskData extends Component
{
    constructor(props)
    {
        super(props);
    }

    set startTime(time)
    {
        this.startTime=getStringFromDate(time);
    }

    set workTime(time)
    {
        this.workTime=getStringFromDate(time);
    }

    addtheme(theme)
    {
        this.theme.Add(theme);
    }
}

export default TaskData;