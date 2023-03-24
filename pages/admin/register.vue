<template>
    <div>
      <navadmin />
      <v-container class="pt-0 pb-0">
        <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                   หน้าจัดการบัญชี
                      </div>
                </v-col>
          <v-col cols="12">
            <h5> ** A=admin B=barber</h5>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">UserId</th>
                  <th class="text-left pr-0 pl-0">Id</th>
                  <th class="text-left pr-0 ">Name</th>
                  <th class="text-left pl-0">Role</th>
                  <th class="text-left pr-2 pl-0"><v-btn elevation="2" color="success" small width="100%" @click="dialogAdd = !dialogAdd"><v-icon small>mdi-account-multiple-plus </v-icon></v-btn></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in data" :key="item.userid">
                    <td>{{ item.userid }}</td>
                  <td class="pr-0 pl-0">{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td class="pr-0 pl-0">{{ item.role }}</td>
                  <td class="pr-0 pl-0">
                   <!--  <v-btn elevation="2" color="#FF7E00" x-small @click="opendialog2(item)"><v-icon small>mdi-pencil </v-icon></v-btn> -->
                    <v-btn elevation="2" color="red" x-small @click="opendialog(item)"><v-icon small>mdi-trash-can-outline </v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
          
          
        </v-row>
      </v-container>
      <Footer />
      <v-dialog
            v-model="dialogAdd"
            max-width="500px"
            persistent
          >
            <v-card>
              <v-card-text class="pb-0">
                <v-col cols="12">
                   <h3>เพิ่มผู้ใช้งาน</h3> 
                </v-col>
                <v-text-field 
                class="mt-2"
                @keypress="onlyAz($event,10)"
                         v-model="newdata.id"
                         dense
                         required
                         prepend-icon="mdi-identifier"
                         label="Id"> 
                    </v-text-field>
                    <v-text-field 
                         v-model="pw"
                         dense
                         @keypress="onlyAz($event,10)"
                         required
                         prepend-icon="mdi-key-variant"
                         label="password"> 
                    </v-text-field>
                    <v-text-field 
                         v-model="newdata.name"
                         dense
                         required
                         prepend-icon="mdi-account"
                         label="Name"> 
                    </v-text-field>
                    <v-switch 
                                class="mt-0 pt-0"           
                                  color="warning" 
                                  hide-details
                            v-model="switch1"
                            :label="`เพิ่มเป็น Admin`"
                            @change="addA"
                          ></v-switch>
                <small class="grey--text">ค่าเริ่มต้น = Barber</small>
              </v-card-text>
  
              <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <v-btn
            color="red"
            text
            @click="dialogAdd = false"
          >
            Cancel
          </v-btn>
                <v-btn
                  text
                  color="success"
                  @click="save"
                >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
      v-model="dialogDelete"
      persistent
      max-width="290"
      dark
    >
      <v-card>
        <v-card-title class="text-h5">
          <h5>คุณต้องการลบ ?<br>UserId = {{ this.dataDelete.name }}</h5> 
        </v-card-title>
        <v-card-text>Name = {{ this.dataDelete.name }} <br> Role = {{ this.dataDelete.role }} </v-card-text>
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
            @click="dialogDelete = false,deletedata()"
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
          <v-dialog v-model="dialogFull" max-width="290" transition="dialog-bottom-transition">
            
            <v-card>
              <v-card-title>Id มีผู้ใช้อยู่แล้ว</v-card-title>
                    <v-card-text>
                      <h3>  โปรดใส่ Id ใหม่</h3>
                   </v-card-text>
            </v-card>
          </v-dialog>

          <!-- <v-dialog
            v-model="dialogEdit"
            max-width="500px"
            persistent
          >
            <v-card>
              <v-card-text>
                <v-col cols="12">
                   <h3>เปลียนข้อมูลผู้ใช้งาน</h3> 
                </v-col>
                <v-text-field 
                class="mt-2"
                         v-model="dataEdit.name"
                         dense
                         required
                         prepend-icon="mdi-account"
                         label="Name"> 
                    </v-text-field>
                    <v-switch 
                                class="mt-0 pt-0"           
                                  color="warning" 
                                  hide-details
                            v-model="switch2"
                            :label="`เพิ่มเป็น Admin`"
                            @change="addE"
                          ></v-switch>
                <small class="grey--text">ค่าเริ่มต้น = Barber</small>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
            color="red"
            text
            @click="dialogEdit = false"
          >
            Cancel
          </v-btn>
                <v-btn
                  text
                  color="success"
                  @click="addE(),saveEdit()"
                >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>  -->


    </div>
  </template>
  
  <script>
  const REGEX_Az = /^[a-zA-Z0-9]*$/;
  import CryptoJS from 'crypto-js';
  export default {
    data() {
      return {
        data: [],
        switch1: false,
        switch2: false,
        dialogDelete:false,
        pw: null,
        form: {
          id: null,
          pwd: null,
          role: null,
          name: null,
        },
        dialogAdd:false,
        newdata:{
            id:null,
            pwd:null,
            role:"B",
            name:null,
            userid:null
        },
        dataDelete:{
            name:null,
            role:null,
            userid:null,
        },
        dataEdit:{
            name:null,
            role:null,
            userid:null
        },
        dataAxios:[],
        dialogNull:false,
        dialogFull:false,
        dialogEdit:false
      };
    },
    async mounted() {
      const response = await this.$axios.get(
        "https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/UserList.json"
      );
      this.data = response.data;

      this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/UserList.json`)
                  .then((res) => {
                      const keys = Object.keys(res.data); // ดึง key ออกมาจาก Object
                      for (let i = 0; i < keys.length; i++) { // วนลูปเพื่อเก็บ key ทั้งหมดลงใน array
                          this.dataAxios.push(keys[i]);
                      }
                      console.log(this.dataAxios); // แสดง array ที่มี key ทั้งหมดใน Console
                  })
                  .catch((error) => {
                      console.error(error); // แสดง error message ใน Console
                  });
                  this.switch2=false;
    },
    methods: {

        onlyAz(event, max) {
            if (!REGEX_Az.test(event.key) || event.target.value.length == max) {
                return event.preventDefault()
            }
        },

      async opendialog(data) {
        this.dataDelete.userid = data.userid;
        this.dataDelete.role = data.role;
        this.dataDelete.name = data.name;
        this.dialogDelete=true;
      },
      async opendialog2(data) {
        this.switch2=false;
        this.dataEdit.role = data.role;
        this.dataEdit.name = data.name;
        this.dataEdit.userid = data.userid;
        this.dialogEdit=true;
      },

      deletedata(){
       this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/UserList/${this.dataDelete.userid}.json`);
       this.$router.push("/admin/verify")
      },
      save(){
        if(this.newdata.id!=null && this.pw!=null && this.newdata.name!=null){
        const hash = CryptoJS.SHA1(this.pw).toString();
        console.log('ก่อนเข้า'+this.newdata.pwd)
      console.log("pwd = " + hash);

      const str = this.newdata.id;
      // แปลงแต่ละตัวอักษรเป็นตัวเลขฐานสิบ  ใช้ฟังก์ชัน charCodeAt() เพื่อดึงรหัส ASCII ของแต่ละตัวอักษร
      let result = 0;
      for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i) * 123;
      }
      result = 5555555 - result;
      let check=true;
     for(let i=0;i<this.dataAxios.length;i++){
        if(this.dataAxios[i]==result){
            check=false;
        }
      }
      if(check){
      this.newdata.userid=result;
      this.newdata.pwd=hash;

        this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/UserList/${result}.json`, this.newdata)
        console.log(200)
        this.$router.push("/admin/verify")
       }else{
        this.newdata.id==null
            this.dialogFull=true;
       }
    }else{
        this.dialogNull=true;
    }
      },
      saveEdit(){
        if(this.dataEdit.name!=null ){
            this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/UserList/${this.dataEdit.userid}.json`,this.dataEdit)
            console.log(200)
            this.$router.push("/admin/verify")
        }
      },
      async changedata(id) {
        console.log(id)
        /*
        const response = await this.$axios.delete(
          `https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/UserList/${id}.json`
        );
        console.log(response);
        this.data = this.data.filter((item) => item.id !== id);*/
      },
      addA(){
        if(this.switch1==true){
            this.newdata.role="A"
        }else{
            this.newdata.role="B"
        }
      },
      addE(){

        if( this.dataEdit.role="A"){
            this.switch2==true
        }else if(this.dataEdit.role="B"){
            this.switch2==false
        }
        if(this.switch2==true){
            this.dataEdit.role="A"
        }else{
            this.dataEdit.role="B"
        }
    },
      
    },
  };
  </script>
  