import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/wishlist`, {
          withCredentials: true,
        });
        console.log("API Response:", response.data);
        setWishlist(response.data.wishlist || []); 
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch wishlist");
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item._id}>
              <p>{item.name}</p>
              <p>{item.description}</p>
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
