import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import authSlice, { setSingleUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Contact,
  Mail,
  Pen,
  MapPin,
  Github,
  GraduationCap,
  CalendarCheck,
  FileBadge2,
  Factory,
} from "lucide-react";

const isResume = true;


const MemberDescription2 = () => {
  const { singleUser } = useSelector((store) => store.auth);
  
  const { user } = useSelector((store) => store.auth);


  const params = useParams();

  const userId = params.id;
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        // console.log("Fetching user with ID:", userId);
        const res = await axios.get(`${USER_API_END_POINT}/get/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
          withCredentials: true,
        });
        if (res.data.success) {
          // console.log("Fetched user data:", res.data.user);
          dispatch(setSingleUser(res.data.user));
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleUser();
  }, [userId, dispatch]);

 

  return (
    <div className="bg-slate-100">
    <div className="max-w-7xl mx-auto">
    {singleUser ? (
        <>
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4 my-8">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={singleUser?.profile?.profilePhoto}
              alt="profile"
            />
          </Avatar>
          <div>
            <h1 className="font-BOLD text-xl">{singleUser?.fullname}</h1>
            <p>{singleUser?.profile?.bio}</p>
          </div>
        </div>

      </div>
      <h1 className="border-b-2 border-b-gray-300 font-sm py-2">
        User Description
      </h1>

      <div className="grid grid-cols-2 gap-0 p-4">
        {/* First Column */}
        <div className=" grid grid-rows-2 gap-0">
            <div className="bg-slate-400 p-4 rounded-xl shadow-lg">
            <h1>About</h1>
            <div className="border-t-2 w-1/6 border-black"></div>
            <div className="flex items-center gap-3 my-2">
              <Mail/>
              <span>{singleUser?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <Github />
              {singleUser?.profile?.github ? (
                <a>{singleUser?.profile?.github}</a>
              ) : (
                <span>NA</span>
              )}
            </div>
            <div className="flex items-center gap-3 my-2">
              <CalendarCheck />
              {singleUser?.profile?.year ? (
                <a>{singleUser?.profile?.year}</a>
              ) : (
                <span>NA</span>
              )}
            </div>
            <div className="flex items-center gap-3 my-2">
              <GraduationCap />
              {singleUser?.profile?.course ? (
                <a>{singleUser?.profile?.course}</a>
              ) : (
                <span>NA</span>
              )}
            </div>
            <div className="flex items-center gap-3 my-2">
              <FileBadge2 />
              {singleUser?.profile?.dept ? (
                <a>{singleUser?.profile?.dept}</a>
              ) : (
                <span>NA</span>
              )}
            </div>
            <div className="flex items-center gap-3 my-2">
              <Factory />
              {singleUser?.profile?.bio ? (
                <a>{singleUser?.profile?.bio}</a>
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>

           
          
        </div>
            
          
       

        {/* Second Column */}
        <div className="grid grid-rows-2 gap-0">
          <div className="bg-slate-100 p-4">
          <h1 >Resume</h1>
          <div className="border-t-2 w-1/6 border-black"></div>
          {isResume ? (
            <a
              target="blank"
              href={singleUser?.profile?.resume}
              className="text-cyan-500 w-full hover:underline cursor-pointer"
              style={{ lineHeight: "1.5" }}
            >
              {singleUser?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
          <h1 className="mt-3">Skills</h1>
          <div className="border-t-2 w-1/6 border-black"></div>
          <div className="flex items-center gap-1 pl-2">
            {singleUser?.profile?.skills.length !== 0 ? (
              singleUser.profile.skills.join(", ")
            ) : (
              <span>NA</span>
            )}
          </div>
          
          <h1 className="mt-3">Experience</h1>
          <div className="border-t-2 w-1/6 border-black"></div>
          <span className="pl-2 font-normal text-gray-800">
            {singleUser?.profile?.experience}{" "}
          </span>
          <h1 className="mt-3">Description</h1>
          <div className="border-t-2 w-1/6 border-black"></div>
          <span className="pl-2 font-normal text-gray-800">
            {singleUser?.profile?.description}
          </span>
          </div>
        </div>
      </div>
      </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default MemberDescription2;
