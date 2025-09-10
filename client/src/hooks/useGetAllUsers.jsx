import { USER_API_END_POINT } from "@/utils/constant";
import { setAllUsers } from "@/redux/authSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllUsers = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token 
      if (!token) {
        console.error("No auth token found in localStorage");
        return;
      }
      try {
        //    const res= await axios.get(`${USER_API_END_POINT}/get`, {withCredentials:true});
        const res = await axios.get(
          // `${USER_API_END_POINT}/get?keyword=${searchedQuery}`,
          `${USER_API_END_POINT}/get?keyword=${searchedQuery || ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
            withCredentials: true, // Include credentials if needed
          }
          // { withCredentials: true }
        );
        //    console.log('API response1:', res.data.users);

  
        if (res.data.success) {
          // console.log('Fetched users:', res.data);
          dispatch(setAllUsers(res.data.users));
        }
        else {
          console.log("Failed to fetch users:", res.data.message);
        }
      } catch (error) {
        // console.log(error);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Error response from API:", error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
        } else {
          // Something happened while setting up the request
          console.error("Error setting up request:", error.message);
        }
      }
    };
    fetchAllUsers();
  }, [dispatch, searchedQuery]);
};

export default useGetAllUsers;
