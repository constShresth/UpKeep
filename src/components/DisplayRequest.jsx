import React from "react";

const DisplayRequest = ({
  selectedSlots,
  selectedAreas,
  status,
  staffName,
  requestId,
  onRequestDelete,
  onRequestUpdate,
}) => {
  const handleCancelRequest = async () => {
    try {
      console.log(requestId, typeof(requestId));
      const response = await fetch(`http://localhost:3001/resident/home?id=${requestId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Request cancelled successfully!");
        if (onRequestDelete) onRequestDelete(); // Notify parent about the update
      } else {
        console.log("Failed to cancel request. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling request:", error);
      console.log("An error occurred while cancelling the request.");
    }
  };

  const handleConfirmCompletion = async () => {
    try {
      const response = await fetch(`http://localhost:3001/resident/home?id=${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Done" }),
      });
      if (response.ok) {
        console.log("Request marked as completed!");
        if (onRequestUpdate) onRequestUpdate(); // Notify parent about the update
      } else {
        console.log("Failed to confirm completion. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming completion:", error);
      console.log("An error occurred while confirming completion.");
    }
  };

  return (
    <div className="max-w-2xl min-w-[42rem] h-2/3 border-2 rounded-lg bg-[#FFFFFF] flex flex-col justify-center items-center p-8 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-[#008080]">
        Cleaning Request
      </h2>
      <div className="mb-4 ">
        <label className="block mb-2 font-semibold text-center text-lg text-[#333333]">
          Selected Slots:
        </label>
        <div
          className={`grid gap-2 ${
            selectedSlots.length === 1
              ? "grid-cols-1 justify-center"
              : "grid-cols-2"
          }`}
        >
          {selectedSlots.map((slot) => (
            <span
              key={slot}
              className="border-2 rounded-md text-center p-2 bg-[#008080] text-white"
            >
              {slot}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-center text-lg text-[#333333]">
          Cleaning Areas:
        </label>
        <div className="flex justify-center gap-2">
          {selectedAreas.map((area) => (
            <span
              key={area}
              className="border-2 rounded-md p-2 bg-[#008080] text-white"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-[#333333]">
          Status: <span className="text-[#FF6F61]">{status}</span>
        </label>
        {status !== "Unaccepted" && (
          <label className="block text-[#333333]">
            Accepted By: <span className="text-[#FF6F61]">{staffName}</span>
          </label>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-[#f34b3c] text-white px-4 py-2 rounded-md hover:bg-[#FF4C4C]"
          onClick={() => {
            const userConfirmed = window.confirm(
              "Are you sure you want to cancel this request?"
            );
            if (userConfirmed) {
              handleCancelRequest();
            }
          }}
        >
          Cancel Request
        </button>
        <button
          className="bg-[#32CD32] text-white px-4 py-2 rounded-md hover:bg-[#28A428] disabled:opacity-50"
          onClick={() => {
            const userConfirmed = window.confirm(
              "Are you sure you want to confirm completion of this cleanig request?"
            );
            if (userConfirmed) {
              handleConfirmCompletion();
            }
          }}
          disabled={status=="Unaccepted"}
        >
          Confirm Completion
        </button>
      </div>
    </div>
  );
};

export default DisplayRequest;
