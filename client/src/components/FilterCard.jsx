import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/authSlice";

const fitlerData = [
  {
    fitlerType: "Department",
    array: [
      "Computer Science",
      "Mechanical ",
      "Electrical",
      "Civil",
      "Electronics",
      "Environmental",
      "Metallurgical",
      "Mining",
      "Petroleum",
      "Applied Geology",
      "Applied Geophysics",
      "Humanities ",
      "Management Studies",
      "Mathematics",
    ],
  },
  {
    fitlerType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Science",
      "Graphic Designer",
      "AI/ML Developer",
      "Other",
    ],
  },
  {
    fitlerType: "Course",
    array: ["B.Tech", "M.Tech", "Ph.D", "MBA", "Integrated M.Tech"],
  },
  {
    fitlerType: "Year",
    array: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  const departmentChangeHandler = (event) => {
    setSelectedDepartment(event.target.value);
  };

  useEffect(() => {
    // console.log(selectedValue);
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  useEffect(() => {
    // if (selectedDepartment) {
    dispatch(setSearchedQuery(selectedDepartment));
    // }
  }, [selectedDepartment, dispatch]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Members</h1>
      <hr className="mt-3" />
      {fitlerData.map((data, index) => (
        <div key={index} className="mt-4">
          <h1 className="font-bold text-lg">{data.fitlerType}</h1>
          {data.fitlerType === "Department" ? (
            <select
              className="w-full p-2 mt-2 bg-white border rounded-md"
              value={selectedDepartment}
              onChange={departmentChangeHandler}
            >
              <option value="">Select Department</option>
              {data.array.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
                // const itemId = id${index}-${idx};
                // return (
                //   <div key={itemId} className='flex items-center space-x-2 my-0.5'>
                //     {/* <RadioGroupItem value={item} id={itemId} /> */}
                //     <Label htmlFor={itemId}>{item}</Label>
                //   </div>
                // );
              ))}
            </select>
          ) : (
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 my-0.5"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
