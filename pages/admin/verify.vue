<template>
  <div>

  <div class="text-center">
    <h3 class="text-primary">โปรดรอสักครู่ </h3>
    <v-progress-circular
      :size="50"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div>
    <div class="hidden">
    {{next()}}
    </div>
    </div>
                </template>
<script>
export default {
  
  methods: {

    next() {
      setTimeout(() => {
        this.$router.push("/admin/register")
      }, 10) 

      
  },
 }
}
</script>
<style>
  .hidden {
    display: none;
  }
</style>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>