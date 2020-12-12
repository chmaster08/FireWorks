import React,{Component} from "react";

class TaskData extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            starttime:"",
            worktime:"",
            themes:[],
        }
    }
}

export default TaskData;