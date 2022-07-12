<template>
  <nav-bar />
  <router-view/>
</template>

<style>
body {
  background: url("assets/background_photo_defult.jpg") fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar}
}
</script>