<template>
  <div>
    <Navbarber/>
      <v-container class="pt-0 pb-0">
        <v-row>
          <v-col cols="12" >
                  <div class="mt-8 text-primary text-title text-center">
                 หน้าเมนูจัดการข้อมูล
                    </div>
              </v-col>

             <v-col class="text-center">
              <div class="mb-10 mt-5">                
                <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn1"> 
                  <v-icon>mdi-table-account </v-icon> <h5> ตารางงาน</h5>
                </v-btn>
                <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn2"> 
                  <v-icon>mdi-home-clock </v-icon> <h5> เวลาทำการช่าง</h5>
                </v-btn>
                <v-btn class="w100 my-btn mt-0 mb-5 " width="75%" rounded color="blue" @click="btn3"> 
                  <v-icon>mdi-history </v-icon> <h5> ประวัติการบริการ</h5>
                </v-btn>
                <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn4"> 
                    <v-icon>mdi-cash-refund </v-icon> <h5> รายได้</h5>
                </v-btn>
              </div>

                 
                  
             </v-col>
             <v-col cols="12">
                  
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
        this.$router.push("/barber/work")
    },
    btn2(){
      this.$router.push("/barber/timebarber")
    },
    btn3(){
      this.$router.push("/barber/history")
    },
    btn4(){
      this.$router.push("/barber/cash")
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

