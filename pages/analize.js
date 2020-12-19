import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import Analize from "../components/Analize";

import Account from '../components/Account';

export default ()=>(
    <Layout header="WorkRecorder" title="FireWorks">
        <Analize/>
    </Layout>
);