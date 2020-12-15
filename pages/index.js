import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import Login from "../components/Login";
import Account from '../components/Account';
import Initialize from '../components/Initialize';
import WorkRecorder from '../components/WorkRecorder';
import style from "../static/Style";
import Container from '@material-ui/core/Container';


export default ()=>(
    <Container maxWidth="sm">
        {style}
        <Layout header="WorkLog" title="FireWorks">
            <Initialize/>
        </Layout>
    </Container>
    
);