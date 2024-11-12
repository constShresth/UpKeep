import React, { useState } from "react";

const StaffHomePage = () => {
  const [selectedHostel, setSelectedHostel] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedHostel && selectedFloor) {
      // fetchData();
      setBool(true)
    } else {
      alert("Please select both hostel and floor.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/http://localhost:3001?hostel=${selectedHostel}&floor=${selectedFloor}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      // setData(result); // Store fetched data
      setRequests(result);
      setBool(true); // Trigger any action you need with `bool`
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    }
  };

  const [requests, setRequests] = useState([
    {
      roomNo: 101,
      areas: ["Room", "Washroom"],
      slot: "",
      status: "Unaccepted",
    },
    { roomNo: 102, areas: ["Room"], slot: "", status: "Unaccepted" },
    {
      roomNo: 103,
      areas: ["Room", "Balcony"],
      slot: "",
      status: "Time Expired",
    },
    {
      roomNo: 104,
      areas: ["Room", "Washroom", "Balcony"],
      slot: "",
      status: "Accepted",
    },
    { roomNo: 105, areas: ["Room"], slot: "", status: "Done" },
  ]);

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
  ];

  const [bool, setBool] = useState(false);

  const hostels = ["Hostel-A", "Hostel-B", "Hostel-C", "Hostel-D", "Hostel-O"];
  const floors = [
    "1st Floor",
    "2nd Floor",
    "3rd Floor",
    "4th Floor",
    "5th Floor",
    "6th Floor",
    "7th Floor",
    "8th Floor",
  ];

  const handleSlotChange = (roomNo, slot) => {
    setRequests(
      requests.map((request) =>
        request.roomNo === roomNo ? { ...request, slot: slot } : request
      )
    );
  };

  const acceptRequest = (roomNo) => {
    setRequests(
      requests.map((request) =>
        request.roomNo === roomNo ? { ...request, status: "Accepted" } : request
      )
    );
  };

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
    <div className="min-h-screen bg-[#F2F2F2] text-[#333333] flex flex-col items-center">
      <div className="w-full h-1/3 max-w-3xl p-6 bg-white rounded-lg shadow-md mt-4">
        <form
          className="flex flex-col items-center mb-6"
          onSubmit={handleSubmit}
        >
          <div className="flex space-x-4 mb-4">
            <select
              className="w-40 p-2 rounded-md border border-gray-300 shadow-sm"
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
            >
              <option value="">Select hostel</option>
              {hostels.map((hostel, index) => (
                <option key={index} value={hostel}>
                  {hostel}
                </option>
              ))}
            </select>
            <select
              className="w-40 p-2 rounded-md border border-gray-300 shadow-sm"
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
            >
              <option value="">Select floor</option>
              {floors.map((floor, index) => (
                <option key={index} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-[#008080] text-white px-4 py-2 rounded-md hover:bg-[#006666] disabled:opacity-50"
            type="submit"
            disabled={!selectedHostel || !selectedFloor}
          >
            Submit
          </button>
        </form>
      </div>

      {bool && (
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md mt-4">
          <h2 className="text-3xl font-bold text-[#008080] mb-6 text-center">
            Cleaning Requests
          </h2>
          <ul className="space-y-4">
            {sortedRequests.map((request) => (
              <li
                key={request.roomNo}
                className={`border-l-4 p-4 rounded-md shadow-sm ${
                  request.status === "Accepted"
                    ? "bg-[#E0FFFF]"
                    : request.status === "Done"
                    ? "bg-[#c4e4c4]"
                    : request.status === "Time Expired"
                    ? "bg-[#FFB2B2]" // Light red background for time expired
                    : "bg-white"
                }`}
                style={{
                  borderColor:
                    request.status === "Accepted"
                      ? "#32CD32"
                      : request.status === "Unaccepted"
                      ? "#FF6F61"
                      : request.status === "Time Expired"
                      ? "#FF6F61"
                      : "#008080",
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold text-[#008080]">
                      Room No: {request.roomNo}
                    </p>
                    <p className="text-sm text-[#333333]">
                      Areas to Clean: {request.areas.join(", ")}
                    </p>
                    <p className="text-sm text-[#333333]">
                      Status: {request.status}
                    </p>
                  </div>
                  {request.status === "Unaccepted" && (
                    <div className="flex flex-col items-end">
                      <label
                        htmlFor={`slot-${request.roomNo}`}
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Select a Time Slot
                      </label>
                      <select
                        id={`slot-${request.roomNo}`}
                        value={request.slot}
                        onChange={(e) =>
                          handleSlotChange(request.roomNo, e.target.value)
                        }
                        className="block p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#008080] focus:border-[#008080] sm:text-sm mb-2"
                      >
                        <option value="">Select a slot</option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <button
                        className={`bg-[#32CD32] text-white px-4 py-2 rounded-md hover:bg-[#28A828] ${
                          request.slot === ""
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={request.slot === ""}
                        onClick={() => acceptRequest(request.roomNo)}
                      >
                        Accept Request
                      </button>
                    </div>
                  )}
                  {request.status === "Accepted" && (
                    <p className="text-[#32CD32] font-bold">Accepted</p>
                  )}
                  {request.status === "Done" && (
                    <p className="text-[#008080] font-bold">Completed</p>
                  )}
                  {request.status === "Time Expired" && (
                    <p className="text-[#FF6F61] font-bold">Time Expired</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StaffHomePage;
