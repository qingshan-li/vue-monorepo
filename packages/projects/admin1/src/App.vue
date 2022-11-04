<template>
  <router-view />
</template>

<script setup lang="ts">
import Container from "@/views/list/Container.vue";
import { source } from "@basic/core/lib/di.ts";
import { onMounted } from "vue";
import { useRouter } from "vue-router"

const router = useRouter();
onMounted(()=> {
  source.set();
})
router.push({name: "home"})

</script>

<style lang="less">
</style>