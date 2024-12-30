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
  const [requests, setRequests] = useState([]);
  const [todayRequestGenerated, setTodayRequestGenerated] = useState(false);

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
        if(res.allCleaningRequest){
          setRequests(res.allCleaningRequest);
        }
        if(res.data){
          setSelectedSlots(res.data.slots);
          setSelectedAreas(res.data.areas);
          setStatus(res.data.status);
          setStaffName(res.data.staff);
          setRequestId(res.data._id);
          console.log(res.data.status)
          console.log(res.data._id)
          if(res.data.status==="Done"){
            return false;
          }else {
            return true;
          };
        }
        
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
    if (slots.length == 0 || areas.length == 0) {
      alert("Please select both slots and areas.");
      return
    }
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
      setRequestId(res.id)
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
    setTodayRequestGenerated(true);
    localStorage.setItem("rgt", true);
  }
  const sortedRequests = React.useMemo(() => {
    return [...requests].sort((a, b) => {
      if (a.status === "Time Expired" && b.status !== "Time Expired") return -1;
      if (a.status === "Accepted" && b.status !== "Accepted") return -1;
      if (a.status === "Unaccepted" && b.status === "Done") return -1;
      if (a.status === "Done" && b.status !== "Done") return 1;
      return 0;
    });
  }, [requests]);

  return (
    <div className="flex flex-col min-h-screen  bg-[#F2F2F2] text-[#333333] justify-center items-center">
    <div className="my-8"></div>
      {!requestGenerated ? (
        <GenerateRequest
          handleSubmit={handleSubmit}
          timeSlots={timeSlots}
          cleaningOptions={cleaningOptions}
          toggleCleaningOption={toggleCleaningOption}
          toggleSlotSelection={toggleSlotSelection}
          todayRequestGenerated={todayRequestGenerated}
          selectedSlots={selectedSlots}
          selectedAreas={selectedAreas}
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
      <div className="my-8"></div>
      {!requests.length==0 &&(
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#008080] mb-6 text-center">Past Requests</h2>
        <ul className="space-y-4">
          {sortedRequests.map((request) => (
            <li key={request.room_no} className="border-l-4 p-4 rounded-md shadow-sm" style={{
                borderColor: request.status === 'Accepted' ? '#32CD32' : request.status === 'Unaccepted' ? '#FF6F61' : request.status === 'Time Expired' ? '#FF6F61' : '#008080',
                backgroundColor: request.status === 'Time Expired' ? '#FFB2B2' : '#E0FFFF' // Light red background for Time Expired
            }}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-[#008080]">Room No: {request.room_no}</p>
                  <p className="text-sm text-[#333333]">Areas to Clean: {request.areas.join(', ')}</p>
                  <p className="text-sm text-[#333333]">Status: {request.status}</p>
                  {request.status === 'Accepted' && (
                    <p className="text-sm text-[#333333]">Accepted by: {request.staff}</p>
                  )}
                  {request.status === 'Done' && (
                    <p className="text-sm text-[#333333]">Completed by: {request.staff}</p>
                  )}
                  <p className="text-sm text-[#333333]">Hostel: {request.hostel}</p>
                </div>
                {request.status === 'Unaccepted' && (
                  <p className="text-[#FF6F61] font-bold">Unaccepted</p>
                )}
                {request.status === 'Accepted' && (
                  <p className="text-[#32CD32] font-bold">Accepted</p>
                )}
                {request.status === 'Done' && (
                  <p className="text-[#008080] font-bold">Completed</p>
                )}
                {request.status === 'Time Expired' && (
                  <p className="text-[#FF6F61] font-bold">Time Expired</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>)}
    </div>
  );
};

export default ResidentHomePage;
