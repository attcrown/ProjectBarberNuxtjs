<template>
    <div>
        <v-app-bar
      color="primary"
      dense
      flat
      dark
    >
    <v-toolbar-title>สรุป</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                    Step 3 to 4 
                   </div>
                   <br>
                   <h3 class=" text-center"> ตรวจสอบรายละเอียด </h3>
                </v-col>
                <v-col cols="12" class="pb-0 pl-5">
                  <v-textarea
                    outlined
                    readonly
                    height="220"
                    success
                    name="input-7-4"
                    label="สรุปรายละเลียด"
                    :value = " 'ชื่อในการจอง : '+getDatahair.name+ 
                      '\nเบอร์ติดต่อ     : '+getDatahair.phoneNumber+
                      '\nอีเมลติดต่อ     : '+getDatahair.email+
                      '\nวันที่จองคิว     : '+getDatahair.date+
                      '\nช่างที่เลือก      : '+getDatahair.perple+
                      '\nเวลาจอง         : '+getDatahair.time+
                      '\nเพิ่มเติมถึงช่าง : '+getDatahair.etc
                      "
                ></v-textarea>
                </v-col>
                <v-col cols="12" class="pt-0 pb-0">
                  <div class="text-center">
                    <h3>    
                      <v-icon >
                        mdi-cash
                      </v-icon>
                     สแกน QR Code เพื่อชำระเงินมัดจำ</h3>
                     <h4>จำนวนเงิน <u>{{ this.bath }}</u> บาท</h4>
                  </div>
                </v-col>
                <v-col cols="12" class="text-center pt-0">
                  <promptpay-qr :id="promptpay" :amount="parseFloat(bath)"></promptpay-qr>
                     </v-col>
                     <v-col cols="12">
                      <v-file-input
                          v-model="imageFile"
                          :rules="rules"
                          color="deep-purple accent-4"
                          :show-size="1000"
                          chips
                          accept="image/png, image/jpeg"
                          placeholder="อัพโหลดหลักฐานการโอนเงิน"
                          prepend-icon="mdi-cloud-upload"
                          label="อัพโหลดหลักฐานการโอนเงิน"
                        ></v-file-input>
                        <v-img v-if="imageFile" :src="imageUrl" />
                         </v-col>
            <v-col cols="12">
              <v-btn class="w100 my-btn mt-5 " width="100%" rounded color="primary" dark  @click="next">    Next </v-btn>  
              <v-btn class="w100 my-btn mt-5" width="100%" rounded color="#C0F0F0"   @click="back">    Back </v-btn>
             <!--  <v-btn class="w100 my-btn mt-5" width="100%" rounded color="#C0F0F0"   @click="test">    test </v-btn>-->
            </v-col>
          </v-row>
        </v-container>
       
        <Footer />
  <v-dialog 
    v-model="dialog" 
    max-width="290"
    transition="dialog-bottom-transition"
    dark
    >
      <v-card>
        <v-card-title>Form Error</v-card-title>
              <v-card-text>
                <h3> โปรดอัพโหลดสลิปเงินและขนาดไม่เกิน 2 MB </h3>
             </v-card-text>
      </v-card>
    </v-dialog>
  
        
        </div>
 </template>
<script>
import Vue from 'vue'
import VuePromptpayQr from 'vue-promptpay-qr'
import Footer from '~/components/Footer.vue'
Vue.use(VuePromptpayQr)
export default {
  components: { Footer },
  data() {
    return {
      encodedImage: null,
      im: {
        encodedImage: null,
        bath:this.$store.getters.getPromptpay.bath,
      },
      imageFile: null,
      imageUrl: null,
      rules: [
        value => !value || value.size < 2000000 || 'ไฟล์ภาพไม่เกิน 2 MB!',
      ],
      form: {
        dateEnd: '',
        timeEnd: '',
        minute: '',
        min: '',
        hour: '',
        hor: '',
        summinute: 0,
      },
      promptpay: this.$store.getters.getPromptpay.promptpay,
      bath: this.$store.getters.getPromptpay.bath,
      dialog: false,
    }
  },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
    getBt() {
      return this.$store.getters.getBt;
    },
    getDatahair() {
      return this.$store.getters.getDatahair;
    },
    getPromptpay() {
      return this.$store.getters.getPromptpay;
    }
  },
  watch: {
    async imageFile(newValue) {
      await this.onFileInput()

    }
  },

  methods: {
    test() {
      // this.imageUrl = this.encodedImage;
      //console.log(this.imageUrl)
      console.log(this.encodedImage)
    },

    onFileInput() {
      if (this.imageFile != null) {
        this.imageUrl = URL.createObjectURL(this.imageFile)

        const reader = new FileReader();
        reader.readAsDataURL(this.imageFile);
        reader.onload = () => {
          this.im.encodedImage = reader.result;
        };
        reader.onerror = error => {
          console.log(error);
        };
      }
    },

    async next() {

      if (this.$store.getters.getBt.bt == false || this.im.encodedImage == null || this.im.encodedImage == '' || this.imageFile.size > 2000000) {
        this.dialog = true;
      } else {
        console.log("มีภาพ")
        try {
          await this.addtime();
          const response = await this.$axios.$patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`, this.im);
          await this.$axios.$patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/booking/${this.form.summinute}.json`, this.im)
          this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.$store.getters.getDatahair.perple}/${this.$store.getters.getDatahair.date}/${this.$store.getters.getDatahair.time}.json`, this.im)
          console.log(response);
        } catch (error) {
          console.log(error);
        }
        //this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getDatahair.date}/${this.$store.getters.getDatahair.perple}.json`);
        await this.$store.dispatch('setTime', this.form)
        this.$router.push("/register/verify");
      }

    },
    back() {
      this.$router.push("/register/step2");
    },
    printDate: function () {
      return new Date().toLocaleString(); //16/12/2565 13:33:36
    },
    printTime: function () {
      return new Date().toLocaleTimeString();
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    async addtime() {

      const d = new Date();
      console.log(d.toLocaleString())
      let cd1 = this.$store.getters.getDatahair.date.toLocaleString().substring(8, 10)
      console.log("cd1= " + cd1)
      let cm1 = this.$store.getters.getDatahair.date.toLocaleString().substring(5, 7)
      console.log("cm1= " + cm1)
      let cy1 = this.$store.getters.getDatahair.date.toLocaleString().substring(0, 4)
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

      this.form.dateEnd = cy + "-" + cm + "-" + cd;
      // console.log(this.form.dateEnd)

      this.form.timeEnd = this.printTime();
      this.form.min = (this.form.timeEnd.slice(3, 5));
      this.form.minute = Number(this.form.min);
      this.form.hor = (this.form.timeEnd.slice(0, 2));
      this.form.hour = Number(this.form.hor);

      this.form.summinute = (this.form.hour * 60) + (this.form.minute) + ((1440 * cd) + (44640 * cm) + (525600 * cy));
    },
  }
}

</script>
<style>
#app svg {
  width: 70%;
  height: 70%;
}

.container {
  padding: 0px;
}
</style>

<style  lang="scss" scoped>
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