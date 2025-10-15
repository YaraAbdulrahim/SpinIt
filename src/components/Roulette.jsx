import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

function Roulette() {

  // State for the data that will be shown on the wheel
  const [data, setData] = useState([
    { option: 'Yes' },
    { option: 'NO' },
  ]);

  // State for the input box
  const [inputValue, setInputValue] = useState("");

  // Wheel state (winning number, spinning)
  const [PrizeNumber, setPrizeNumber] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  // Function to spin the wheel
  function spinWheel() {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setHasSpun(true); // to know that the spin button was pressed
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:justify-evenly mt-8">

      {/* Wheel and result display */}
      <div className="md:mr-28 mr-6 flex flex-col items-center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={PrizeNumber}
          data={data}
          backgroundColors={["#00a3e0", "#00479c"]}
          textColors={["#fff"]}
          onStopSpinning={() => setMustSpin(false)}
          pointerColor="#00FF00"
          radiusLineColor="white"
          outerBorderColor="white"
          radiusLineWidth={4}
        />

        {/* Spin button */}
        <button
          onClick={spinWheel}
          disabled={data.length === 0} // can't spin if data is empty
          className={`mt-6 rounded-3xl px-6 py-3 text-white font-bold shadow-md
            ${data.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"}`}
        >
          Spin
        </button>

        {/* Display result after spinning */}
        {hasSpun && !mustSpin && data.length > 0 && (
          <p className="mt-6 text-3xl md:text-4xl font-extrabold text-center text-white">
            The Winner is :
            <span
              className="ml-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg"
            >
              {data[PrizeNumber].option}
            </span>
            🎉
          </p>
        )}
      </div>

      {/* Right column: input box + Add button + list */}
      <div className="flex w-full flex-col h-[600px] items-center justify-center">

        {/* Input box + Add button */}
        <div className="flex md:ml-0 items-center mt-14  mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Input text here...."
            className="border-2 border-blue-950 p-2 w-96 rounded flex-1 focus:outline-none focus:border-blue-700"
          />

          <button
            onClick={() => {
              if (inputValue.trim() !== "") {
                setData([...data, { option: inputValue }]);
                setInputValue("");
              }
            }}
            className="ml-2 bg-blue-900 text-white font-bold shadow-md rounded-3xl px-4 py-2 hover:bg-blue-800 transition"
          >
            Add
          </button>
        </div>

        {/* List of inputs */}

        <div className="bg-white/20 backdrop-blur-md mx-auto w-full p-4 rounded-xl shadow-lg overflow-y-auto ">
          <h2 className="text-blue-950 text-xl font-bold mb-3 text-center">INPUTS</h2>
          {data.length === 0 ? (
            <p className="text-white text-center"> Not have value here !</p>
          ) : (
            <ul className="space-y-2">
              {data.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 text-blue-950 px-3 py-2 rounded-lg shadow-md"
                >
                  <span>{item.option}</span>
                  <button
                    onClick={() => {
                      const newData = data.filter((_, i) => i !== index);
                      setData(newData);
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-2 rounded-lg"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Roulette;
