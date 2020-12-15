import App,{Container} from 'next/app';
import React from 'react';
import withReduxStore from '../libs/redux-store';
import {Provider} from 'react-redux';

const containerStyle=
{
    margin:"auto",
}
class _App extends App{
    render()
    {
        const {Component,pageProps,reduxStore}=this.props;
        return(
            <Container style={containerStyle}>
                <Provider store={reduxStore}>
                    <Component {...pageProps}/>
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(_App);