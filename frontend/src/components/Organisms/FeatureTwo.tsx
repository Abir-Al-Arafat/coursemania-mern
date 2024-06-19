import React from "react";
import { featureTwo } from "../../assets";
import { styles, layout } from "../../style";

const FeatureTwo: React.FC = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img
        src={featureTwo}
        alt="featureTwo"
        className="w-[100%] h-[100%] relative z-[5]"
      />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Easy-to-follow lessons</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        I know learning to code can be tough. So I've carefully organized my
        courses into simple, bite-sized pieces to help you progress smoothly,
        one step at a time. I'll guide you through each step of the way so you
        won't feel overwhelmed.
      </p>
    </div>
  </section>
);

export default FeatureTwo;
