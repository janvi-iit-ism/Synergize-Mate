import React, { useRef, useState } from "react";
import meeting from "./CardsImg/meeting.png";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel";
import innovate from "./CardsImg/innovate.png";
import execute from "./CardsImg/execute.png";
import evolve from "./CardsImg/evolve.png";
import collaborate from "./CardsImg/collaborate.png";

const HeroSection = () => {
  const { user } = useSelector((store) => store.auth);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "AI/ML Developer",
    "Other",
  ];

  const services = [
    {
      id: 1,
      title: "Innovate",
      description:
        "Develop creative solutions and groundbreaking ideas to stay ahead of the curve.",
      image: innovate,
    },
    {
      id: 2,
      title: "Collaborate",
      description:
        "Work together seamlessly to achieve common goals and enhance productivity.",
      image: collaborate,
    },
    {
      id: 3,
      title: "Execute",
      description:
        "Implement plans effectively to ensure successful and reliable results. ",
      image: execute,
    },
    {
      id: 4,
      title: "Evolve",
      description:
        "Continuously adapt and improve to meet new challenges and opportunities.",
      image: evolve,
    },
  ];

  const searchUserHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  const searchUserSignup = () => {
    // dispatch(setSearchedQuery(query));
    navigate("/signup");
  };

  return (
    // <div>
    <>
      <div className="relative h-[800px] bg-white">
        <div className=" flex min-h-screen mx-auto max-w-7xl">
          {/* <!-- Left Section (3/4th of the page) --> */}
          <div className="w-2/3 bg-white-500 p-4 ">
            <div className="flex flex-col gap-5 my-10">
              <span className="flex w-56 px-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
                No. 1 Partner Hunt Website
              </span>
              <h1 className="text-5xl font-bold leading-tight  whitespace-normal">
                Register, Search & <br /> Get Your{" "}
                <span className="text-red-500">Ideal Partner</span>
              </h1>
              <div className="border-t-2 w-1/6 border-black"></div>
              <p class="flex w-[82%] font-body items-left gap-4 ">
                The ultimate platform for finding the perfect collaborator for
                your next big project. Whether you're an entrepreneur, a
                developer, a designer, or a creative professional,
                ProjectPartner connects you with like-minded individuals who
                complement your skills and share your vision.
              </p>
              <form className="w-[500px] relative">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Type Here"
                    className="mx-auto w-2/3 p-3 border-1 border-gray-950 rounded-full placeholder-text-black-600 bg-white-300 pr-12 "
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {user ? (
                    <>
                      <button
                        onClick={searchUserHandler}
                        className="absolute top-1/2 -translate-y-1/2 p-3 bg-slate-700 rounded-full"
                        style={{ right: "170px" }}
                      >
                        <AiOutlineSearch className="text-white" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={searchUserHandler}
                        className="absolute top-1/2 -translate-y-1/2 p-3 bg-slate-700 rounded-full"
                        style={{ right: "170px" }}
                      >
                        <AiOutlineSearch className="text-white" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={searchUserSignup}
                    className="absolute top-1/2 -translate-y-1/2 p-3 bg-slate-700 rounded-full"
                    style={{ right: "170px" }}
                  >
                    <AiOutlineSearch className="text-white" />
                  </button>
                </div>
              </form>
            </div>
            <CategoryCarousel />
          </div>

          {/* <!-- Right Section (1/4th of the page) --> */}
          <div class="w-1/3 bg-white-300 p-4">
            <img
              src={meeting}
              alt="description"
              className="max-w-full h-auto mt-24"
            />
          </div>
        </div>
      </div>
      <div className="flex  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto max-w-7xl gap-0 -translate-y-16 ">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 text-center w-full h-full rounded-none shadow-none cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-slate-600 transition-all duration-300 flex items-center justify-center bg-slate-400"
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className=" mb-4 h-14 w-14 rounded-sm ">
                <img src={service.image} alt="Placeholder" className="ml-2" />
              </div>
              <h4 className="text-2xl font-bold text-neutralDgrey mb-2 px-2">
                {service.title}
              </h4>
              <p className="text-sm text-neutralGrey">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroSection;
