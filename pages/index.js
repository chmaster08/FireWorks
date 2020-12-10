import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";

import Account from '../components/Account';
import Initialize from '../components/Initialize';

export default ()=>(
    <Layout header="WorkLog" title="FireWorks">
        <Initialize/>
    </Layout>
);