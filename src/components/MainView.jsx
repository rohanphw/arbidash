import ButtonComponent from "./ButtonComponent";

export default function MainViewComponent() {
  return (
    <div className="h-[75vh] px-4 md:px-20 flex flex-col py-24 items-center bg-purple-600 border-[2px] border-black rounded-t-3xl">
      <ButtonComponent />
      <div className="relative mt-12">
        <div className="absolute inset-0 bg-orange-400 ring-1 ring-black"></div>
        <div className="relative bg-[#fcfced] -inset-x-2.5 -inset-y-2.5 flex items-center justify-center border-4 border-transparent shadow-sm font-light text-black ring-1 ring-black">
          <div className="flex flex-col px-2 md:px-0">
            <div
              id="desc"
              className="px-2 py-10 text-black font-syne max-w-4xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl font-bold"
            >
              <div className="flex flex-col text-center">
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">
                  How does it work ?
                </h1>
                <p className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-medium text-justify pt-6 ">
                  Arbidash is a smart contract experiment on Arbitrum. Hit the
                  button, deposit{" "}
                  <span className="bg-yellow-300 text-black">0.0005 ETH</span>,
                  and trigger a 2-hour countdown to potentially claim the total
                  deposit pot. But stay alert - a new deposit resets the clock,
                  and the last to deposit becomes the owner of the stash!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
