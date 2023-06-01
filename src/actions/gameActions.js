import { Contract, utils } from "ethers";
import ButtonGameABI from "../abi/Button.json";
const contractAddress = "0xAA421eE55B5769200B2292CE33130E6550F88891";


export const handlePlayOrStart = async (signer, isRoundActive) => {
  try {
    if (signer) {
      const buttonGame = new Contract(contractAddress, ButtonGameABI, signer);

      if (isRoundActive) {
        // Call the play function
        const tx = await buttonGame.play({ value: utils.parseEther("0.001") });
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Played the game");
      } else {
        // Call the startRound function
        const tx = await buttonGame.startRound({
          value: utils.parseEther("0.001"),
        });
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Started a new round");
      }
    }
  } catch (error) {
    console.error("Failed to play or start round:", error);
  }
};

export const handleEndRound = async (signer) => {
  try {
    if (signer) {
      const buttonGame = new Contract(contractAddress, ButtonGameABI, signer);
      const tx = await buttonGame.endRound();
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Ended the round");
    }
  } catch (error) {
    console.error("Failed to end the round:", error);
  }
};
