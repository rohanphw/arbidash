import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { BiStopwatch } from "react-icons/bi";
import ButtonGameABI from "../abi/Button.json";
import { handlePlayOrStart, handleEndRound } from "../actions/gameActions.js";
import { useSigner } from "wagmi";
import BannerToast from "./ToastBanner";
import { FaCrown } from "react-icons/fa";
const contractAddress = "0x084E533C5BE803AdAe6734e7Eb03904075f4B2fd";

export default function ButtonComponent() {
  const [currentKing, setCurrentKing] = useState(null);
  const [totalValueLocked, setTotalValueLocked] = useState(null);
  const [roundEndsAt, setRoundEndsAt] = useState(null);
  const [isRoundActive, setIsRoundActive] = useState(null);
  const { data: signer } = useSigner();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const [state, newBanner] = BannerToast();

  const refreshState = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const buttonGame = new web3.eth.Contract(ButtonGameABI, contractAddress);
      const currentKing = await buttonGame.methods.currentKing().call();
      const totalValueLocked = await buttonGame.methods.prizePool().call();
      const roundEndsAt = await buttonGame.methods.roundEndsAt().call();
      const isRoundActive = await buttonGame.methods.isRoundActive().call();

      setCurrentKing(currentKing);
      setTotalValueLocked(totalValueLocked);
      setRoundEndsAt(roundEndsAt);
      setIsRoundActive(isRoundActive);
    }
  };

  useEffect(() => {
    refreshState();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (roundEndsAt) {
        const now = Date.now();
        const remaining = roundEndsAt * 1000 - now;
        if (remaining >= 0) {
          const seconds = Math.floor((remaining / 1000) % 60);
          const minutes = Math.floor((remaining / 1000 / 60) % 60);
          const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
          setTimeRemaining(
            (hours < 10 ? "0" : "") +
              hours +
              ":" +
              (minutes < 10 ? "0" : "") +
              minutes +
              ":" +
              (seconds < 10 ? "0" : "") +
              seconds
          );
        } else {
          setTimeRemaining("00:00:00");
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [roundEndsAt]);

  const handlePlayOrStartButton = async () => {
    if (!signer) {
      newBanner({
        message: "Wallet not connected",
        status: "error",
      });
      return;
    }

    if (!loading && signer) {
      const balance = await signer.getBalance();
      const etherBalance = Web3.utils.fromWei(balance.toString(), "ether");

      if (parseFloat(etherBalance) < 0.0005) {
        newBanner({
          message: "Insufficient balance to play. Please top up your wallet.",
          status: "error",
        });
        return;
      }

      setLoading(true);
      try {
        if (isRoundActive && timeRemaining !== "00:00:00") {
          const result = await handlePlayOrStart(signer, true);
          console.log(result);
          newBanner({
            message: "You successfully played!",
            status: "success",
          });
        } else if (!isRoundActive && timeRemaining === "00:00:00") {
          const result = await handlePlayOrStart(signer, false);
          console.log(result);
          newBanner({
            message: "You successfully started a new round!",
            status: "success",
          });
        }
        refreshState();
      } catch (error) {
        console.error("Error occurred:", error);
        newBanner({
          message: "Something went wrong!",
          status: "error",
        });
      }
      setLoading(false);
    }
  };
  const handleEndRoundButton = async () => {
    if (!signer) {
      newBanner({
        message: "Wallet not connected",
        status: "error",
      });
      return;
    }

    if (!loading && signer) {
      setLoading(true);
      try {
        if (isRoundActive && timeRemaining === "00:00:00") {
          const result = await handleEndRound(signer);
          console.log(result);
          newBanner({
            message: "You successfully ended the round!",
            status: "success",
          });
        }
        refreshState();
      } catch (error) {
        console.error("Error occurred:", error);
        newBanner({
          message: "Something went wrong!",
          status: "error",
        });
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex font-syne justify-between flex-wrap">
      <div className="flex justify-center w-full md:w-auto">
        <div className="relative w-full lg:w-auto md:w-auto xl:w-auto">
          <div className="absolute inset-0 bg-green-400 ring-1 ring-black"></div>
          <div className="relative flex-col bg-[#fcfced] -inset-x-2.5 -inset-y-2.5 flex items-center justify-center border-4 border-transparent shadow-sm font-light text-black ring-1 ring-black">
            <div className="flex flex-col w-full md:flex-row md:gap-36 lg:gap-56 xl:gap-56 px-2 py-6 justify-between">
              <div className="flex gap-3 flex-col w-full md:w-auto">
                <span className="text-l flex gap-2 font-medium">
                  <p className="font-semibold"> Current King: </p>
                  <p className="inline-block text-md font-light ">
                    {isRoundActive ? (
                      currentKing ? (
                        currentKing
                      ) : (
                        <span className="loader-t"></span>
                      )
                    ) : (
                      "Round not active"
                    )}
                    {isRoundActive && timeRemaining === "00:00:00" && (
                      <span className="ml-2 inline-block">👑</span>
                    )}
                  </p>
                </span>
                <span className="text-l flex gap-2 font-medium">
                  <p className="font-semibold"> Total Value Locked: </p>
                  <p className="inline-block text-md font-light ">
                    {isRoundActive ? (
                      totalValueLocked ? (
                        `${Web3.utils.fromWei(totalValueLocked, "ether")} ETH`
                      ) : (
                        <span className="loader-t"></span>
                      )
                    ) : (
                      "Round not active"
                    )}
                  </p>
                </span>
                <span className="text-l flex gap-2 font-medium">
                  <p className="font-semibold">Time Remaining:</p>
                  <p className="inline-block text-md font-light ">
                    {isRoundActive ? (
                      timeRemaining ? (
                        timeRemaining
                      ) : (
                        <span className="loader-t"></span>
                      )
                    ) : (
                      "Round not active"
                    )}
                  </p>
                  <BiStopwatch className="h-5 w-5 my-0.5 -mx-1 inline-block" />
                </span>
              </div>
              <div className="flex gap-3 pr-2 w-full md:w-auto mt-4 md:mt-0">
                {!isRoundActive && timeRemaining === "00:00:00" && (
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
                {timeRemaining !== "00:00:00" && (
                  <button
                    onClick={handlePlayOrStartButton}
                    className=" bg-pink-500 bg-opacity-90 hover:bg-opacity-100 px-8 text-white text-2xl ring-1 ring-black font-medium"
                  >
                    {loading ? (
                      <span className="loader p-5"></span>
                    ) : isRoundActive && timeRemaining !== "00:00:00" ? (
                      "Hit Me!"
                    ) : (
                      "Start Round"
                    )}
                  </button>
                )}
                {isRoundActive && timeRemaining === "00:00:00" && (
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
  );
}
