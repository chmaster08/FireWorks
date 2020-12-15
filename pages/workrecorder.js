import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import WorkRecorder from "../components/WorkRecorder";
import Container from '@material-ui/core/Container';


import Account from '../components/Account';

const style={
    margin:"auto",
    width:"50%",
};


export default ()=>(
    <Container maxWidth="sm">
        <Layout header="WorkRecorder" title="FireWorks" style={style}>
            <WorkRecorder/>
        </Layout>
    </Container>

    
);