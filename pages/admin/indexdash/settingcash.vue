<template>
    <div>

      <Navadmin />
        <v-container class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                      ตั้งค่าการคำนวณเปอร์เซ็นต์
                      </div>
                </v-col>
  
                <v-col cols="12">
                    <v-text-field 
                    class="mt-3 "
                         v-model="percent" 
                         dense
                         :rules="phoneRules"
                         prepend-icon="mdi mdi-percent"                        
                         label="หักเปอร์เซ็นต์จากทางร้าน"> 
                    </v-text-field>
                    
                    <v-btn class="w100 my-btn mt-5 " 
                    width="100%" rounded color="primary" 
                    dark 
                    @click="savedata(percent)"
                    > Save Data </v-btn>
                </v-col>      
          </v-row>
        </v-container>
        <Footer />
        
        <v-dialog v-model="dialog" max-width="290" transition="dialog-bottom-transition">
            <v-card>
              <v-card-title>Form Error</v-card-title>
                    <v-card-text>
                      <h3> กรุณากรอกข้อมูลให้ถูกต้อง<br>สามารถใส่ค่าได้ไม่เกิน 100%</h3>
                   </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogSuccess" max-width="290" transition="dialog-bottom-transition">
            
            <v-card shaped>
              <v-card-title>Success</v-card-title>
                    <v-card-text>
                      <h3> บันทึกข้อมูลรียบร้อย </h3>
                   </v-card-text>
            </v-card>
          </v-dialog>

         
  </div>
  </template>
  
  <script>
  const REGEX_NUMBER = /^[0-9]*$/
  export default { 
  methods:{
    savedata(value){
      if(REGEX_NUMBER.test(value) && value.length >= 1 && value.length <= 3 && value <= 100) {
        const db = this.$fireModule.database();
        db.ref("Data/").update({
          percent : value,
        });
        this.dialogSuccess = true;
      }else{this.dialog = true;};
    },
    phoneValidator(value) {
      if (REGEX_NUMBER.test(value) && value.length >= 1 && value.length <= 3 && value <= 100) {
        return true
      }
      if (value == ''){
        return 'กรุณากรอกข้อมูล'
      }
      return "กรุณากรอกให้ถูกต้อง สามารถใส่ค่าได้ไม่เกิน 100%"
    },
    check(){
      const db = this.$fireModule.database();
      db.ref("Data/").on("value", (snapshot) => {
        const childDate = snapshot.val();
        this.percent = childDate.percent;
      });
    }
  },

  mounted() {
      this.check();
    },
    data(){
      return{
        phoneRules: [value => this.phoneValidator(value)],
        dialog:false,
        dialogSuccess:false,
        percent:null,
      }
    },
  };
  </script>
  
