import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DisplayRequest from "../components/DisplayRequest";
import GenerateRequest from "../components/GenerateRequest";

const ResidentHomePage = () => {
  const { email } = useAuth();
  const [timeSlots, setTimeSlots] = useState([
    { slot: 1, selected: false, time: "9:00 AM - 10:00 AM" },
    { slot: 2, selected: false, time: "10:00 AM - 11:00 AM" },
    { slot: 3, selected: false, time: "11:00 AM - 12:00 PM" },
    { slot: 4, selected: false, time: "12:00 PM - 1:00 PM" },
    { slot: 5, selected: false, time: "1:00 PM - 2:00 PM" },
    { slot: 6, selected: false, time: "2:00 PM - 3:00 PM" },
  ]);

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [requestGenerated, setRequestGenerated] = useState(false);
  const [status, setStatus] = useState("");
  const [staffName, setStaffName] = useState("");
  const [requestId, setRequestId] = useState("");

  const [cleaningOptions, setCleaningOptions] = useState({
    Room: false,
    Washroom: false,
    Balcony: false,
  });

  const toggleSlotSelection = (clickedSlot) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.slot === clickedSlot ? { ...slot, selected: !slot.selected } : slot
      )
    );
  };

  const toggleCleaningOption = (option) => {
    setCleaningOptions({
      ...cleaningOptions,
      [option]: !cleaningOptions[option],
    });
  };

  useEffect(() => {
    console.log(rollNo);
    const fetchData = async () => {
      if (rollNo === "") await fetchUserDetails();
      console.log("rollNo", rollNo);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // const bool = await localStorage.getItem("requestGenerated");
      // console.log("bool",bool)
      const response = await fetchRequestDetails();
      const bool = response;
      if (requestGenerated != bool) setRequestGenerated(bool);
      console.log("requestGenerated", requestGenerated);
      setIsLoading(false);
    };
    fetchData();
  }, [rollNo]);
  // useEffect(() => {
  //   if(selectedSlots && selectedSlots.length>0) setIsLoading(false);
  //   console.log(selectedSlots)
  // }, [selectedSlots, selectedAreas])

  const fetchRequestDetails = async () => {
    try {
      console.log(rollNo, typeof rollNo);
      const response = await fetch(
        `http://localhost:3001/resident/home?roll_no=${rollNo}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch your cleaning request");
      }
      const res = await response.json();
      console.log(response);
      // console.log(res)
      // console.log("res.slots",res.slots)
      if (response.status == 200) {
        setSelectedSlots(res.data.slots);
        setSelectedAreas(res.data.areas);
        setStatus(res.data.status);
        setStaffName(res.data.staff);
        setRequestId(res.data._id);
        console.log(res.data.status)
        if(res.data.status==="Done"){
          return false;
        }else {
          return true;
        };
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error during fetching request details", err);
    }
  };

  const fetchUserDetails = async () => {
    try {
      console.log("email", email);
      const response = await fetch(
        `http://localhost:3001/resident/home?email=${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch resident's data");
      }
      const res = await response.json();
      // console.log(res)
      // console.log(res.data.roll_no)
      // console.log(res.data.room_no)
      // console.log(res.data.hostel)
      setRollNo(res.data.roll_no);
      setRoomNo(res.data.room_no);
      setHostelName(res.data.hostel);
    } catch (err) {
      console.error("Error during fetching resident's data", err);
    }
  };

  // Submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roll_no = rollNo;
    console.log(rollNo);
    const slots = timeSlots
      .filter((slot) => slot.selected)
      .map((slot) => slot.time);
    const areas = Object.keys(cleaningOptions).filter(
      (key) => cleaningOptions[key]
    );
    const floor = String(roomNo)[0];
    console.log(floor);
    const hostel = hostelName;
    const room_no = roomNo;
    setSelectedSlots(slots);
    setSelectedAreas(areas);
    setStatus("Unaccepted");
    console.log(slots);
    console.log(areas);
    try {
      console.log("handlesubmit");
      const response = await fetch("http://localhost:3001/resident/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roll_no, slots, areas, floor, hostel, room_no }), // Include selected role
      });
      if (!response.ok) {
        throw new Error("Failed to add data");
      }
      const res = await response.json();
      console.log(res.message);
    } catch (err) {
      console.error("Error during adding data:", err);
    }
    setRequestGenerated(true);
    // localStorage.setItem("requestGenerated", true);
  };

  const onRequestDelete = ()=>{
    setSelectedSlots([]);
    setSelectedAreas([]);
    setStatus("");
    setRequestGenerated(false);
  }
  
  const onRequestUpdate = ()=>{
    setSelectedSlots([]);
    setSelectedAreas([]);
    setStatus("");
    setRequestGenerated(false);
  }

  return (
    <div className="flex min-h-screen  bg-[#F2F2F2] text-[#333333] justify-center items-center">
      {!requestGenerated ? (
        <GenerateRequest
          handleSubmit={handleSubmit}
          timeSlots={timeSlots}
          cleaningOptions={cleaningOptions}
          toggleCleaningOption={toggleCleaningOption}
          toggleSlotSelection={toggleSlotSelection}
        />
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <DisplayRequest
          selectedSlots={selectedSlots}
          selectedAreas={selectedAreas}
          status={status}
          staffName={staffName}
          requestId={requestId}
          onRequestDelete={onRequestDelete}
          onRequestUpdate={onRequestUpdate}
        />
      )}
    </div>
  );
};

export default ResidentHomePage;
