import React from "react";
// import { features } from "../constants";
import { styles, layout } from "../../style";
import { featureFive } from "../../assets";

const FeatureFive: React.FC = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Courses for everyone</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Whether you're looking to learn a new language or just brushing up on
        your skills, I've got you covered. I offer a wide variety of courses so
        you can pick and choose what's most relevant to you. Plus, I make sure
        my courses are fun and engaging so you won't get bored.
      </p>
    </div>

    <div
      className={`flex-1 flex object-cover ${styles.flexCenter} md:my-0 my-10 relative`}
    >
      <img
        src={featureFive}
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

export default FeatureFive;
