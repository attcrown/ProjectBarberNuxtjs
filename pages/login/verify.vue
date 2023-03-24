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
import CryptoJS from 'crypto-js';
export default {
  data(){
    return{
      form:{
        dialogcheck:true
      },
      data:{
        name:null,
        userid:null,
        role:null
      }
    }
  },
  computed: {
          getUser(){
             return this.$store.getters.getUser;
          },
          
      },
   methods: {

   async next() {
      const hash = CryptoJS.SHA1(this.$store.getters.getUser.pwd).toString();
      console.log(this.$store.getters.getUser.pwd)
      console.log("pwd = " + hash);

      const str = this.$store.getters.getUser.id;
      // แปลงแต่ละตัวอักษรเป็นตัวเลขฐานสิบ  ใช้ฟังก์ชัน charCodeAt() เพื่อดึงรหัส ASCII ของแต่ละตัวอักษร
      let result = 0;
      for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i) * 123;
      }
      result = 5555555 - result;
      console.log("id = " + result);
      //console.log(this.$store.getters.getUser.id)
     await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/UserList/${result}.json`).then((res) => {
      
        if (res.data == null) {

          this.$store.dispatch('setUser', this.form)
          this.$router.push("/login")
        } else {
          if(hash==res.data.pwd){
          this.data.name = res.data.name;
          this.data.userid = result;
          this.data.role= res.data.role;
          this.$store.dispatch('setUser', this.data)
          if (hash == res.data.pwd) {
            if (res.data.role == "A") {
              this.$router.push("/admin")
            }
            else if (res.data.role == "B") {
              this.$router.push("/barber")
            }
          }
        }else{
          this.$store.dispatch('setUser', this.form)
          this.$router.push("/login")
        }
        }
      })
    }

  },
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