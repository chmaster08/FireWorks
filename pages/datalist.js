import React,{Component} from 'react';
import Link from "next/link";
import Layout from "../components/Layout";

import Account from '../components/Account';

export default ()=>(
    <Layout header="WorkRecorder" title="FireWorks">
        <h1>あくまでpages内はパーツを並べるだけ、各パーツはComponentsで作成する</h1>
    </Layout>
);