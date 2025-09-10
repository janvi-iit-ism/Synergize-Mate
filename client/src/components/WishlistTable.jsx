import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { USER_API_END_POINT } from "@/utils/constant";

const WishlistTable = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${USER_API_END_POINT}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });
        // console.log("API Response:", response.data);
      
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
      <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-xl">
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Date</TableHead> */}
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Bio</TableHead>
            <TableHead className="text-right">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlist.length === 0 ? (
            <span>You haven't saved any member yet.</span>
          ) : (
            wishlist.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.fullname}</TableCell>
                <TableCell>{item?.profile?.dept}</TableCell>
                <TableCell>{item?.profile?.bio}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="text-cyan-600 underline"
                    onClick={() => navigate(`/description/${item._id}`)}
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WishlistTable;
