import { ethers } from "ethers";
import abi from "../src/abi.json";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

export default async (amt: number) => {
  if (amt < 0) {
    alert("Please enter a positive number");
    return;
  }
  const runtimeConfig = useRuntimeConfig();
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner((window as any).selectedAddress);
  const contract = new ethers.Contract(runtimeConfig.public.ca, abi, signer);
  const token = await contract.getTokenAdd();
  await approve(token).then(async () => {
    try {
      await contract.stake(amt * 10 ** 9);
    } catch (e) {
      const parsedEthersError = getParsedEthersError(e);
      alert(parsedEthersError.context);
    }
  });
};
