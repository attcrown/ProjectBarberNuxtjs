<template>
    <div>
        <v-app-bar
      color="#F01414"
      dense
      flat
      dark
    >
    <v-toolbar-title>ยกเลิกการจองคิว</v-toolbar-title>
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
                    label="ทำการจองคิวเรียบร้อย"       
                    value="success"
                    hide-details
                    readonly
                    indeterminate
                    class="ml-5"
            ></v-checkbox>
            <v-checkbox
                    label="อยู่ในช่วงที่สามารถยกเลิก"
                    value="success"
                    hide-details
                    readonly
                    indeterminate
                    class="ml-5"
            ></v-checkbox>
                        </v-col>
                        <v-col cols="12">
                            <v-btn class="w100 my-btn mt-5 " width="100%" rounded color="info" @click="next"  readonly>    Go to booking </v-btn>
                        </v-col>
            </v-row>

       

        </v-container>
        <Footer />

        <div class="hidden">
                {{ check() }}
                        </div>
        
    </div>
</template>

<script>

export default {
  mounted() {
    liff.init({
      liffId: '1657521762-vLzxz6Ee'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.$store.dispatch('setLine', profile);
          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`).then((res) => {
            this.$store.dispatch('setCancel', res.data);
          });
        })
      } else {
        liff.login();
      }
    })
  },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
    getCancel() {
      return this.$store.getters.getCancel;
    }

  },

  methods: {
    check() {
      this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Data.json`).then((res) => {
                console.log(res.data.text)
                this.$store.dispatch('setCancel', res.data);
            });

      let dateArray1 = this.printDate().split("/");   //เวลาปัจจุบัน
      let cd1 = Number(dateArray1[0]);
      let cm1 = Number(dateArray1[1]);
      let cy1 = Number(dateArray1[2].substring(0, 4)) - 543;
      let t1 = this.printTime();
      let m2 = Number((t1.slice(3, 5)));
      let h2 = Number((t1.slice(0, 2)));
      let sum1 = (h2 * 60) + (m2) + ((1440 * cd1) + (44640 * cm1) + (525600 * cy1));

      let dateArray = this.$store.getters.getCancel.date.split("-");  //เวลาที่จอง
      let cd = Number(dateArray[2]);
      let cm = Number(dateArray[1]);
      let cy = Number(dateArray[0].substring(0, 4));
      let t = this.$store.getters.getCancel.time
      let m = (t.slice(3, 5));
      let m1 = Number(m);
      let h = (t.slice(0, 2));
      let h1 = Number(h);

      let sum = (h1 * 60) + (m1) + ((1440 * cd) + (44640 * cm) + (525600 * cy));


      console.log(sum)
      console.log(this.$store.getters.getCancel.summinute)
      console.log(sum > sum1)
      if (this.$store.getters.getCancel.summinute != '' && sum > sum1) {
        this.$router.push("/cancel/pass");
      }
    },
    next() {
      this.$router.push("../register");
    },
    printDate: function () {
      return new Date().toLocaleString();
    },
    printTime: function () {
      return new Date().toLocaleTimeString();
    },
  },

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

.hidden {
  display: none;
}
</style>