import React,{Component} from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component
{
    style=
    {
        width:"300px",
        margin:"0px auto",
    }
    render()
    {
        return(
            <div>
                <Header header={this.props.header} title={this.props.title}/>
                {this.props.children}
                <Footer footer="Copyright"/>
            </div>
        );
    }
}

export default Layout;