import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";

export const useLogin = async () => {
  const provider = new WalletConnectProvider({
    rpc: {
      56: "https://bsc-dataseed.binance.org/",
    },
  });
  await provider.enable();
  return provider;
};

export const getWalletAcc = async (provider) => {
  console.log(provider.accounts[0]);
  return provider.accounts[0];
};
