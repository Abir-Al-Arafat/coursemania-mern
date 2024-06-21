import React, { ReactNode } from "react";
import Navbar from "../../Organisms/Navbar";
import Footer from "../../Organisms/Footer";
import { styles } from "../../../style";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-primary">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
        {children}
        {/* <div
          style={{
            height: "100vh",
          }}
        ></div> */}
        <div
            className={` text-white ${styles.paddingX} ${styles.flexStart}`}
        >
            <div className={`${styles.boxWidth}`}>
            <Footer />
            </div>
        </div>
    </div>
  );
};

export default Layout;
