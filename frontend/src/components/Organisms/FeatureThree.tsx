import React from "react";
// import { features } from "../../constants";
import { styles, layout } from "../../style";
// import Button from "./Atoms/Button/Button";
// import FeatureCard from "../Atoms/Button/FeatureCard/FeatureCard";
import { featureThree } from "../../assets";

const FeatureThree: React.FC = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Hands-on learning</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        I believe the best way to learn is by actually doing. That's why my
        courses teach you the essential theory and provide practical exercises.
        You'll be able to practice everything you learn and apply it to
        real-life situations.
      </p>
    </div>

    <div
      className={`flex-1 flex object-cover ${styles.flexCenter} md:my-0 my-10 relative`}
    >
      <img
        src={featureThree}
        alt="billing"
        className="w-[80%] h-[80%] relative z-[5] object-cover"
      />

      {/* gradient start */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      {/* gradient end */}
    </div>
  </section>
);

export default FeatureThree;
