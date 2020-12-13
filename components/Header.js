import React,{Component} from 'react';
import Link from "next/link";
import Account from './Account';
import Router from 'next/router';


class Header extends Component
{
    constructor(props)
    {
        super(props);
        this.login=this.login.bind(this);
    }

    login()
    {
        Router.push("/workrecorder");
    }

    render()
    {
        return(
            <header>
                <div>
                    <p>{this.props.header}</p>
                    <Account onLogined={this.login}/>
                    <Link href="/workrecorder">
                        <button>Record</button>
                    </Link>
                    <Link href="/datalist">
                        <button>datalist</button>
                    </Link>
                    <Link href="/analize">
                        <button>analize</button>
                    </Link>
                </div>
                <h1>{this.props.title}</h1>
            </header>
        );
    }
}

export default Header;