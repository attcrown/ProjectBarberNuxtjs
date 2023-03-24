<template>
    <div>
      <navadmin />
      <v-container class="pt-0 pb-0">
        <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                   หน้าดำเนินการคืนเงิน
                      </div>
                </v-col>
          <v-col cols="12">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-center pr-0 pl-0">Date</th>
                  <th class="text-left pr-0 pl-0">Name</th>
                  <th class="text-left pr-0 pl-0">Refund</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="(item) in data" :key="item.date" >
                    <td class="text-center pr-0 pl-0">{{ item.date }}</td>
                  <td class="pr-0 pl-0">{{ item.name }}</td>
                  <td class="pr-0 pl-0">
                    <v-btn elevation="2" color="#FF7E00" x-small @click="opendialog(item)"> <v-icon small>mdi-cash-refund</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
          
          
        </v-row>
      </v-container>
      <Footer />
          <v-dialog
      v-model="dialogDelete"
      persistent
      max-width="590"
    >
      <v-card>
        <v-card-title class="text-h5">
          <h5> Details <br>name = {{ this.dataDelete.name }}</h5> 

        </v-card-title>
        <v-card-text>
            บัญชี = {{ this.dataDelete.nameBank }} <br> หมายเลขบัญชี = {{ this.dataDelete.Number }} 
            <v-img :src="dataDelete.im" />
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
                          label="อัพโหลดหลักฐานการโอนเงินคืน"
                        ></v-file-input>
                        <v-img v-if="imageFile" :src="imageUrl" />
                        <v-switch 
                                class="mt-2 pt-0"           
                                  color="success" 
                                  hide-details
                            v-model="switch1"
                            :label="`ยืนยันสลิปเงิน`"
                          ></v-switch>
                         </v-col>


        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogDelete = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click=" deletedata()"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNull" max-width="290" transition="dialog-bottom-transition">
            
            <v-card>
              <v-card-title>Form Error</v-card-title>
                    <v-card-text>
                      <h3>   กรุณาใส่ข้อมูลให้ครบ</h3>
                   </v-card-text>
            </v-card>
          </v-dialog>

    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        switch1:false,
        data:[],
        dialogDelete:false,
        dialogNull:false,
        dataDelete:{
            name:null,
            nameBank:null,
            Number:null,
            im:null,
            encodedImage: null,
            userId:null,
            e13:2,
            date:null
        },
        imageFile: null,
        imageUrl: null,
      rules: [
        value => !value || value.size < 2000000 || 'ไฟล์ภาพไม่เกิน 2 MB!',
      ],
      };
    },
    watch: {
    async imageFile(newValue) {
      await this.onFileInput()

    }
  },
    async mounted() {
      try{
      const response = await this.$axios.get(
        "https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel.json"
      );
      this.data = response.data;
      this.date = response.data.data;
      }catch(e){
        
      }
    },
    methods: {
        onFileInput() {
      if (this.imageFile != null) {
        this.imageUrl = URL.createObjectURL(this.imageFile)

        const reader = new FileReader();
        reader.readAsDataURL(this.imageFile);
        reader.onload = () => {
          this.dataDelete.encodedImage = reader.result;
        };
        reader.onerror = error => {
          console.log(error);
        };
      }
    },

      async opendialog(data) {
        this.dataDelete.name = data.name;
        this.dataDelete.nameBank = data.nameBank ;
        this.dataDelete.Number = data.Number;
        this.dataDelete.im = data.im;
        this.dataDelete.key = data.key;
        this.dialogDelete=true;
        this.dataDelete.userId=data.userId
        this.dataDelete.date = data.date
      },

     async deletedata(){
      if(this.switch1 == true && this.imageFile.size <= 2000000){
        await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/successRefund/${this.dataDelete.userId}.json`,this.dataDelete);
       await this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel/${this.dataDelete.key}.json`);
       this.dialogDelete =false
       this.$router.push("/admin/verifyRefund")
      }else{
        this.dialogNull=true
      }
      },


    },
    
  };
  </script>
  