<template>
    <div>

      <Navadmin />
        <v-container class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                      <span class="mdi mdi-cash-multiple"></span> รายได้
                      </div>
                </v-col>
  
               <v-col class="text-center">
                <div class="mb-10 mt-5">
                  <v-btn class="w100 my-btn mt-0 mb-5 " width="75%" rounded color="blue" @click="btn1"> 
                    <span class="mdi mdi-cash-multiple"></span> <h5> รายได้ของช่าง</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn2"> 
                      <span class="mdi mdi-view-dashboard"></span> <h5> DashBoard</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn3"> 
                      <span class="mdi mdi-cogs"></span> <h5> ตั้งค่าการคำนวณ</h5>
                     </v-btn>
                </div>     
               </v-col>       
          </v-row>
        </v-container>
        <Footer />
  </div>
  </template>
  
  <script>
  export default { 
  methods:{
    btn1(){
          this.$router.push("/admin/indexdash/cash")
      },
      btn2(){
        this.$router.push("/admin/indexdash/dashboard")
      },
      btn3(){
        this.$router.push("/admin/indexdash/settingcash")
      },
  },
  
    data(){
      return{
        form:{
          perple:this.$store.getters.getDatahair.name
        }
      }
    },
      computed: {
          getLine(){
             return this.$store.getters.getLine;
          },
          getDatahair(){
             return this.$store.getters.getDatahair;
          },
          
      },
      
      
  };
  </script>
  
