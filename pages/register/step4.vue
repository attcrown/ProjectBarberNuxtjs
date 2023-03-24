<template>
    <div>
        <v-app-bar
      color="#20DE79"
      dense
      flat
      dark
    >
    <v-toolbar-title>Success ✓</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                    Step 4 to 4
                      </div>
                </v-col>

                <v-col cols="12" class="text-center">
                  <v-avatar
                    size="150"
                    center
                  >
                  <img
                       :src="this.$store.getters.getLine.pictureUrl"  
                    >
                  </v-avatar>
                  
               </v-col>
               <v-col class="text-center">
                  <h3 class="text-primary">ขอบคุณที่ใช้บริการ</h3> 
                   {{ getLine.displayName}}
               </v-col>

                <v-col cols="12">
                  <v-textarea
                    outlined
                    readonly
                    height="100"
                    success
                    name="input-7-4"
                    label="รายละเอียดอื่นๆหลังการจองคิว"
                    :value = " 
                    'จองคิวเสร็จสิ้นวันที่ : '+$store.getters.getTime.dateEnd+ 
                    '\nจองคิวเสร็จสิ้นเวลา : '+$store.getters.getTime.timeEnd+
                    '\n(ยกเลิก หรือ เปลี่ยนเวลา ได้ตามเงื่อนไขที่กำหนด) '
                      "
                ></v-textarea>
           </v-col>
          </v-row>
        </v-container>
        <Footer />
        {{sentdata()}}
        </div>
 </template>

<script>
export default {


  data() {
    return {
      form: {
        perple: this.$store.getters.getDatahair.name,
        phoneNumber: this.$store.getters.getDatahair.phoneNumber
      },
      id:{
        userId: this.$store.getters.getLine.userId
      },


    }
  },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
    getDatahair() {
      return this.$store.getters.getDatahair;
    }, getTime() {
      return this.$store.getters.getTime;
    },
    getPromptpay() {
      return this.$store.getters.getPromptpay;
    }


  },
  methods: {


    sentdata() {


      this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`, this.$store.getters.getLine)
      this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`, this.$store.getters.getTime)
      this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`, this.$store.getters.getDatahair)

      this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.$store.getters.getDatahair.perple}/${this.$store.getters.getDatahair.date}/${this.$store.getters.getDatahair.time}.json`, this.form)



      this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/booking/${this.$store.getters.getTime.summinute}.json`, this.$store.getters.getDatahair)
      this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/booking/${this.$store.getters.getTime.summinute}.json`, this.id)
      this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/successRefund/${this.$store.getters.getLine.userId}.json`)

    }

  },
  mounted() {
    liff.sendMessages([
      {
        type: 'text',
        text: `ฉันยอมรับเงื่อนไขการใช้บริการ\nรายละเอียดที่ทำการจองคิว\n1.ชื่อที่ใช้จอง : ${this.$store.getters.getDatahair.name}\n2.วันที่จอง : ${this.$store.getters.getDatahair.date}\n3.เวลาที่จอง : ${this.$store.getters.getDatahair.time}\n4.ช่างที่บริการ : ${this.$store.getters.getDatahair.perple}
        \nข้อความจากระบบ \nขอบคุณที่ใช้บริการค่ะ`
      }
    ]).then(() => {
      // The message was successfully sent
      console.log('Message sent!')
    }).catch((error) => {
      // An error occurred while sending the message
      console.error(error)
    })
  }


};
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