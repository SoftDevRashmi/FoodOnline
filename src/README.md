Food ordering App
/\*
*Header
-logo
-nav-items
*Body
-search
-restaurent-container
-restaurent-card
-img
-Name of restaurent, star rating, cuisins, delivery time

\*Footer
-copyright
-links
-conatct
-address

\*/

wecmade mockdata.js we get the datac from swiggy api basically hardcoded data...just for the purpose of know the use of usestate hook
after getting data live from api we dont need it we can delete mockdata file as well and
const[listOfRestaurants, SetListOfRestauarent]=useState([resList])//restList was the mosk data
const[listOfRestaurants, SetListOfRestauarent]=useState([])//we can make it empty now to get tghe api data directly no need of hardcoded data now
