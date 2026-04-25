import About from "../src/components/About";
import CtaBand from "../src/components/CtaBand";
import Features from "../src/components/Features";
import Footer from "../src/components/Footer";
import Hero from "../src/components/Hero";
import HowItWorks from "../src/components/HowItWorks";
import LiveDeals from "../src/components/LiveDeals";
import Testimonials from "../src/components/Testimonials";
import Ticker from "../src/components/Ticker";

export default function HomePage() {
  return (
    <main className="landing-page">
      <Hero />
      <Ticker />
      <LiveDeals />
      <HowItWorks />
      <Features />
      <About />
      <Testimonials />
      <CtaBand />
      <Footer />
    </main>
  );
}
