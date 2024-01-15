import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
  const onStatus = useOnlineStatus();

  return (
    <div className="container flex justify-between bg-pink-50 shadow ">
      <div className="logo">
        <img className="w-[100px]" src={LOGO_URL} />
      </div>
      <div className="nav-items mt-3 items-center">
        <ul className="flex justify-between">
          <li className="px-5">{onStatus ? "✅Online" : "🛑offline"} </li>
          <li className="px-5">
            <Link to="/">Home</Link>
          </li>
          <li className="px-5">
            <Link to="/about"> About US</Link>
          </li>
          <li className="px-5">
            <Link to="/contact"> Contact US</Link>
          </li>
          <li className="px-5">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-5">Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
