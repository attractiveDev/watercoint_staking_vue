<script setup lang="ts">
let acc = ref<string>("");
let amt: number = 0;
const login = async () => {
  if ((await getAcc()) != undefined) {
    acc.value = await getAcc();
  }
  (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
    login();
  });
};

const getWal = async () => {
  let provider = await useLogin();
  const cur = await getWalletAcc(provider);
  if (cur != undefined) {
    acc.value = cur;
  }
  provider.on("accountsChanged", (accounts: string[]) => {
    getWal();
  });
};
</script>

<template>
  <div class="box">
    <div
      v-if="!acc"
      class="w-full h-full flex flex-col items-center justify-around"
    >
      <p class="header-text">Connect to stake!</p>
      <div class="flex flex-col items-center gap-2">
        <div class="flex gap-px bg-slate-800 rounded-md">
          <button
            @click="login()"
            class="rounded-r-none rounded-md button-normal"
          >
            Connect</button
          ><button
            @click="getWal()"
            class="rounded-l-none rounded-md button-normal"
          >
            WC
          </button>
        </div>
        <p
          class="rounded-md text-center bg-red-200 p-1 px-3 text-sm text-red-800 font-bold w-4/6"
        >
          Warning! You should connect from your wallet's browser on mobile!
        </p>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-evenly w-full h-full">
      <p class="header-text">Select an amount<br />to stake...</p>
      <p class="body-text">Account: <br />{{ ellipsis(acc, 20) }}</p>
      <div class="flex flex-col items-center gap-4">
        <input
          type="number"
          class="w-60 p-3 text-md bg-slate-400 text-white placeholder-slate-200 rounded-md"
          placeholder="Select amount"
          min="0"
          v-model="amt"
        />
        <button class="button-normal" @click="stake(amt)">Stake</button>
      </div>
    </div>
  </div>
</template>
