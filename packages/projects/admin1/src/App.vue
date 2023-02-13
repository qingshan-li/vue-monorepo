<template>
  <router-view />
</template>

<script setup lang="ts">
import Container from "@/views/list/Container.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router"

const router = useRouter();

router.push({name: "home"})

</script>

<style lang="less">
</style>