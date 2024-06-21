import { styles } from "../../style";
import { arrowUp } from "../../assets";
import { NavLink } from "react-router-dom";

const GetStarted = () => (
  <div
    className={`${styles.flexCenter} w-[170px] h-[170px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
  >
    <NavLink to="/instructor/signup">
      <div
        className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
      >
        <div className="p-[25px]">
          <div className={`${styles.flexStart} flex-row`}>
            <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
              <span className="text-gradient">Get</span>
            </p>
            <img
              src={arrowUp}
              alt="arrow-up"
              className="w-[23px] h-[23px] object-contain"
            />
          </div>

          <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Started as an Instructor</span>
          </p>
        </div>
      </div>
    </NavLink>
  </div>
);

export default GetStarted;
