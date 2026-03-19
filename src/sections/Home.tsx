import ThreeBackground from './home/threebackground';
import Main from './home/main';
import About from './home/about';
import Timeline from './home/timeline';
import Offerts from './home/offerts';
import Sales from './home/sales';
import Carrousel from './home/carrousel';

export default function HomeSection() {
  return (
    <main className="home-section">
      <ThreeBackground />
      <Carrousel />
      <Main />
      <About />
      <Timeline />
      <Offerts />
      <Sales />
    </main>
  );
}