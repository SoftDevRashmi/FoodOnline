import { CDN_URL } from "../utils/constants";

const RestraurentCard = (props) => {
  const { resdata } = props;
  const info = resdata?.info || {}; // Default to an empty object if info is undefined

  const {
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    avgRating,
    deliveryTime,
  } = info;

  return (
    <div className="rounded p-4 m-4 w-[210px]">
      {cloudinaryImageId && (
        <img className="rounded" src={CDN_URL + cloudinaryImageId} alt={name} />
      )}
      <h3 className="text-wrap">{name}</h3>

      {info?.cuisines && <h3 className="text-wrap">{cuisines.join(",")}</h3>}
      <h3>{costForTwo}</h3>
      <h4>{avgRating} Star</h4>
      {deliveryTime && <h4>{deliveryTime}</h4>}
    </div>
  );
};
//higher order componenet which return promoted lable on top of promoted restaurants
export const withPromotedLabel = (RestraurentCard) => {
  return (props) => {
    return (
      <div>
        <label className=" text-white rounded bg-red-400">Promoted</label>
        <RestraurentCard {...props} />
      </div>
    );
  };
};
export default RestraurentCard;
