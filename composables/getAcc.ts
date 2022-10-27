export default async function () {
  await (window as any).ethereum.enable();
  const accounts = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];
  console.log(account);
  return account;
}
