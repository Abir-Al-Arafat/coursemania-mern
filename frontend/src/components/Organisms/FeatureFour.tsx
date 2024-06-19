import React from "react";
import { featureFour } from "../../assets";
import { styles, layout } from "../../style";

const FeatureFour: React.FC = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img
        src={featureFour}
        alt="featureTwo"
        className="w-[60%] h-[80%] relative z-[5]"
      />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Real-world projects</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        My courses are designed to prepare you for real-world jobs and
        interviews. With in-depth, comprehensive courses packed with real-world
        examples and exercises, you'll be ready to take on any challenge that
        comes your way.
      </p>
    </div>
  </section>
);

export default FeatureFour;
