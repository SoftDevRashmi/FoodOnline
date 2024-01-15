import { useEffect, useState } from "react";
import ShimmerUiComp from "./ShimmerUiComp.js";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../utils/constants.js";
import { apiUrl } from "../utils/constants.js";
//this component is for single restaurent info like menu and etc...
//when we click on single card then this will open

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState([]);
  //const param = useParams();
  // console.log(param);
  const { resId } = useParams();
  console.log("resId:", resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.1291499&lng=79.1153367&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const json = await data.json();
    const apiData = json.data;
    setResInfo(apiData);
  };

  //we can directly write like this also
  //  setResInfo(json?.data?.cards[0]?.card?.card?.info); resInfo will have all the data

  //or we can destructure the object and can take only certain properties we need
  // or can destructure
  if (resInfo == null) return <ShimmerUiComp />;

  const restaurentinfo = resInfo?.cards[1]?.card?.card?.info;
  console.log(restaurentinfo);
  const { name, id, cloudinaryImageId, cuisines, costForTwoMessage } =
    restaurentinfo;

  //following code to get the menu items
  const { itemCards } =
    resInfo?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  console.log(itemCards);

  return (
    <div>
      <h1> {name}</h1>
      <img src={cloudinaryImageId} height="150px" width="150px" />
      <h3> {id}</h3>
      <h3>
        {cuisines.join(",")}- {costForTwoMessage}
      </h3>

      <h2>Menu</h2>
      <ul>
        <li>{itemCards[4].card.info.name}</li>
        {/*        {itemCards.map((item) => {
          return (
            <li key={item?.card?.info?.id}>
              {item?.card?.info?.name}- Rs{item?.card?.info?.price / 100}
            </li>
          );
        })}
      */}
      </ul>
    </div>
  );
};
export default RestaurantMenu;
