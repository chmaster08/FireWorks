import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import  MediaQuery from "react-responsive";
import Account from '../components/Account';
import DataGridComp from '../components/DataGrid';

export default ()=>(
    <Layout header="WorkRecorder" title="FireWorks" style={{margin:"auto",width:"50%"}}>
        <DataGridComp/>
    </Layout>
);