import Camp from "@/components/landingPage/Camp";
import Features from "@/components/landingPage/Features";
import GetApp from "@/components/landingPage/GetApp";
import Guide from "@/components/landingPage/Guide";
import Hero from "@/components/landingPage/Hero";
import Layout from "@/layout/defaultLayout";
type Props = {};

function App({ }: Props) {
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
