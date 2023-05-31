import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { BiStopwatch } from "react-icons/bi";
import ButtonGameABI from "../abi/ButtonGame.json";
import { handlePlayOrStart, handleEndRound } from "../actions/gameActions.js";
import { useSigner } from "wagmi";
const contractAddress = "0x69f3Dbe29496CDe8910856bF6B32fD6299aB3A41";

export default function ButtonComponent() {
  const [currentKing, setCurrentKing] = useState(null);
  const [totalValueLocked, setTotalValueLocked] = useState(null);
  const [roundEndsAt, setRoundEndsAt] = useState(null);
  const [isRoundActive, setIsRoundActive] = useState(null);
  const { data: signer } = useSigner();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const interval = setInterval(() => {
      if (roundEndsAt) {
        const now = Date.now();
        const remaining = roundEndsAt * 1000 - now;
        if (remaining >= 0) {
          const minutes = Math.floor((remaining / 1000 / 60) % 60);
          const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
          setTimeRemaining(
            (hours < 10 ? "0" : "") +
              hours +
              ":" +
              (minutes < 10 ? "0" : "") +
              minutes
          );
        } else {
          setTimeRemaining("00:00");
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [roundEndsAt]);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const buttonGame = new web3.eth.Contract(ButtonGameABI, contractAddress);
      buttonGame.methods.currentKing().call().then(setCurrentKing);
      buttonGame.methods.prizePool().call().then(setTotalValueLocked);
      buttonGame.methods.roundEndsAt().call().then(setRoundEndsAt);
      buttonGame.methods.isRoundActive().call().then(setIsRoundActive);
    }
  }, []);

  const handlePlayOrStartButton = async () => {
    if (!loading) {
      setLoading(true); // Start loading
      if (isRoundActive && timeRemaining !== "00:00") {
        await handlePlayOrStart(signer, true);
      } else if (!isRoundActive && timeRemaining === "00:00") {
        await handlePlayOrStart(signer, false);
      }
      setLoading(false); // End loading
    }
  };

  const handleEndRoundButton = async () => {
    if (!loading) {
      setLoading(true); // Start loading
      if (isRoundActive && timeRemaining === "00:00") {
        await handleEndRound(signer);
      }
      setLoading(false); // End loading
    }
  };
  return (
    <div className="flex font-syne justify-between">
      <div className="flex justify-center">
        <div className="hidden lg:flex md:flex xl:flex">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 ring-1 ring-black"></div>
            <div className="relative bg-[#fcfced] -inset-x-2.5 -inset-y-2.5 flex items-center justify-center border-4 border-transparent shadow-sm font-light text-black ring-1 ring-black">
              <div className="flex flex-col">
                <div className="flex flex-row gap-56 px-4 py-6 justify-between">
                  <div className="flex gap-3 flex-col">
                    <span className="text-l flex gap-2 font-medium">
                      <p className="font-semibold"> Current King: </p>
                      <p className="inline-block text-md font-light ">
                        {isRoundActive ? (
                          currentKing ? (
                            currentKing
                          ) : (
                            <span className="loader"></span>
                          )
                        ) : (
                          "Round not active"
                        )}
                      </p>
                    </span>
                    <span className="text-l flex gap-2 font-medium">
                      <p className="font-semibold"> Total Value Locked: </p>
                      <p className="inline-block text-md font-light ">
                        {isRoundActive ? (
                          totalValueLocked ? (
                            `${Web3.utils.fromWei(
                              totalValueLocked,
                              "ether"
                            )} ETH`
                          ) : (
                            <span className="loader"></span>
                          )
                        ) : (
                          "Round not active"
                        )}
                      </p>
                    </span>
                    <span className="text-l flex gap-2 font-medium">
                      <p className="font-semibold">Time Remaining:</p>
                      <p className="inline-block text-md font-light ">
                        {isRoundActive
                          ? timeRemaining
                            ? timeRemaining
                            : "Loading..."
                          : "Round not active"}
                      </p>
                      <BiStopwatch className="h-5 w-5 mb-[0.5px] inline-block" />
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {!isRoundActive && timeRemaining === "00:00" && (
                      <button
                        onClick={handlePlayOrStartButton}
                        className=" bg-pink-500 bg-opacity-90 hover:bg-opacity-100 px-8 text-white text-2xl ring-1 ring-black font-medium"
                      >
                        {loading ? (
                          <span className="loader p-5"></span>
                        ) : (
                          "Start Round"
                        )}
                      </button>
                    )}
                    {timeRemaining !== "00:00" && (
                      <button
                        onClick={handlePlayOrStartButton}
                        className=" bg-pink-500 bg-opacity-90 hover:bg-opacity-100 px-8 text-white text-2xl ring-1 ring-black font-medium"
                      >
                        {loading ? (
                          <span className="loader p-5"></span>
                        ) : isRoundActive && timeRemaining !== "00:00" ? (
                          "Hit Me!"
                        ) : (
                          "Start Round"
                        )}
                      </button>
                    )}
                    {isRoundActive && timeRemaining === "00:00" && (
                      <button
                        onClick={handleEndRoundButton}
                        className=" bg-pink-500 bg-opacity-90 hover:bg-opacity-100 px-8 text-white text-2xl ring-1 ring-black font-medium"
                      >
                        {loading ? (
                          <span className="loader p-5"></span>
                        ) : (
                          "End Round"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}