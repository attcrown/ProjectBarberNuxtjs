<template>
    <div>
        <v-app-bar
      color="primary"
      dense
      flat
      dark
    >
    <v-toolbar-title>ตรวจสอบเงื่อนไข</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                    Step 1 to 4
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
        <v-col cols="12"  md="6" class="pt-0 pb-0">
             <v-textarea 
             readonly
          dense
          outlined
          name="input-7-4"
          label="เงื่อนไขการใช้บริการจองคิว"
          :value=this.text >
              </v-textarea>
        </v-col>
      <v-col cols="12" >
    <div class="bt-group d-flex mt-0">
        <h3 style="align-self: center;"> ยอมรับเงื่อนไข คลิก >> &nbsp;</h3>
        <div class="circle" :class="form.bt==true ? 'active' : ''" @click="validate(true)">
             <h1>&nbsp;✓</h1> 
        </div>
    </div>
</v-col>
      <v-col class="pt-0 pb-0">
        <v-form >
          
            <v-btn class="w100 my-btn mt-0 " width="100%" rounded color="primary" dark  @click="next"> 
           Next </v-btn>
          
        </v-form>
      </v-col>

            </v-row>
        </v-container>
        <div class="mb-0 mt-10">
          <Footer />
  <div class="hidden">  {{check()}} </div>
 
        </div>
    <v-dialog 
    v-model="dialog" 
    max-width="290"
    transition="dialog-bottom-transition"
    dark>
      <v-card>
        <v-card-title>Form Error</v-card-title>
              <v-card-text>
                <h3>   กรุณากดปุ่มยอมรับเงื่อนไขเพื่อใช้บริการ</h3>
             </v-card-text>
      </v-card>
    </v-dialog>

    </div>
</template>

<script>
import Footer from '~/components/Footer.vue';
export default {
  components: { Footer },
  async mounted() {
    liff.init({
      liffId: '1657521762-klyEy4wR'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          const email = liff.getDecodedIDToken().email;
          this.$store.dispatch('setLine', profile);
          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Stopday.json`).then((res) => {
            this.$store.dispatch('setStopday', res.data);
          }
          )
          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`).then((res) => {
            this.$store.dispatch('setCancel', res.data);
            this.checksum = res.data.summinute;
          })
          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Data.json`).then((res) => {
            this.$store.dispatch('setPromptpay', res.data);
          });
          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Data.json`).then((res) => {
            this.$store.dispatch('setPromptpay', res.data);
            console.log(res.data.text)
            this.text = res.data.text;
          });
          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Data.json`).then((res) => {
                console.log(res.data.Tbooking)
                this.$store.dispatch('setCancel',res.data);
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
  data() {
    return {
      tt: new Date().getFullYear(),
      dialog: false,
      form: {
        bt: false
      },
      checksum: null,
      text: ''
    };
  },
  methods: {

    validate() {
      this.form.bt = !this.form.bt
    },
    printDate: function () {
      return new Date().toLocaleString();
    },
    printTime: function () {
      return new Date().toLocaleTimeString();
    },
    next() {
      if (this.form.bt == true) {
        this.$store.dispatch('setbt', this.form)
        this.$router.push("/register/step2");
      }
      if (this.form.bt == false) {
        this.dialog = true
      }
    },
    check() {

      const d = new Date();
      console.log(d.toLocaleString())
      let cd1 = this.$store.getters.getCancel.date.toLocaleString().substring(8, 10)
      console.log("cd1= " + cd1)
      let cm1 = this.$store.getters.getCancel.date.toLocaleString().substring(5, 7)
      console.log("cm1= " + cm1)
      let cy1 = this.$store.getters.getCancel.date.toLocaleString().substring(0, 4)
      console.log("cy1= " + cy1)
      //////////////////////////////////////////////////// จบ
      let dateArray = this.printDate().split("/");
      let cd = Number(dateArray[0]);
      let cm = Number(dateArray[1]);
      let cy = Number(dateArray[2].substring(0, 4)) - 543;

      console.log(cd)
      console.log(cm)
      console.log("cy = " + cy)
      console.log(dateArray)

      let th = this.printTime().slice(0, 2);  //ชั่วโมงปัจจุบัน
      let tm = this.printTime().slice(3, 5);   //นาทีัจุบัน
      let th1 = this.$store.getters.getCancel.time.slice(0, 2); //ชั่วโมงที่เลือก
      let tm1 = this.$store.getters.getCancel.time.slice(3, 5);  //นาทีที่เลือก
      console.log(5555)
      // console.log(this.checksum+"77777777")
      //  console.log(((Number(cd1)*1440)+(Number(cm1)*44640)+(Number(cy1)*525600)+(Number(th1)*60)+Number(tm1) ) - ( (Number(cd)*1440)+(Number(cm)*44640)+(Number(cy)*525600)+(Number(th)*60)+Number(tm) ))
      if (this.checksum == null) {
        console.log("ยังไม่จอง")
      }
      if (((Number(cd1) * 1440) + (Number(cm1) * 44640) + (Number(cy1) * 525600) + (Number(th1) * 60) + Number(tm1)) > ((Number(cd) * 1440) + (Number(cm) * 44640) + (Number(cy) * 525600) + (Number(th) * 60) + Number(tm))) {
        this.$router.push("/register/not");
        console.log('จองแล้ว')
      }
    },
  }
}

</script>


<style lang="scss" scoped>
.bt-group {
  .circle {
    width: 45px;
    height: 45px;
    background: rgb(212, 189, 189);
    color: white;
    border-radius: 50%;
    position: relative;

    &.active {
      background: #1a56BE;
    }
  }
}

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
