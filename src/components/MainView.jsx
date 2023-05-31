import ButtonComponent from "./ButtonComponent";

export default function MainViewComponent() {
  

  return (
    <div className="h-[75vh] flex flex-col pt-16 items-center bg-purple-600 border-[2px] border-black rounded-t-3xl">
      <ButtonComponent />

      <div className="relative mt-12">
        <div className="absolute inset-0 bg-orange-400 ring-1 ring-black"></div>
        <div className="relative bg-[#fcfced] -inset-x-2.5 -inset-y-2.5 flex items-center justify-center border-4 border-transparent shadow-sm font-light text-black ring-1 ring-black">
          <div className="flex flex-col">
            <div
              id="desc"
              className="px-4 py-10 text-black font-syne max-w-4xl text-3xl font-bold"
            >
              <div className="flex flex-col text-center">
                <h1>How does it work ?</h1>
                <p className="text-xl font-medium text-justify pt-6 ">
                  This is an experiment moderated by a smart contract deployed
                  on Arbitrum One chain. <br />
                  Whenever someone presses the button above, the contract will
                  request user to deposit{" "} <br/>
                  <span className="bg-yellow-300 text-black">
                    0.0005 ETH
                  </span>{" "}
                  to the contract and set a countdown for 2 hours and make him
                  the owner of the total deposited value. If someone else
                  presses the button before the countdown ends, the countdown
                  will reset to 2 hours and the last depositor will become the
                  owner of the total deposited value. <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
