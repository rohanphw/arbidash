import { ConnectKitButton } from "connectkit";
import Arbitrum from "../assets/arbitrum-logo.png";
import { useEffect } from "react";


export default function HeaderComponent() {
  return (
    <div className="h-[25vh] bg-dotted bg-opacity-10 font-space bg-[#fcfced]">
      <div className="flex justify-between flex-row px-24 py-20">
        <div className="flex flex-col">
          <h1 className="text-5xl font-syne text-gray-900 font-bold">
            ArbiDash
          </h1>
          <h1 className="text-xl font-syne text-gray-500 font-medium">
            A social experiment on Arbitrum One{" "}
            <img
              alt="arb logo"
              src={Arbitrum}
              className="h-6 w-6 inline-block ml-1 hover:opacity-80"
            />
          </h1>
        </div>

        <ConnectKitButton.Custom>
          {({ isConnected, show, address }) => {
            return (
              <div>
                <div>
                  <div className="hidden lg:flex md:flex xl:flex ml-12 space-x-4">
                    <div className="relative mt-2">
                      <div className="absolute inset-0 bg-yellow-300 ring-1 ring-black"></div>
                      <button
                        onClick={show}
                        className="relative -inset-x-2 text-l -inset-y-2 hover:-inset-x-1.5 hover:-inset-y-1.5 bg-white flex items-center justify-center border-4 border-transparent px-3 py-3 shadow-sm font-light text-black ring-1 ring-black"
                      >
                        {isConnected ? (
                          <div className="flex flex-col">
                            <div className="flex text-left font-bold">
                              <div>
                                {address.slice(0, 6) +
                                  "..." +
                                  address.slice(36, 42)}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-row gap-3 font-bold">
                            <span>Connect Wallet</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 mt-0.5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </ConnectKitButton.Custom>
      </div>
    </div>
  );
}
