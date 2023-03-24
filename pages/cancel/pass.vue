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
                    v-model="ex4"
                    label="ทำการจองคิวเรียบร้อย"
                    color="success"
                    value="success"
                    hide-details
                    readonly
                    class="ml-5"
            ></v-checkbox>
            <v-checkbox
                    v-model="ex4"
                    label="อยู่ในช่วงที่สามารถยกเลิก"
                    color="success"
                    value="success"
                    hide-details
                    readonly
                    class="ml-5"
            ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-form>
                    <v-col cols="12" class="pt-0 pl-0 mt-0">
                            <v-select
                                v-model="data.nameBank"
                                :items="nameBank"
                                menu-props="auto"
                                label="เลือกธนาคาร"
                                hide-details
                                prepend-icon="mdi-bank"
                                single-line
                                class="pt-0 pl-0 mt-0"
                               ></v-select>
                            </v-col>
                    <v-text-field 
                         v-model="data.Number"
                         dense
                         prepend-icon="mdi-numeric"
                         :rules="phoneRules"
                         @keypress="onlyNumber($event,13)"
                         label="หมายเลขบัญชี"> 
                    </v-text-field>
                    <v-switch 
                                class="mt-0 pt-0"           
                                  color="success" 
                                  hide-details
                            v-model="switch1"
                            :label="`ยืนยันข้อมูลถูกต้อง`"
                            @change="getim"
                          ></v-switch>
                  </v-form> 
                  
                </v-col>
              

                <v-col cols="12">
                            <v-btn class="w100 my-btn mt-5 " width="100%" rounded color="#FFA500"  @click="next">    Cancel Booking </v-btn>
                        </v-col>
                        <div class="hidden">
                          {{addtime()}}
                {{ checknot() }}
                        </div>
                <v-dialog v-model="dialog" max-width="290" 
                transition="dialog-bottom-transition">
            <v-card>
              <v-card-title>Form Error</v-card-title>
                    <v-card-text>
                      <h3>   กรุณาใส่ข้อมูลให้ครบ</h3>
                   </v-card-text>
            </v-card>
          </v-dialog>
            </v-row>
        </v-container>
        <Footer />
    </div>
</template>

<script>
const REGEX_NUMBER = /^[0-9]*$/
export default {
  mounted() {
    liff.init({
      liffId: '1657521762-vLzxz6Ee'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.$store.dispatch('setLine', profile);
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
     
      ex4: ['success'],
      form: {
        dateEnd: '',
        timeEnd: '',
        minute: '',
        min: '',
        hour: '',
        hor: '',
        summinute: ''
      },
      phoneRules: [value => this.phoneValidator(value)],
      data: {
        pictureUrl: this.$store.getters.getLine.pictureUrl,
        displayName: this.$store.getters.getLine.displayName,
        userId: this.$store.getters.getLine.userId,
        nameBank: null,
        Number: null,
        im: null,
        date:null,
        e13:1,
        name:"",
        key:"p01",
      },
      switch1: false,
      nameBank: [
        'PROMPTPAY', 'SCB', 'BBL', 'KBANK', 'KTB', 'BAY', 'TMB', 'TBAMK', 'KK',
        'TISCO', 'CIMBT', 'LH', 'UOB', 'BACC', 'ICBC', 'GSB',
      ],
      dialog: false,
      Cbooking:this.$store.getters.getCancel.Cbooking,

    }
  },
  methods: {
   async getim() {
      await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`).then((res) => {
        this.data.im = res.data.encodedImage;
        this.data.name = res.data.name;
      });
    },
    onlyNumber(event, max) {
      if (!REGEX_NUMBER.test(event.key) || event.target.value.length == max) {
        return event.preventDefault()
      }
    },
    phoneValidator(value) {
      if (REGEX_NUMBER.test(value) && value.length >= 10 && value.length <= 13 & value.length != 11 && value.length != 12) {
        return true
      }
      if (value == '') {
        return 'กรุณากรอกหมายเลขบัญชี'
      }
      return "กรุณากรอกหมายเลขบัญชีให้ถูกต้อง"
    },
    checknot() {
      if (((this.form.summinute) - (this.$store.getters.getCancel.summinute)) >= this.Cbooking) {
        this.$router.push("/cancel/notpass");
      }
    },
    printDate: function () {
      return new Date().toLocaleString();
    },
    printTime: function () {
      return new Date().toLocaleTimeString();
    },
    async next() {
      if (this.data.Number == null || this.data.nameBank == null || this.switch1 == false) {
        this.dialog = true;
      }  else {

       await this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/booking/${this.$store.getters.getCancel.summinute}.json`);
        this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel/${this.data.key}.json`, this.data)
        this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.$store.getters.getCancel.perple}/${this.$store.getters.getCancel.date}/${this.$store.getters.getCancel.time}.json`);
        this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}/date.json`);
        this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}/perple.json`);
        this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}/time.json`);
        this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}/summinute.json`);
        this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/successRefund/${this.$store.getters.getLine.userId}.json`);
        this.$router.push("/cancel/verify");
        console.log(555);
      }
    },
    async addtime() {

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
      console.log(cy)
      console.log(dateArray)

      this.form.dateEnd = cy + "-" + cm + "-" + cd;
      this.data.date = cy + "-" + cm + "-" + cd;
      // console.log(this.form.dateEnd)

      this.form.timeEnd = this.printTime();
      this.form.min = (this.form.timeEnd.slice(3, 5));
      this.form.minute = Number(this.form.min);
      this.form.hor = (this.form.timeEnd.slice(0, 2));
      this.form.hour = Number(this.form.hor);

      this.form.summinute = (this.form.hour * 60) + (this.form.minute) + ((1440 * cd) + (44640 * cm) + (525600 * cy));


    }
  },
  async mounted() {
      this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel.json`)
                  .then((res) => {
                      const keys = Object.keys(res.data); // ดึง key ออกมาจาก Object
                      for (let i = 0; i < keys.length; i++) { // วนลูปเพื่อเก็บ key ทั้งหมดลงใน array
                          if(Number(this.data.key.substring(1,3))< Number(keys[i].substring(1,3))){
                            this.data.key = keys[i]
                          }
                      }
                      let pnew=''
                      if(Number(this.data.key.substring(1,3)) < 10){
                        pnew = "p0"+(Number(this.data.key.substring(1,3))+1)
                      }else{
                        pnew = "p"+(Number(this.data.key.substring(1,3))+1)
                      }
                      this.data.key = pnew;
                       
                  }) 
                  this.switch2=false;
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