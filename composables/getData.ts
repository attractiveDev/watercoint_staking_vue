import { ethers } from "ethers";
import abi from "../src/abi.json";

export default async () => {
  const runtimeConfig = useRuntimeConfig();
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner((window as any).selectedAddress);
  const contract = new ethers.Contract(runtimeConfig.public.ca, abi, signer);
  const data = await contract.getUserData(
    (window as any).ethereum.selectedAddress
  );
  return data;
};
