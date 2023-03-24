<template>
  <div>
    <v-app-bar color="orange" dense flat dark>
      <v-toolbar-title>ตรวจสอบสถานะการคืนเงิน</v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12" class="text-center mt-5">
          <v-avatar size="150" center>
            <img :src="getLine.pictureUrl">
          </v-avatar>

        </v-col>
        <v-col class="text-center">
          <h3 class="text-primary">สถานะการคืนเงินปัจจุบัน</h3>
        </v-col>
        <v-col cols="12" class="mt-5">
          <v-stepper v-model="e13" vertical>
            <v-stepper-step step="1" complete>
              รับเรื่องขอคืนเงินเรียบร้อย
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card class="mb-6" height="150px">
                <ul>
                  <li> อยู่ระหว่างดำเนินการคืนเงิน</li>
                  <li> ใช้เวลานำเนินการ 1-3 วันทำการ</li>
                  <li>
                    ข้อมูลบัญชีลูกค้า <br>
                    ธนาคาร/พร้อมเพย์ : {{ bank }}<br>
                    หมายเลขบัญชี : {{ num }}

                  </li>
                </ul>

              </v-card>

            </v-stepper-content>

            <v-stepper-step step="2">
              ดำเนินการคืนเงินเรียบร้อย
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>

            </v-stepper-content>
          </v-stepper>

        </v-col>
      </v-row>
    </v-container>
    <Footer />


  </div>
</template>

<script>
import Footer from '~/components/Footer.vue';

export default {
  components: { Footer },
  data() {
    return {
      e13: null,
      bank: '',
      num: '',
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
              for (let i = 0; i < this.dataAxios.length; i++) {
                this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel/${this.dataAxios[i]}.json`)
                  .then((res) => {
                    if (res.data.userId == this.$store.getters.getLine.userId) {
                      this.e13 = 1;
                      this.num = res.data.Number
                      this.bank = res.data.nameBank
                      console.log(res.data.nameBank)
                    }
                  })
              }
              console.log(this.dataAxios); // แสดง array ที่มี key ทั้งหมดใน Console


            })



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