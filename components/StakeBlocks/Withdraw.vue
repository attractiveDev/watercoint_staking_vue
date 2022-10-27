<script setup>
let initialized = ref(false);
let data = ref([]);
let maxtime = ref(0);
async function login() {
  if (window.ethereum) {
    console.log(await getAcc());
    if ((await getAcc()) != undefined) {
      initialized.value = true;
      data.value = await getData();
      maxtime.value = await getMaxTime();
    }
    window.ethereum.on("connect", () => {
      login();
    });
    window.ethereum.on("accountChanged", () => {
      login();
    });
  } else {
    let provider = await useLogin();
    const cur = await getWalletAcc(provider);
    if (cur != undefined) {
      acc.value = cur;
    }
    provider.on("accountsChanged", (accounts) => {
      getWal();
    });
  }
}
login();
</script>

<template>
  <div class="box overflow-scroll" v-if="initialized">
    <div v-if="data.length == 0" class="header-text flex h-full items-center justify-center">
      You have no stakes yet!
    </div>
    <div v-else class="p-2">
      <div class="p-4" v-for="(i, idx) in data">
        <div class="flex flex-row items-center gap-4">
          <div class="flex text-xl font-bold text-slate-700 text-center">
            <p>{{ idx + 1 }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <div>
              <p class="rounded-full bg-blue-200 p-1 px-3 text-sm text-blue-800 font-bold w-fit"
                v-if="i.withdrawn == true">
                Already withdrawn!
              </p>
              <p class="rounded-full bg-green-200 p-1 px-3 text-sm text-green-800 font-bold w-fit"
                v-else-if="Date.now() - i.created * 1000 > maxtime * 1000">
                Safe to Withdraw!
              </p>
              <p class="rounded-full bg-red-200 p-1 px-3 text-sm text-red-800 font-bold w-fit"
                v-else-if="Date.now() - i.created * 1000 < maxtime * 1000">
                Subject to penalties <br />{{
                                (maxtime * 1000 - (Date.now() - i.created * 1000)) /
                                1000 /
                                3600 < 1 ? (maxtime * 1000 - (Date.now() - i.created * 1000)) / 1000 / 60 + "minutes left" : ( (maxtime
                * 1000 - (Date.now() - i.created * 1000)) / 1000 / 3600 ).toFixed(1) + " hours left" }} </p>
            </div>
            <p class="body-text px-1">
              <span class="header-text">You staked</span>
              {{ i.amount / 10 ** 9 }}
            </p>
            <button v-if="i.withdrawn == false" @click="withdraw(idx)"
              class="text-left rounded-full bg-blue-200 p-1 px-3 text-sm text-blue-800 font-bold w-fit">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
