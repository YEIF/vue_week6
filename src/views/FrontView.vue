<template>
  <h1 class="text-danger">現在是前台</h1>
  <div class="container">
    <FrontNavbar></FrontNavbar>
    <router-view></router-view>
  </div>
</template>
<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
export default {
  components: {
    FrontNavbar
  }
}
</script>
