import React, { useState, useEffect, lazy } from "react";
import RestraurentCard, {
  withPromotedLabel,
} from "../components/RestraurentCard";
import resList from "../utils/mockData";
import ShimmerUiComp from "./ShimmerUiComp";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import Grocery from "./grocery";

const Body = () => {
  const [listOfRestrarent, setListOfRestraurent] = useState([]);
  const [searchText, setSearchText] = useState(""); //for search box to search specifies restrau
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const RestaurantCardPromoted = withPromotedLabel(RestraurentCard);

  const onlineStatus = useOnlineStatus();

  //whenever state variable update, react will triggers a reconcilation cycle(re-render the component)
  console.log("body rendered", listOfRestrarent);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Log the updated state here
    console.log(listOfRestrarent);
  }, [listOfRestrarent]);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D17.486463086305346%26lng%3D78.3657343313098%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(json);
      setListOfRestraurent(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      setFilteredRestaurant(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      console.log(listOfRestrarent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (onlineStatus === false) return <h1> looks like you are offline</h1>;
  return (
    <div className="container flex-wrap">
      <div className="flex">
        <div className="p-2 m-3">
          <input
            placeholder="Search"
            type="text"
            className="search-text bg-slate-200 me-2 rounded border border-solid border-pink-100 "
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="btn-search px-4 rounded bg-green-200 "
            //filter the resaturant cards and update the UI
            //serchText
            onClick={() => {
              // let filterRestaurant here is loca; varible only to this
              // onclick call back function
              let filteredRestaurant = listOfRestrarent.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestaurant(filteredRestaurant);
              console.log(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="px-4 m-4 bg-emerald-200 rounded-lg"
          onClick={() => {
            let filterList = listOfRestrarent.filter(
              (res) => res.card.card.info.avgRating > 4.0
            );
            setListOfRestraurent(filterList);
          }}
        >
          Search Top rated Restaurant
        </button>
      </div>
      {listOfRestrarent && listOfRestrarent.length > 0 ? (
        <div className="container flex justify-around">
          <div className="flex">
            {filteredRestaurant.map((restaurants, index) => {
              return (
                <Link
                  key={restaurants?.info?.id || index}
                  to={"/restaurants/" + restaurants?.card?.card?.info?.id}
                >
                  {restaurants?.info.isOpen ? (
                    <RestaurantCardPromoted resdata={restaurants} />
                  ) : (
                    <RestraurentCard resdata={restaurants} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <ShimmerUiComp />
        </div>
      )}
    </div>
  );
};

export default Body;
