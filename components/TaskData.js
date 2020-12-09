import React,{Component} from "react";

class TaskData extends Component
{
    constructor(props)
    {
        super(props);
    }

    set startTime(time)
    {
        this.startTime=time;
    }

    set workTime(time)
    {
        this.workTime=time;
    }

    addtheme(theme)
    {
        this.theme.Add(theme);
    }
}

export default TaskData;