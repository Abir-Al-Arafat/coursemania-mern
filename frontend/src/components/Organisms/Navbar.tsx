import { useState } from "react";
import { close, menu, logoOne } from "../../assets";
import { navLinks } from "../../constants";
import { NavLink } from "react-router-dom";
import WishlistIcon from "./WishlistIcon";
import Cart from "./Cart";

interface INavLink {
  id: string;
  title: string;
  endpoint: string;
}

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const dummyItems = [
    "Course 1",
    "Course 2",
    "Course 3",
    // ... Add more items as needed
  ];
  const handleRemoveFromWishlist = (item: string) => {
    setWishlistItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logoOne} alt="logo" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav: INavLink, index: Number) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer hover:text-secondary text-[16px] ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            } text-white`}
          >
            {/* <a href={`#${nav.id}`}>{nav.title}</a> */}
            <NavLink to={nav.endpoint}>{nav.title}</NavLink>
          </li>
        ))}
      </ul>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li
          // key={nav.id}
          className={`font-poppins font-normal cursor-pointer text-[16px] 
              mr-3 text-black `}
        >
          {/* <a href={`#${nav.id}`}>{nav.title}</a> */}
          {/* <NavLink to={`/wishlist`}> */}
          <WishlistIcon
            items={dummyItems}
            onRemove={handleRemoveFromWishlist}
          />
          {/* </NavLink> */}
        </li>
        <li
          // key={nav.id}
          className={`font-poppins font-normal cursor-pointer text-[16px] 
              mr-0 text-black`}
        >
          {/* <a href={`#${nav.id}`}>{nav.title}</a> */}
          {/* <NavLink to={`/wishlist`}> */}
          <Cart />
          {/* </NavLink> */}
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center cursor-pointer">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl z-50 sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((nav: INavLink, index: Number) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer hover:text-secondary text-[16px] ${
                  index === navLinks.length - 1 ? "mr-0" : "mb-4"
                } text-white`}
              >
                {/* <a href={`#${nav.id}`}>{nav.title}</a> */}
                <NavLink to={nav.endpoint}>{nav.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
