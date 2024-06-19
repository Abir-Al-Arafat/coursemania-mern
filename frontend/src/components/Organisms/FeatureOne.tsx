import React from "react";
// import { features } from "../../constants";
import { styles, layout } from "../../style";
// import Button from "./Atoms/Button/Button";
// import FeatureCard from "../Atoms/Button/FeatureCard/FeatureCard";
import { featureOne } from "../../assets";

const FeatureOne: React.FC = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Fast-track your learning</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Don't waste your time with boring stuff you don't need. These courses
        are clear, concise, to the point, and free of technical jargon. No
        rambling or repetition, just the essentials you need to succeed,
        explained in plain English.
      </p>

      {/* <Button styles={`mt-10`} /> */}
    </div>

    {/* <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div> */}

    <div
      className={`flex-1 flex object-cover ${styles.flexCenter} md:my-0 my-10 relative`}
    >
      <img
        src={featureOne}
        alt="billing"
        className="w-[100%] h-[100%] relative z-[5] object-cover"
      />

      {/* gradient start */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      {/* gradient end */}
    </div>
  </section>
);

export default FeatureOne;
