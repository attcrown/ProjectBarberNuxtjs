<template>
    <div>

      <Navadmin />
        <v-container class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                    <v-icon>mdi-home-edit</v-icon>   <b> หน้าเมนูจัดการข้อมูล</b>
                      </div>
                </v-col>
  
               <v-col class="text-center">
                <div class="mb-10 mt-5">
                  <v-btn class="w100 my-btn mt-0 mb-5 " width="75%" rounded color="blue" @click="btn1"> 
                    <v-icon>mdi-cash-refund </v-icon> <h5> รับเรื่องขอคืนเงิน</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn2"> 
                    <v-icon>mdi-table-account </v-icon> <h5> ตารางงาน</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn3"> 
                    <v-icon>mdi-book-edit-outline </v-icon> <h5> จัดการบัญชี</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn4"> 
                    <v-icon>mdi-home-clock </v-icon> <h5> เวลาทำการร้าน</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn5"> 
                    <v-icon>mdi-monitor-edit </v-icon> <h5> แก้ไขข้อมูลต่างๆ</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn6"> 
                    <v-icon>mdi-history </v-icon> <h5> ประวัติการบริการ</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn8"> 
                      <span class="mdi mdi-file-star-outline"></span> <h5>จัดการโปรโมชั่น</h5>
                     </v-btn>
                     <v-btn class="w100 my-btn mt-0  mb-5" width="75%" rounded color="blue" @click="btn7"> 
                      <span class="mdi mdi-cash-multiple"></span> <h5>รายได้</h5>
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
          this.$router.push("/admin/refund")
      },
      btn2(){
        this.$router.push("/admin/work")
      },
      btn3(){
        this.$router.push("/admin/register")
      },
      btn4(){
        this.$router.push("/admin/timeshop")
      },
      btn5(){
        this.$router.push("/admin/detial")
      },
      btn6(){
        this.$router.push("/admin/history")
      },
      btn7(){
        this.$router.push("/admin/indexdashboard")
      },
      btn8(){
        this.$router.push("/admin/editPromotion")
      }
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
  
