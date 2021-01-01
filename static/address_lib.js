import Enumerable from "linq";
class Lib
{
    static deepcopy(value)
    {
        return JSON.parse(JSON.stringify(value));
    }

    static encodeEmail(value)
    {
        return value.split(".").join("*");
    }

    static decodeEmail(value)
    {
        return value.split("*").join(".");
    }

    static getStringFromDate(date) {
 
        var year_str = date.getFullYear();
        //月だけ+1すること
        var month_str = 1 + date.getMonth();
        var day_str = date.getDate();
        var hour_str = date.getHours();
        var minute_str = date.getMinutes();
        var second_str = date.getSeconds();

        hour_str=("0"+hour_str).slice(-2);
        minute_str=("0"+minute_str).slice(-2);
        second_str=("0"+second_str).slice(-2);        
        
        let format_str = 'YYYY-MM-DD hh:mm:ss';
        format_str = format_str.replace(/YYYY/g, year_str);
        format_str = format_str.replace(/MM/g, month_str);
        format_str = format_str.replace(/DD/g, day_str);
        format_str = format_str.replace(/hh/g, hour_str);
        format_str = format_str.replace(/mm/g, minute_str);
        format_str = format_str.replace(/ss/g, second_str);
        
        return format_str;
       };

    static GetDateFromString(str)
    {
        let datesp=str.split("-");
        let year=datesp[0];
        let month=datesp[1];
        let date=datesp[2].split(" ")[0];

        let timesp=str.split(" ")[1].split(":");

        let hour=timesp[0];
        let minutes=timesp[1];
        let second=timesp[2];
        let ret=new Date(year,month-1,date,hour,minutes,second)
        return ret;
    }

    static getWorkTimeArrayFromString(str)
    {
        let timearray=str.split(":");
        return Enumerable.from(timearray).select("x=>Number(x)").toArray();
    }

    static getFirstDate(date)
    {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
}

export default Lib;