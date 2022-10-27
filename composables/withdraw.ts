import { ethers } from "ethers";
import abi from "../src/abi.json";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

export default async (idx: number) => {
  const runtimeConfig = useRuntimeConfig();
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner((window as any).selectedAddress);
  const contract = new ethers.Contract(runtimeConfig.public.ca, abi, signer);
  try {
    await contract.withdraw(idx);
  } catch (e) {
    const parsedEthersError = getParsedEthersError(e);
    alert(parsedEthersError.context);
  }
};
