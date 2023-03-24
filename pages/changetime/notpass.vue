<template>
    <div>
        <v-app-bar
      color="#F01414"
      dense
      flat
      dark
    >
    <v-toolbar-title>เปลี่ยนข้อมูลการจองคิว</v-toolbar-title>
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
             <v-checkbox
                    v-model="ex4"
                    label="ทำการจองคิวเรียบร้อย"
                    color="success"
                    value="success"
                    hide-details
                    readonly
                    class="ml-5"
            ></v-checkbox>
            <v-checkbox
               indeterminate
                    label="อยู่ในช่วงที่สามารถเปลี่ยนการจองคิว"
                    color="success"
                    value="success"
                    hide-details
                    readonly
                    class="ml-5"
            ></v-checkbox>
                </v-col>
                <v-col cols="12">
                            <v-btn class="w100 my-btn mt-5 " width="100%" rounded color="#555555" readonly >    Cancel </v-btn>
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
    mounted(){
            liff.init({
                liffId: '1657521762-yJ505ZNL'
            }).then(() => {
                if(liff.isLoggedIn()){
                    liff.getProfile().then(profile => {
                        this.$store.dispatch('setLine',profile);
                        this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}/data.json`).then((res) => {
                        this.$store.dispatch('setCancel',res.data);
                        });
                    })
                }else{
                    liff.login();
                }
            })
        }, 
        data () {
      return {
        ex4: ['success'],
      }
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