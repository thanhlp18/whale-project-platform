import GetApp from "@/components/landingPage/GetApp";
import UspSection from "@/components/landingPage/Usp";
import Hero from "@/components/landingPage/Hero";
import Statics from "@/components/landingPage/Statics";
import Layout from "@/layout/defaultLayout";
import Testimonial from "@/components/landingPage/Testimonial";
type Props = {};

function App({}: Props) {
  return (
    <Layout data-theme="mytheme" >
      <Hero />
      <Statics />
      <UspSection />
      <Testimonial />
      <GetApp />
    </Layout>
  );
}

export default App;
