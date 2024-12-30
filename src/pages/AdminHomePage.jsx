import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminHomePage = () => {
  const {email} = useAuth();
  const [hostelName, setHostelName] = useState("");
  
  // Sample data for room cleaning requests
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/home?hostel=${hostelName}`) 
      if (!response.ok) {
        throw new Error("Failed to fetch required data");
      }
      const res = await response.json();
      // setData(result); // Store fetched data
      // console.log(typeof(res.data))
      console.log(res.data[0])
      setRequests(res.data);
      console.log(res.message)

    }catch (error) {
      console.error("Error fetching data:", error);
      // alert("Failed to fetch data. Please try again.");
    }
  };

  const fetchUserDetails = async () => {
    try {
      console.log("email", email);
      const response = await fetch(
        `http://localhost:3001/admin/home?email=${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch admin's data");
      }
      const res = await response.json();
      // console.log(res)
      // console.log(res.data.roll_no)
      // console.log(res.data.room_no)
      console.log(res.data.hostel_name)
      setHostelName(res.data.hostel_name)
    } catch (err) {
      console.error("Error during fetching admin's data", err);
    }
  };
  
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if(hostelName==="")fetchUserDetails();
  }, [])

  useEffect(() => {
    fetchData();
  }, [hostelName])
  

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
    <div className="min-h-screen bg-[#F2F2F2] text-[#333333] flex justify-center items-center">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#008080] mb-6 text-center">Cleaning Requests</h2>
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
      </div>
    </div>
  );
};

export default AdminHomePage;
