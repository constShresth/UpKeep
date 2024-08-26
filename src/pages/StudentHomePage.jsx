import React, { useState } from "react";

const StudentHomePage = () => {
  const [slots, setSlots] = useState([
    { slot: 1, count: 0, bool: false },
    { slot: 2, count: 0, bool: false },
    { slot: 3, count: 0, bool: false },
    { slot: 4, count: 0, bool: true },
    { slot: 5, count: 0, bool: false },
    { slot: 6, count: 4, bool: false },
  ]);
  const [bool, setBool] = useState(true);
  const toggle = (clickedSlot) => {
    setSlots(
      slots.map((item) => {
        if (item.slot === clickedSlot) {
          return { ...item, bool: !item.bool };
        } else {
          return item;
        }
      })
    );
  };

  return bool ? (
    <div className=" h-screen flex justify-center items-center bg-[#F5F5F5]">
      <div className=" h-2/3 w-2/3 border-2 rounded-md bg-[#B0C4DE] flex flex-col justify-center items-center">
        <form action="" className="flex flex-col items-center ">
          <div className="m-2">
            {slots.map((item, key) => (
              <label
                htmlFor=""
                key={key}
                className={`border-2 rounded-md p-2 m-2 cursor-pointer hover:text-slate-400 ${
                  item.bool ? "bg-neutral-500" : "bg-inherit"
                }`}
                onClick={() => toggle(item.slot)}
              >
                {item.slot}:00-{item.slot + 1}:00
              </label>
            ))}
          </div>
          <div>
            <input type="checkbox" name="Room" id=" " />
            <label htmlFor="Room">Room</label>
            <input type="checkbox" name="Washroom" id=" " />
            <label htmlFor="Room">Washroom</label>
            <input type="checkbox" name="Balcony" id=" " />
            <label htmlFor="Room">Balcony</label>
          </div>
        </form>
        <button
          className=" border-2 py-2 px-4 rounded-md hover:bg-zinc-600 bg-slate-500 "
          onClick={() => setBool((val) => !val)}
        >
          Book
        </button>
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
      <div className=" h-2/3 w-2/3 border-2 rounded-md bg-[#B0C4DE] flex flex-col justify-center items-center">
        <div className="m-4">
          <label htmlFor="">slots:</label>
          <label
            htmlFor=""
            className="border-2 rounded-md p-2 m-2 cursor-pointer hover:text-slate-400 bg-neutral-500"
          >
            1:00-2:00
          </label>
          <label htmlFor="" className="m-4">status: Pending</label>
          <label htmlFor="" className="m-4">Task: room, washroom</label>
        </div>
        <div className="flex justify-center items-center">
          <button
            className=" border-2 py-2 px-4 rounded-md hover:bg-zinc-600 bg-slate-500 m-2"
            onClick={() => setBool((val) => !val)}
          >
            Cancel
          </button>
          <button
            className=" border-2 py-2 px-4 rounded-md hover:bg-zinc-600 bg-slate-500 m-2"
            onClick={() => setBool((val) => !val)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
