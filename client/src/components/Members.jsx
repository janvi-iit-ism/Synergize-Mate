import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Member from "./Member";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setSearchedQuery } from "@/redux/authSlice";
import useGetAllUsers from "@/hooks/useGetAllUsers";

const Members = () => {
  useGetAllUsers();
  const { allUsers, searchedQuery } = useSelector((store) => store.auth);
  // allJobs= allUsers
  // filteredJobs= filteredUsers
  // filterJobs =filterUsers
  // setFilterJobs =setFilterUsers
  // job= auth
  const [filterUsers, setFilterUsers] = useState(allUsers);

  useEffect(() => {
    // console.log('allUsers1:', allUsers); // Check if allUsers is populated
    // console.log('searchedQuery1:', searchedQuery);

    if (searchedQuery) {
      const filteredUsers = allUsers.filter((auth) => {
        return (
          auth.profile?.bio?.includes(searchedQuery) ||
          auth.profile?.dept?.includes(searchedQuery) ||
          auth.profile?.year?.includes(searchedQuery) ||
          auth.profile?.course?.includes(searchedQuery)
        );
      });
      setFilterUsers(filteredUsers);
    } else {
      setFilterUsers(allUsers);
    }
  }, [allUsers, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-1">
          <div className="w-15%">
            <FilterCard />
          </div>
          {filterUsers.length <= 0 ? (
            <span>Member not found</span>
          ) : (
            <div className="flex-1 h-[88vh] pb-5 custom-scroll">
              <div className="grid grid-cols-3 gap-4">
                {filterUsers.map((auth) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={auth?._id}
                  >
                    <Member auth={auth} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
