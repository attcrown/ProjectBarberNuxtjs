<template>
    <div>
        <v-app-bar
      color="#F01414"
      dense
      flat
      dark
    >
    <v-toolbar-title>ตรวจสอบสถานะการคืนเงิน</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                    Check booking status
                </div>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-avatar
                    size="150"
                    center
                  >
                  <img
                  :src="getLine.pictureUrl" 
                    >
                  </v-avatar>
                    
                </v-col>
                 <v-col class="text-center">
                   <h3 class="text-primary">สวัสดีคุณ</h3> 
                    {{ getLine.displayName}}
                </v-col>
                <v-col cols="12">
                    <v-alert
                    text
                    prominent
                    type="error"
                    icon="mdi-cloud-alert"
                  >
       ระบบไม่มีข้อมูลการขอคืนเงินของคุณ
      </v-alert>
                  </v-col>
            </v-row>
        </v-container>
        <Footer />
    </div>
</template>

<script>
export default {

    computed: {
        getLine(){
           return this.$store.getters.getLine;
        },
        getCancel(){
           return this.$store.getters.getCancel;
        }

    },
        data () {
      return {
        dataAxios: [],
      dataAxios2: [],
      }
    },
    mounted() {
  liff.init({
    liffId: '1657521762-gNXkXb1o'
  }).then(() => {
    if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.$store.dispatch('setLine', profile);

          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel.json`)
            .then((res) => {
              const keys = Object.keys(res.data); // ดึง key ออกมาจาก Object
              for (let i = 0; i < keys.length; i++) { // วนลูปเพื่อเก็บ key ทั้งหมดลงใน array
                this.dataAxios.push(keys[i]);
              }
              this.get(); 
              console.log(this.dataAxios); // แสดง array ที่มี key ทั้งหมดใน Console
 
            })

            this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/successRefund.json`)
            .then((res) => {
              const keys = Object.keys(res.data); // ดึง key ออกมาจาก Object
              for (let i = 0; i < keys.length; i++) { // วนลูปเพื่อเก็บ key ทั้งหมดลงใน array
                this.dataAxios2.push(keys[i]);
              }
              console.log(this.dataAxios2); // แสดง array ที่มี key ทั้งหมดใน Console

              this.get2(); 

           
            })

           

        })
      } else {
        liff.login();
      }
    })
  
},
methods: {

async get(){
for (let i = 0; i < this.dataAxios.length; i++) {
  await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel/${this.dataAxios[i]}.json`)
              .then((res) => { 
                if(res.data.userId == this.$store.getters.getLine.userId){
            this.$router.push("/refund/wait")
          
                    }
               })
        }
},
async get2(){

for (let i = 0; i < this.dataAxios2.length; i++) {
  await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/successRefund/${this.$store.getters.getLine.userId}.json`)
              .then((res) => { 
                    if(res.data.userId == this.$store.getters.getLine.userId){
            this.$router.push("/refund/pass")
          
                    }
               })
        }
      
    },
 }
}
</script>

<style lang="scss" scoped>
.rotating-image {
    animation: rotation 8s infinite linear;
    transform-origin: center;
    transform-style: preserve-3d;
    animation: rotation 3s infinite linear; //ความเร็วในการหมุนภาพ
  }
  @keyframes rotation {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }
  .resized-image {
    width: 25px;
    height: 25px;
  }
</style>