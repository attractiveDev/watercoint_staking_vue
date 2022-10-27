import { ethers } from "ethers";
import secondaryAbi from "../src/secondaryabi.json";

export default async (ca: string) => {
  const runtimeConfig = useRuntimeConfig();
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner((window as any).selectedAddress);
  const contract = new ethers.Contract(ca, secondaryAbi, signer);
  const allowance = await contract.allowance(
    (window as any).ethereum.selectedAddress,
    runtimeConfig.public.ca
  );
  console.log("allowance", allowance);
  if (allowance > 0) {
    return true;
  } else {
    const txHandle = await contract.approve(runtimeConfig.public.ca, BigInt(10 ** 25));
    await txHandle.wait();
  }
};
