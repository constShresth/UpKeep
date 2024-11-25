import React from 'react'

const GenerateRequest = ({handleSubmit, timeSlots, cleaningOptions, toggleCleaningOption, toggleSlotSelection}) => {
  return (
    <div className="max-w-2xl min-w-[42rem] h-2/3 flex flex-col justify-center items-center bg-[#FFFFFF] p-8 rounded-lg shadow-lg">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-4 text-[#008080]">
              Select Your Preferred Slots
            </h2>
            <div className="mb-6 grid grid-cols-3 gap-4">
              {timeSlots.map((slot) => (
                <label
                  key={slot.slot}
                  className={`border-2 rounded-md p-2 cursor-pointer hover:bg-light-cyan ${
                    slot.selected
                      ? "bg-[#008080] text-white"
                      : "bg-[#E0FFFF] text-[#333333]"
                  }`}
                  onClick={() => toggleSlotSelection(slot.slot)}
                >
                  {slot.time}
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
            <button
              className="px-6 py-2 rounded-md bg-[#008080] text-white hover:bg-[#32CD32] shadow-md"
              type="submit"
            >
              Book
            </button>
          </form>
        </div>
  )
}

export default GenerateRequest