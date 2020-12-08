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
        
        
        format_str = 'YYYY-MM-DD hh:mm:ss';
        format_str = format_str.replace(/YYYY/g, year_str);
        format_str = format_str.replace(/MM/g, month_str);
        format_str = format_str.replace(/DD/g, day_str);
        format_str = format_str.replace(/hh/g, hour_str);
        format_str = format_str.replace(/mm/g, minute_str);
        format_str = format_str.replace(/ss/g, second_str);
        
        return format_str;
       };
}

export default Lib;