import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";

import Account from '../components/Account';
import DataGridComp from '../components/DataGrid';

export default ()=>(
    <Layout header="WorkRecorder" title="FireWorks">
        <DataGridComp/>
    </Layout>
);