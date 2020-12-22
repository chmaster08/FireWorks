import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import Analize from "../components/Analize";
import Container from '@material-ui/core/Container';
import Account from '../components/Account';

export default ()=>(
    <Container maxWidth="sm">
        <Layout header="WorkRecorder" title="FireWorks" style={{margin:"auto",width:"50%"}}>
            <Analize/>
        </Layout>
    </Container>
    
);