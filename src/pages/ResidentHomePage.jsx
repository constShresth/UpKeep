import React, { useState } from "react";

const ResidentHomePage = () => {
  // Initial states for slots and cleaning options
  const [slots, setSlots] = useState([
    { slot: 1, selected: false },
    { slot: 2, selected: false },
    { slot: 3, selected: false },
    { slot: 4, selected: false },
    { slot: 5, selected: false },
    { slot: 6, selected: false },
  ]);

  const [cleaningOptions, setCleaningOptions] = useState({
    Room: false,
    Washroom: false,
    Balcony: false,
  });

  const [requestGenerated, setRequestGenerated] = useState(false);

  // Handle slot selection toggle
  const toggleSlotSelection = (clickedSlot) => {
    setSlots(
      slots.map((slot) =>
        slot.slot === clickedSlot ? { ...slot, selected: !slot.selected } : slot
      )
    );
  };

  // Handle cleaning options toggle
  const toggleCleaningOption = (option) => {
    setCleaningOptions({
      ...cleaningOptions,
      [option]: !cleaningOptions[option],
    });
  };

  // Submit request
  const handleSubmit = async() => {
    
    setRequestGenerated(true);
  };

  return (
    <div className="flex min-h-screen  bg-[#F2F2F2] text-[#333333] justify-center items-center">
      {!requestGenerated ? (
        <div className="max-w-2xl min-w-[42rem] h-2/3 flex flex-col justify-center items-center bg-[#FFFFFF] p-8 rounded-lg shadow-lg">
          <form className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-[#008080]">
              Select Your Preferred Slots
            </h2>
            <div className="mb-6 grid grid-cols-3 gap-4">
              {slots.map((slot) => (
                <label
                  key={slot.slot}
                  className={`border-2 rounded-md p-2 cursor-pointer hover:bg-light-cyan ${
                    slot.selected
                      ? "bg-[#008080] text-white"
                      : "bg-[#E0FFFF] text-[#333333]"
                  }`}
                  onClick={() => toggleSlotSelection(slot.slot)}
                >
                  {slot.slot}:00 - {slot.slot + 1}:00
                </label>
              ))}
            </div>

            <h2 className="text-lg font-semibold mb-4 text-[#008080]">
              What to Clean?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {Object.keys(cleaningOptions).map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option}
                    checked={cleaningOptions[option]}
                    onChange={() => toggleCleaningOption(option)}
                  />
                  <label htmlFor={option} className="ml-2">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </form>
          <button
            className="px-6 py-2 rounded-md bg-[#008080] text-white hover:bg-[#32CD32] shadow-md"
            onClick={handleSubmit}
          >
            Book
          </button>
        </div>
      ) : (
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
                slots.filter((slot) => slot.selected).length === 1
                  ? "grid-cols-1 justify-center"
                  : "grid-cols-2"
              }`}
            >
              {slots
                .filter((slot) => slot.selected)
                .map((slot) => (
                  <span
                    key={slot.slot}
                    className="border-2 rounded-md text-center p-2 bg-[#008080] text-white"
                  >
                    {slot.slot}:00 - {slot.slot + 1}:00
                  </span>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-center text-lg text-[#333333]">
              Cleaning Areas:
            </label>
            <div className="flex justify-center gap-2">
              {Object.entries(cleaningOptions)
                .filter(([option, isSelected]) => isSelected)
                .map(([option]) => (
                  <span
                    key={option}
                    className="border-2 rounded-md p-2 bg-[#008080] text-white"
                  >
                    {option}
                  </span>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[#333333]">
              Status: <span className="text-[#FF6F61]">Pending</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentHomePage;
