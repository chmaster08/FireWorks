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
}

export default Lib;