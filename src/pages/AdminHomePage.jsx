import React, { useState } from 'react';

const AdminHomePage = () => {
  // Sample data for room cleaning requests
  const [requests, setRequests] = useState([
    { roomNo: 101, areas: ['Room', 'Washroom'], slot: '', status: 'Unaccepted', acceptedBy: 'Shivanshu Garg'},
    { roomNo: 102, areas: ['Room'], slot: '', status: 'Unaccepted', acceptedBy: 'Shivanshu Garg'},
    { roomNo: 103, areas: ['Room', 'Balcony'], slot: '', status: 'Time expired', acceptedBy: 'Shivanshu Garg'},
    { roomNo: 104, areas: ['Room', 'Washroom', 'Balcony'], slot: '', status: 'Accepted', acceptedBy: 'Shivanshu Garg'},
    { roomNo: 105, areas: ['Room'], slot: '', status: 'Done', acceptedBy: 'Shivanshu Garg'}
  ]);

  // Sort requests so that 'Time expired' are on top, 'Accepted' are second, 'Unaccepted' in the middle, and 'Done' at the bottom
  const sortedRequests = [...requests].sort((a, b) => {
    if (a.status === 'Time expired' && b.status !== 'Time expired') return -1;
    if (a.status === 'Accepted' && b.status === 'Unaccepted') return -1;
    if (a.status === 'Unaccepted' && b.status === 'Done') return -1;
    if (a.status === 'Done' && b.status !== 'Done') return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#333333] flex justify-center items-center">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#008080] mb-6 text-center">Cleaning Requests</h2>
        <ul className="space-y-4">
          {sortedRequests.map((request) => (
            <li key={request.roomNo} className="border-l-4 p-4 rounded-md shadow-sm" style={{
                borderColor: request.status === 'Accepted' ? '#32CD32' : request.status === 'Unaccepted' ? '#FF6F61' : request.status === 'Time expired' ? '#FF6F61' : '#008080',
                backgroundColor: request.status === 'Time expired' ? '#FFB2B2' : '#E0FFFF' // Light red background for time expired
            }}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-[#008080]">Room No: {request.roomNo}</p>
                  <p className="text-sm text-[#333333]">Areas to Clean: {request.areas.join(', ')}</p>
                  <p className="text-sm text-[#333333]">Status: {request.status}</p>
                  {request.status === 'Accepted' && (
                    <p className="text-sm text-[#333333]">Accepted by: {request.acceptedBy}</p>
                  )}
                  {request.status === 'Done' && (
                    <p className="text-sm text-[#333333]">Completed by: {request.acceptedBy}</p>
                  )}
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
                {request.status === 'Time expired' && (
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
