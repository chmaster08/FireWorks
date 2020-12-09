import React,{Component} from 'react';
import Link from "next/link";


class Header extends Component
{
    render()
    {
        return(
            <header>
                <div>
                    <p>{this.props.header}</p>
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