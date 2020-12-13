import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import WorkRecorder from "../components/WorkRecorder";

import Account from '../components/Account';

export default ()=>(
    <Layout header="WorkRecorder" title="FireWorks">
        <WorkRecorder/>

    </Layout>
);