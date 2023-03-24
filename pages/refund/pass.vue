<template>
    <div>
        <v-app-bar
      color="orange"
      dense
      flat
      dark
    >
    <v-toolbar-title>ตรวจสอบสถานะการคืนเงิน</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>

                <v-col cols="12" class="text-center mt-5">
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
                   <h3 class="text-primary">สถานะการคืนเงินวันที่ {{date}}</h3> 
                </v-col>
                <v-col cols="12" class="mt-5">
                  <v-stepper
        v-model="e13"
        vertical
      >
        <v-stepper-step
          step="1"
          complete
        >
          รับเรื่องขอคืนเงินเรียบร้อย
        </v-stepper-step>
    
        <v-stepper-content step="1">
          <v-card
            class="mb-6"
            height="150px"
          >      
        </v-card>
  
        </v-stepper-content>
    
        <v-stepper-step
          step="2"
          complete
        >
          ดำเนินการคืนเงินเรียบร้อย
        </v-stepper-step>
    
        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            height="100%"
          >
          <ul>
            <li>
                ทำการโอนเงินเรียบร้อย
            </li>
          </ul>
        <v-col cols="12" class="text-center">
            <v-img :src="imRefund" />
            
                    </v-col>
        </v-card>
  
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
    data(){
      return {
        e13: 2,
        imRefund:'',
        image:null,
        dataAxios:[],
        date:null,
      }
    },
  mounted() {

      this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/successRefund/${this.$store.getters.getLine.userId}.json`)
                  .then((res) => {
                    this.imRefund = res.data.encodedImage
                    this.date= res.data.date
                  })
                  
      
  },
  methods:{
    
  },

  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
    getCancel() {
      return this.$store.getters.getCancel;
    }
  
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