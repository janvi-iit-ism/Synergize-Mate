import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleUser } from "@/redux/authSlice";
import { useParams } from "react-router-dom";
import WishlistButton from "./Wishlist";
import { USER_API_END_POINT } from "@/utils/constant";

const Member = ({ auth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personId = auth?._id;
  const { user } = useSelector((store) => store.auth);

  const params = useParams();
  const userId = params.id;
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const addToWishHandler = (product) => {
    dispatch(addToWishList(product));
    // navigate('/wishlists');
  };

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const token = localStorage.getItem("authToken");
        // console.log("Retrieved token:", token);
        if (!token) {
          console.error("No auth token found in localStorage");
          return;
        }
        const response = await axios.get(`${USER_API_END_POINT}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
          withCredentials: true,
        });

        const wishlistIds = response.data.wishlist.map((item) => item._id);
        setIsInWishlist(wishlistIds.includes(personId));
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    checkWishlist();
  }, [personId]);

  const handleWishlistToggle = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found");
        return;
      }
      const response = await axios.put(
        `${USER_API_END_POINT}/wishlist`,
        { personId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
          withCredentials: true,
        }
      
      );
      // setIsInWishlist(!isInWishlist);
      if (response.status === 200) {
        setIsInWishlist(!isInWishlist);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Failed to update wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(auth?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(auth?.createdAt)} days ago`}
        </p>
        <Button
          onClick={handleWishlistToggle}
          variant="outline"
          className={`rounded-full ${
            isInWishlist ? "bg-white-200" : "bg-white"
          }`}
          size="icon"
          disabled={loading}
        >
          <Bookmark
            style={{ fill: isInWishlist ? "BLACK" : "WHITE" }} // Change color based on wishlist status
          />
          {/* {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'} */}
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2 rounded-lg">
        <Button className="p-6 rounded-lg" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={auth?.profile?.profilePhoto} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{auth?.fullname}</h1>
          {/* <h1 className='font-medium text-lg'>{auth?.fullname}</h1> */}
          <p className="text-sm text-gray-500">{auth?.profile?.dept}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{auth?.profile?.bio}</h1>
        {/* <p className="text-sm text-gray-600 mx-1">{auth?.profile?.description}</p> */}
        <p className="text-sm text-gray-600 mx-1">
          {truncateText(auth?.profile?.description, 150)}{" "}
          {/* Adjust the character limit as needed */}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {auth?.profile?.year}
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {auth?.profile?.course}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${auth?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <a
          href={`mailto:${auth?.email}`}
          className="btn bg-slate-600 text-white hover:bg-slate-700 hover:text-gray-200"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default Member;
