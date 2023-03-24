<template>
    <div>
        <v-app-bar
      color="#FF66FF"
      dense
      flat
      
    >
    <v-toolbar-title> <v-icon>mdi-file-star-outline</v-icon> Promotion</v-toolbar-title>
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
                 <v-col cols="12" class="text-center pt-0 pb-2">
                   <h3 class="text-primary">สวัสดีคุณ</h3> 
                    {{ getLine.displayName}}
                </v-col>
                <v-col class="text-center mt-0 pt-0 pb-0">
                   <h3 class="text-primary ">โปรโมชั่นพิเศษจากทางร้าน</h3> 
                </v-col>
                <v-col class="mt-0">
                    <v-card
    flat
    tile
  >
    <v-window
      v-model="onboarding"
    >
      <v-window-item
        v-for="n in length"
        :key="`card-${n}`"
      >
        <v-card
          width="100%" height="auto"
        >
            <v-img class="mx-auto d-block"  width="80%" height="auto" :src="dataim[n-1]" />
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn
        text
        @click="prev"
      >
        <v-icon>mdi-chevron-left-circle</v-icon>
      </v-btn>
      <v-item-group
        v-model="onboarding"
        class="text-center"
        mandatory
      >
       <h4>โปรโมชั่นที่ : {{ this.onboarding+1 }}</h4> 
      </v-item-group>
      <v-btn
        text
        @click="next"
        class="mr-0 pr-0"
      >
        <v-icon>mdi-chevron-right-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
                </v-col>
            </v-row>
        </v-container>
        <Footer />

        
    </div>
  </template>
  
  <script>
  export default { 
  methods:{
   
    next () {
        this.onboarding = this.onboarding + 1 === this.length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
      async get() {
              for (let i = 0; i < this.datakey.length; i++) {
                  await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/DataPromotion/${this.datakey[i]}.json`)
                      .then((res) => {
                        this.dataim.push(res.data.encodedImage);
                      })
              }
              this.length=this.dataim.length;
          },
  },

  async mounted() {


   await liff.init({
      liffId: '1657521762-mz030X7A'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.$store.dispatch('setLine', profile);
        })

        try{
         this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/DataPromotion.json`)
            .then((res) => {
              const keys = Object.keys(res.data); // ดึง key ออกมาจาก Object
              for (let i = 0; i < keys.length; i++) { // วนลูปเพื่อเก็บ key ทั้งหมดลงใน array
                this.datakey.push(keys[i]);
              }
              this.get(); 
 
            })
            
                  this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/DataPromotion.json`)
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
                }catch(e){ }


      } else {
        liff.login();
      }
    })


  
  },
    data() {
          return {
              data: {
                key:"p01",
                encodedImage:null,
              },
              imageFile: null,
              imageUrl: null,
              encodedImage:null,
              length: null,
              onboarding: 0,
              dataim:[],
              datakey:[],
          }
      },
      computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
  },
  };
  </script>
  
  <style lang="scss" scoped>
  
  .hidden {
  display: none;
  }
  </style>