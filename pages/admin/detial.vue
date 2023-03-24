<template>
    <div>

      <Navadmin />
        <v-container class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                   ข้อมูลรายละเอียด
                      </div>
                </v-col>
  
                <v-col cols="12">
                    <v-text-field 
                    class="mt-3 "
                         v-model="form.promptpay"
                         dense
                         :rules="phoneRules"
                         prepend-icon="mdi-key-variant"
                         @keypress="onlyNumber($event,13)"
                         label="เบอร์โทรศัพท์ Promptpay"> 
                    </v-text-field>
                    <v-text-field 
                    @keypress="onlyNumber($event,13)"
                         v-model="form.bath"
                         dense
                         prepend-icon="mdi-account"
                         label="ราคามัดจำ ( บาท )"> 
                    </v-text-field>
                    <v-col cols="12" class="pl-0 pt-0">
                      เวลาจองคิวล่วงหน้า (ชั่วโมง)
                            <v-select
                                v-model="form.Tbooking"
                                :items="states"
                                menu-props="auto"
                                :label="form.Tbooking"
                                hide-details
                                prepend-icon="mdi-book-clock-outline"
                                single-line
                                class="pt-0 pl-0 mt-0"
                            ></v-select>
                            </v-col>
                            <v-col cols="12" class="pl-0 pt-0">
                              เวลาที่สามารถยกเลิกคิว (ชั่วโมง)
                            <v-select
                                v-model="form.Cbooking"
                                :items="states"
                                menu-props="auto"
                                :label="form.Cbooking/60"
                                hide-details
                                prepend-icon="mdi-clock-alert-outline"
                                single-line
                                class="pt-0 pl-0 mt-0 pb-2"
                            ></v-select>
                            </v-col>
                            แก้ไขเงื่อนไขการจองคิวของลูกค้า
                    <v-col cols="12"  md="6" class="pt-5 pb-0">
                            <v-textarea 
                           
                        dense
                        outlined
                        name="input-7-4"
                        label="เงื่อนไขการใช้บริการจองคิว"
                        :value=this.form.text >
                            </v-textarea>
                        </v-col>
                    <v-btn class="w100 my-btn mt-5 " width="100%" rounded color="primary" dark  @click="next"> Save Data </v-btn>
                </v-col>      
          </v-row>
        </v-container>
        <Footer />
        <v-dialog v-model="dialog" max-width="290" transition="dialog-bottom-transition">
            
            <v-card>
              <v-card-title>Form Error</v-card-title>
                    <v-card-text>
                      <h3>   กรุณาใส่ข้อมูลให้ครบ</h3>
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
    cancelTime(){
  this.form.Cbooking*=60;
    },
   async next(){
     await this.cancelTime();
        if(this.form.bath!=''&&this.form.promptpay!=''&&this.form.text){
         this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Data.json`, this.form)
         this.dialogSuccess=true;
        }else{
            dialog=true;
        }
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
      if (value == ''){
        return 'กรุณากรอกหมายเลขบัญชี'
      }
      return "กรุณากรอกหมายเลขบัญชีให้ถูกต้อง"
    },
  },

  async mounted() {


    await  this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Data.json`)
                  .then((res) => {
                     this.form.bath=res.data.bath;
                     this.form.promptpay=res.data.promptpay;
                     this.form.text=res.data.text;
                     this.form.Tbooking=res.data.Tbooking;
                     this.form.Cbooking=res.data.Cbooking;
                  })          
    },
    data(){
      return{
        phoneRules: [value => this.phoneValidator(value)],
        dialog:false,
        dialogSuccess:false,
        form:{
          bath:'',
          promptpay:'',
          text:'',
          Tbooking:'',
          Cbooking:''
        },
        states:[
        1,2,3,4,5,6
        ]
      }
    },
  };
  </script>
  
