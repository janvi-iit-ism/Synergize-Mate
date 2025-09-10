import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
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
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

import WishlistTable from "./WishlistTable";
// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  // useGetSavedUsers();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { allSavedUsers } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-0 p-2">
          <div className="bg-white p-2">
            {/* Content for the first column */}

            <div className="my-5">
              <div className="flex items-center gap-3 my-2">
                <Mail />
                <span>{user?.email}</span>
              </div>

              <div className="flex items-center gap-3 my-2">
                <Github />
                {user?.profile?.github ? (
                  <a>{user?.profile?.github}</a>
                ) : (
                  <span>NA</span>
                )}
              </div>
              <div className="flex items-center gap-3 my-2">
                <CalendarCheck />
                {user?.profile?.year ? (
                  <a>{user?.profile?.year}</a>
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-3">
            {/* Content for the second column */}
            <div className="my-5">
              <div className="flex items-center gap-3 my-2">
                <GraduationCap />
                {user?.profile?.course ? (
                  <a>{user?.profile?.course}</a>
                ) : (
                  <span>NA</span>
                )}
              </div>
              <div className="flex items-center gap-3 my-2">
                <FileBadge2 />
                {user?.profile?.dept ? (
                  <a>{user?.profile?.dept}</a>
                ) : (
                  <span>NA</span>
                )}
              </div>
              <div className="flex items-center gap-3 my-2">
                <Factory />
                {user?.profile?.bio ? (
                  <a>{user?.profile?.bio}</a>
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" my-2">
          <div className="flex mb-2">
            <h1 className="text-md font-bold">Skills:</h1>
            <div className="flex items-center gap-1 mx-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex mb-2">
            <h1 className="text-md font-bold mr-2">Description:</h1>
            <div className="flex items-center gap-1 ">
              {user?.profile?.description ? (
                <a>{user?.profile?.description}</a>
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
          <div className="flex mb-2">
            <h1 className="text-md font-bold mr-2">Experience:</h1>
            <div className="flex items-center gap-1">
              {user?.profile?.experience ? (
                <a>{user?.profile?.experience}</a>
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 my-2">
          <Label className="text-md font-bold">Resume: </Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-cyan-500 w-full hover:underline cursor-pointer"
              style={{ lineHeight: "1.5" }}
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5 text-center">Saved Members</h1>
        <WishlistTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
