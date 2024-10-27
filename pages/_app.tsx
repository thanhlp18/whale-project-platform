import Camp from "@/components/Camp";
import Features from "@/components/Features";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";
import "../styles/globals.css";
import Layout from "@/layout/defaultLayout";
import { JSXElementConstructor, ReactElement } from "react";
type Props = {};

function App({ }: Props) {
    console.log("run")
    return (
        <Layout>
            <Hero />
            <Camp />
            <Guide />
            <Features />
            <GetApp />
        </Layout>
    );
}



export default App;
