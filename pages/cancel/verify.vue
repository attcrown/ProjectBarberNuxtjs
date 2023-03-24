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
        this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`).then((res) => {
                        this.$store.dispatch('setCancel',res.data);
                        })
           this.$router.push("/cancel/ok")
          }
         },
    
};
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