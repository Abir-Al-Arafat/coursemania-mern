import { styles } from "../../style";
import {
  Navbar,
  Hero,
  Stats,
  FeatureOne,
  FeatureTwo,
  FeatureThree,
  FeatureFour,
  FeatureFive,
  Testimonials,
  Clients,
  Footer,
} from "../../components";

import Accordion from "../Organisms/Accordion";

const HomePage = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div
        className={`bg-primary text-white ${styles.paddingX} ${styles.flexStart}`}
      >
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <FeatureOne />
          <FeatureTwo />
          <FeatureThree />
          <FeatureFour />
          <FeatureFive />
          <Testimonials />
          <Accordion />
          <Clients />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
