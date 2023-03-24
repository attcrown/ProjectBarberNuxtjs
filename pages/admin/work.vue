<template>
  <div>
    <Navadmin />
    <div class="mt-8 text-primary text-title text-center">
      <span class="mdi mdi-briefcase-outline"></span> Work Schedule
    </div>

    <template>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" cols="6" sm="6">
            <div
              class="container mt-1 text-primary text-title text-left"
              style="font-size: 15px"
            >
              <span class="mdi mdi-calendar-badge"></span> {{ currentDate() }}
            </div>
          </v-col>
          <v-col class="d-flex pr-0 pl-0" cols="3" sm="3">
            <v-btn small color="primary" dark @click="searchbtn = true">
              Search<span class="mdi mdi-magnify"></span>
            </v-btn>
          </v-col>
          <v-col class="d-flex" cols="3" sm="3">
            <v-btn
              class="text-right"
              small
              color="primary"
              style="float: right"
              @click="clearindata(), namebarber(), (addq = true)"
              >ADD<span class="mdi mdi-plus"></span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <v-simple-table>      
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left pr-0 pl-0">
            <v-btn x-small @click="toggleSort('date')">Date</v-btn>
          </th>
          <th class="text-left pr-1 pl-1">Time</th>
          <th class="text-left pr-1 pl-1">
            Barber
          </th>
          <th class="text-left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="pr-0 pl-0">{{ item.date }}</td>
          <td class="pr-1 pl-1">{{ item.time }}</td>
          <td class="pr-1 pl-1">{{ item.perple.substring(0, 8) + ".." }}</td>
          <td>
            <v-btn elevation="2" color="primary" x-small @click=" selectedItem = item;dialog = true;"><v-icon small>mdi mdi-account-details </v-icon></v-btn>
            <v-btn elevation="2" color="success" x-small @click="checkM(item)"><v-icon small>mdi-currency-usd </v-icon></v-btn>
          </td>
        </tr>
      </tbody>


       <v-dialog v-model="dialogMoney" persistent max-width="500px">
          <v-card>
            <v-card-text>
              <v-col cols="12">
                <div class="mt-1 text-primary text-title text-center mb-5">
                  Detail
                </div>
                <h3 class="mb-2">
                  <span class="mdi mdi-account"></span> Name :
                  {{ addmoney ? addmoney.Name : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-store-plus"></span> Barber :
                  {{ addmoney ? addmoney.barber : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-calendar-alert-outline"></span> Date :
                  {{  addmoney ? addmoney.date : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-av-timer"></span> Time :
                  {{  addmoney ? addmoney.time : "-" }}
                </h3>
                     <v-text-field 
                    class="mt-3 "
                         v-model="addmoney.money"
                         dense
                         :rules="phoneRules3"
                         prepend-icon="mdi-currency-usd"
                         @keypress="onlyNumber($event,13)"
                         label="ค่าบริการลูกค้า"> 
                    </v-text-field>
                    <v-switch 
                                class="mt-0 pt-0"           
                                  color="warning" 
                                  hide-details
                            v-model="switchM"
                            :label="`ยืนยันข้อมูล`"
                          ></v-switch>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="dialogMoney = false">
                Close
              </v-btn>
              <v-btn color="success" text @click="saveM">
                <span class="mdi mdi-content-save"></span> Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="dialogMS" persistent max-width="500px">
          <v-card>
            <v-card-text class="pb-0">
              <v-col cols="12">
                <div class="mt-1 text-primary text-title text-center mb-5">
                  Detail
                </div>
                <h3 class="mb-2">
                  <span class="mdi mdi-account"></span> Name :
                  {{ addmoney ? addmoney.Name : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-store-plus"></span> Barber :
                  {{ addmoney ? addmoney.barber : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-calendar-alert-outline"></span> Date :
                  {{  addmoney ? addmoney.date : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-av-timer"></span> Time :
                  {{  addmoney ? addmoney.time : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-av-timer"></span> ค่าบริการลูกค้า :
                  {{  addmoney ? addmoney.money : "-" }}
                </h3>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="dialogMS = false">
                Close
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


          
    </v-simple-table>
    <Footer />

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-text>
              <v-col cols="12">
                <div class="mt-1 text-primary text-title text-center mb-5">
                  Detail
                </div>
                <h3 class="mb-2">
                  <span class="mdi mdi-account"></span> Name :
                  {{ selectedItem ? selectedItem.name : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-store-plus"></span> Barber :
                  {{ selectedItem ? selectedItem.perple : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-calendar-alert-outline"></span> Date :
                  {{ selectedItem ? selectedItem.date : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-av-timer"></span> Time :
                  {{ selectedItem ? selectedItem.time : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-phone"></span> Phone :
                  {{ selectedItem ? selectedItem.phone : "-" }}
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-cash"></span> เงินมัดจำ :
                  {{ selectedItem ? selectedItem.bath : "-" }} บาท
                </h3>
                <h3 class="mb-0">
                  <span class="mdi mdi-message-alert-outline"></span> Comment :
                  {{ selectedItem ? selectedItem.message : "-" }}
                </h3>
                <h3 class="text-center mt-3">
                  <span class="mdi mdi-cash-clock"></span> สลิปโอนเงิน
                </h3>
                <v-img
                  v-if="selectedItem && selectedItem.img"
                  :src="selectedItem.img"
                ></v-img>
                <center><h4 class="mb-2 mt-3">                  
                  {{selectedItem ? selectedItem.cash : "-"}}
                </h4></center>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="red darken-1" text @click="checkpopup(selectedItem)">
                <span class="mdi mdi-trash-can-outline"></span> Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog v-model="confirmdel" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> ยกเลิกการจองคิว? </v-card-title>
            <v-card-text>
              
              <v-col cols="12">
                  <v-form>
                    <v-col cols="12" class="pt-0 pl-0 mt-0">
                            <v-select
                                v-model="data.nameBank"
                                :items="nameBank"
                                menu-props="auto"
                                label="เลือกธนาคาร"
                                hide-details
                                prepend-icon="mdi-bank"
                                single-line
                                class="pt-0 pl-0 mt-0"
                               ></v-select>
                            </v-col>
                    <v-text-field 
                         v-model="data.Number"
                         dense
                         prepend-icon="mdi-numeric"
                         :rules="phoneRules2"
                         @keypress="onlyNumber($event,13)"
                         label="หมายเลขบัญชี"> 
                    </v-text-field>
                    <v-switch 
                                class="mt-0 pt-0"           
                                  color="success" 
                                  hide-details
                            v-model="switch1"
                            :label="`ยืนยันข้อมูลถูกต้อง`"
                            @change="getim"
                          ></v-switch>
                  </v-form> 
                  
                </v-col>
              
              </v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="confirmdel = false">
                Cancel
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="onDeleteItem(selectedItem)"
              >
                <span class="mdi mdi-trash-can-outline"></span> Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog v-model="confirmdelnoid" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> ยกเลิกการจองคิว? </v-card-title>
            <v-card-text>
              การยกเลิกครั้งนี้จะทำให้คิวของลูกค้าถูกยกเลิกไปท่านยืนยันที่จะยกเลิกหรือไม่              
              </v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="confirmdelnoid = false">
                Cancel
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="
                  onDeleteItemnoid(selectedItem)"
              >
                <span class="mdi mdi-trash-can-outline"></span> Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog v-model="addq" persistent max-width="500px">
          <v-card>
            <v-card-text>
              <v-col cols="12">
                <div class="mt-1 text-primary text-title text-center mb-5">
                  <span class="mdi mdi-pen-plus"></span> Add
                </div>
                <v-text-field
                v-model="firstname"
                  label="First name"
                  required
                  prepend-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                v-model="phonenumber"
                  @keypress="onlyNumber($event,10)"
                  label="phone"
                  :rules="phoneRules"
                   prepend-icon="mdi-phone"
                  required
                ></v-text-field>
                <v-btn color="primary" class="mb-5" @click="calendar = true">
                  เลือกวันที่
                </v-btn>
                <h3 class="mt-2" style="float: right">
                  : {{ dateclick ? dateclick : "-" }}
                </h3>
                <v-btn class="mb-5"
                    depressed
                    color="primary"
                    @click="checkbarber = true;"
                    >
                ดูตารางช่าง<span class="mdi mdi-calendar-range"></span>
                </v-btn>
                <v-select
                  v-model="selectedBarber"
                  :items="selectbarbers"
                  label="Barber"
                  dense
                  solo
                  @change="enableSelection(), changetimebarber()"
                ></v-select>
                <v-select
                  v-model="selectedTime"
                  :items="selecttimes"
                  label="Time"
                  dense
                  solo
                  :disabled="isDisabled"
                ></v-select>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="addq = false">
                Close
              </v-btn>
              <v-btn
                color="success darken-1"
                text
                @click="saveqbarber(), (addq = false)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <div class="text-center">
        <v-dialog v-model="calendar" width="500">
          <v-card>
            <template>
              <v-row justify="center">
                <v-date-picker
                  v-model="dateclick"
                  :allowed-dates="allowedDates"
                  class="mt-4"
                  min="2023-01-1"
                  max="2050-01-1"
                ></v-date-picker>
              </v-row>
            </template>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="clearnamebarber(), namebarber(), (calendar = false)"
              >
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <template>
      <div class="text-center">
        <v-dialog v-model="searchbtn" width="500">                
          <v-card>
            <div class="container">
              <v-select
                :items="selectQ"
                label="Select"
                v-model="dataselected"
              ></v-select>

              <v-select
                :items="searchBarber"
                label="Barber"
                v-model="datasearchbarber"
              ></v-select>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                text
                @click="selectqbarber(),(searchbtn = false)"
              >
                Search
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <div class="text-center">
            <v-dialog
            v-model="checkbarber"
            width="500"
            >
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    <span class="mdi mdi-calendar-account-outline"></span> ตารางงานช่าง
                </v-card-title>

                <v-card-text>
                    <v-col
                        class="d-flex"
                        cols="12"
                        sm="6"
                    >
                        <v-select
                        v-model="barberitemssel"
                        :items="barberitems"
                        label="Barber"
                        @change="loadworkdaybarber();"
                        ></v-select>
                    </v-col>                

                <template>
                    <v-row justify="center">
                        <v-date-picker
                        v-model="dateclickpop"
                        :allowed-dates="allowedDatesbarber"
                        class="mt-4"
                        min="2023-01-1"
                        max="2050-01-1"
                        :events="arrayEvents"
                        event-color="green lighten-1"
                        ></v-date-picker>
                    </v-row>
                </template>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="black"
                    text
                    @click="checkbarber = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="success"
                    text
                    @click="(checkbarber = false),(isDisabled = false),autoselectdate()"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
  </div>
</template>

<script>
const REGEX_PHONE = /^[0]([0-9]{9})*$/
const REGEX_NUMBER = /^[0-9]*$/
import { objectExpression } from "@babel/types";
import { time } from "console";
export default {
  data() {
    return {
      dialogMS:false,
      dialogNull:false,
      switchM:false,
      dialogMoney:false,
      addmoney:{
        Name:null,
        barber:null,
        time:null,
        date:null,
        money:null
      },
      M:{
        money:null
      },
      switch1:false,
      nameBank: [
        'PROMPTPAY', 'SCB', 'BBL', 'KBANK', 'KTB', 'BAY', 'TMB', 'TBAMK', 'KK',
        'TISCO', 'CIMBT', 'LH', 'UOB', 'BACC', 'ICBC', 'GSB',
      ],
      phoneRules: [value => this.phoneValidator(value)],
      phoneRules2: [value => this.phoneValidator2(value)],
      phoneRules3: [value => this.phoneValidator3(value)],
      data: {
        userId: null,
        nameBank: null,
        Number: null,
        im: null,
        date:null,
        e13:1,
        name:"",
        key:"p01",
        userId:null,
      },
      arrayEvents: [],
      barberitems: [],
      dateclick:null,
      dateclickpop:null,
      barberitemssel: null,
      checkbarber: false,
      workdaysbarber:[],
      searchBarber:[],
      datasearchbarber: null,
      searchbtn: false,
      dateclick: this.currentDate(),
      valid: false,
      calendar: false,
      firstname: "",
      phonenumber: "",
      number: [
        (v) => /[0-9]/.test(v) || "ใส่เฉพาะตัวเลข",
        (v) => v.length == 10 || "ระบุตัวเลขให้ครบ",
      ],
      dataselected: null,
      selectQ: ["Day", "Week", "Month", "All"],
      dialog: false,
      addq: false,
      confirmdel: false,
      items: [],
      sortBy: "date",
      sortDesc: false,
      selectedItem: null,
      selectedBarber: null,
      selectedTime: null,
      selecttimes: [],
      selectbarbers: [],
      workdays: [],
      isDisabled: true,
      confirmdelnoid: false,
    };
  },
  computed: {
    sortedItems() {
      return this.items.sort((a, b) => {
        let modifier = 1;
        if (this.sortDesc) modifier = -1;

        // แปลงวันที่และเวลาให้อยู่ในรูปแบบตัวเลขที่สามารถเปรียบเทียบกันได้
        const dateTimeA = new Date(`${a.date} ${a.time}`).getTime();
        const dateTimeB = new Date(`${b.date} ${b.time}`).getTime();

        if (dateTimeA < dateTimeB) return -1 * modifier;
        if (dateTimeA > dateTimeB) return 1 * modifier;
        return 0;
      });
    },
  },
  mounted() {
    this.fetchData();
    this.loadworkday();
    this.searchbarber();
    this.searchbarbertime();
    this.autodelfetchData();

    this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel.json`)
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
                  this.switch2=false;

      //////////////////////////////////////////////////// จบ
      let dateArray = this.printDate().split("/");
      let cd = Number(dateArray[0]);
      let cm = Number(dateArray[1]);
      let cy = Number(dateArray[2].substring(0, 4)) - 543;

      this.data.date = cy + "-" + cm + "-" + cd;
      // console.log(this.form.dateEnd)


    

  },
  methods: {
    checkM(data){
      this.addmoney.Name = data.name;
        this.addmoney.barber = data.perple;
        this.addmoney.time = data.time;
        this.addmoney.date = data.date;

      this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.addmoney.barber}/${this.addmoney.date}/${this.addmoney.time}.json`).then((res) => {
            if(res.data.money!=null){
              this.addmoney.money=res.data.money
              this.dialogMS=true;
            }else{
             this.dialogMoney=true;
            }
          });
    },
    saveM(){
      this.M.money=this.addmoney.money;
        if(this.switchM!=false && this.addmoney.money!=null){
          this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.addmoney.barber}/${this.addmoney.date}/${this.addmoney.time}.json`, this.M)
          this.dialogMoney=false;
        }else{ this.dialogNull=true }
        
    },
    phoneValidator3(value) {
      if (REGEX_NUMBER.test(value)) {
        return true
      }
      if (value == '') {
        return 'กรุณากรอกจำนวนเงิน'
      }
      return "กรุณากรอกจำนวนเงินให้ถูกต้อง"
    },
    phoneValidator2(value) {
      if (REGEX_NUMBER.test(value) && value.length >= 10 && value.length <= 13 & value.length != 11 && value.length != 12) {
        return true
      }
      if (value == '') {
        return 'กรุณากรอกหมายเลขบัญชี'
      }
      return "กรุณากรอกหมายเลขบัญชีให้ถูกต้อง"
    },
    printDate: function () {
      return new Date().toLocaleString();
    },
    printTime: function () {
      return new Date().toLocaleTimeString();
    },
    async getim() {
      try{
      await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.data.userId}.json`).then((res) => {
        this.data.im = res.data.encodedImage;
        this.data.name = res.data.name;
      });}catch(e){}
    },
    onlyNumber(event, max) {
      if (!REGEX_NUMBER.test(event.key) || event.target.value.length == max) {
        return event.preventDefault()
      }
    },
    phoneValidator(value) {
            if (REGEX_PHONE.test(value) && value.length == 10) {
                return true
            }
            if (value == '') {
                return 'กรุณากรอกเบอร์โทรติดต่อ'
            }
            return "กรุณากรอกเบอร์โทรให้ถูกต้อง"
        },
    allowedDates(val) {
      return this.workdays.includes(val);
    },
    allowedDatesbarber(val) {
        return this.workdaysbarber.includes(val);
    },
    loadworkday() {
      const db = this.$fireModule.database();
      db.ref("TimeQBarber").on("value", (snapshot) => {
        const childData = snapshot.val();
        const items = [];
        for (const dayId in childData) {
          if (parseInt(dayId.substring(0, 4)) > this.currentDate().substring(0, 4)){
            items.push(dayId);
          }else if(parseInt(dayId.substring(0, 4)) == 
          this.currentDate().substring(0, 4) &&
          parseInt(dayId.substring(5, 7)) > 
          this.currentDate().substring(5, 7)
          ){
            items.push(dayId);
          }else if(parseInt(dayId.substring(0, 4)) == 
          this.currentDate().substring(0, 4) &&
          parseInt(dayId.substring(5, 7)) == 
          this.currentDate().substring(5, 7) &&
          parseInt(dayId.substring(8, 10)) >= 
          this.currentDate().substring(8, 10)
          ){
            items.push(dayId);
          }else{}
        }
        this.workdays = items;
      });
    },
    loadworkdaybarber(){
      const db = this.$fireModule.database();
      db.ref("TimeQBarber").on("value", (snapshot) => {
          const childData = snapshot.val();
          const items = [];
          for (const dayId in childData) {
          const user = childData[dayId];
          for (const keyuser in user) {
              if(keyuser == this.barberitemssel){
              if (parseInt(dayId.substring(0, 4)) > this.currentDate().substring(0, 4)){
                  items.push(dayId);
              }else if(parseInt(dayId.substring(0, 4)) == 
              this.currentDate().substring(0, 4) &&
              parseInt(dayId.substring(5, 7)) > 
              this.currentDate().substring(5, 7)
              ){
                  items.push(dayId);
              }else if(parseInt(dayId.substring(0, 4)) == 
              this.currentDate().substring(0, 4) &&
              parseInt(dayId.substring(5, 7)) == 
              this.currentDate().substring(5, 7) &&
              parseInt(dayId.substring(8, 10)) >= 
              this.currentDate().substring(8, 10)
              ){
                  items.push(dayId);
              }else{}
              } 
          }           
          }
          this.workdaysbarber = items;
          this.arrayEvents = items;
      });
    },
    autoselectdate(){
      this.selectedBarber = this.barberitemssel;
      this.dateclick = this.dateclickpop;
      this.changetimebarber();
    }, 
    selectqbarber() {
      console.log(this.dataselected);
      if (this.dataselected == "Day") {
        this.fetchData();
      } else if (this.dataselected == "Week") {
        this.fetchDataweek();
      } else if (this.dataselected == "Month") {
        this.fetchDatamonth();
      } else {
        this.fetchDataall();
      }
    },
    enableSelection() {
      this.isDisabled = false;
    },
    clearindata() {
      this.selectedBarber = "";
      this.firstname = "";
      this.phonenumber = "";
      this.selectedTime = "";
      this.selecttimes = [];
    },
    clearnamebarber() {
      this.selectedBarber = "";
      this.selectedTime = "";
      this.selecttimes = [];
    },
    namebarber() {
      console.log("namebarber");
      console.log(this.dateclick);
      const db = this.$fireModule.database();
      db.ref(`TimeQBarber/${this.dateclick}`).on("value", (snapshot) => {
        const childData = snapshot.val();
        const items = [];
        for (const userId in childData) {
          if (userId != "nBarber") {
            items.push(userId);
          }
        }        
        this.selectbarbers = items;
      });
    },
    searchbarber(){
      const db = this.$fireModule.database();
      db.ref(`UserList/`).on("value", (snapshot) => {
        const childData = snapshot.val();
        const items = [];
        for(const keyid in childData){
          const user = childData[keyid];
          if(user.role == 'B'){
            items.push(user.name);
          }
        }
        items.push('All');
        this.searchBarber = items;
      });
    },
    searchbarbertime(){
        const db = this.$fireModule.database();
        db.ref(`UserList/`).on("value", (snapshot) => {
            const childData = snapshot.val();
            const items = [];
            for(const keyid in childData){
            const user = childData[keyid];
            if(user.role == 'B'){
                items.push(user.name);
            }
            }
            this.barberitems = items;
        });
    },  
    changetimebarber() {
      const db = this.$fireModule.database();
      db.ref(`TimeQBarber/${this.dateclick}/${this.selectedBarber}`).on(
        "value",
        (snapshot) => {
          const childData = snapshot.val();
          const items = [];
          db.ref(`booking`).on("value", (snapshot) => {
            const childData2 = snapshot.val();
            const deltime = [];
            for (const databook in childData2) {
              const indata = childData2[databook];
              if (
                indata.date == this.dateclick &&
                indata.perple == this.selectedBarber
              ) {
                deltime.push(indata.time);
              }
            }
            for (const times in childData) {
              const time = childData[times];
              if (!deltime.includes(time)) {
                if (
                  parseInt(this.dateclick.substring(8, 10)) >
                  parseInt(new Date().getDate())
                ) {
                  items.push(time);
                } else if (
                  parseInt(time.substring(0, 2)) >=
                  new Date().getHours() + 1
                ) {
                  items.push(time);
                } else {
                }
              }
            }
          });
          console.log(items);
          this.selecttimes = items;
        }
      );
    },
    fetchData() {
      console.log("fetchData");
      if(this.datasearchbarber != 'All' && this.datasearchbarber != null){
        const db = this.$fireModule.database();
        db.ref("booking").on("value", (snapshot) => {
          const childDate = snapshot.val();
          const items = [];
          for (const keyId in childDate) {
            const datauser = childDate[keyId];
            if (datauser && datauser.date == this.currentDate()) {
              if(datauser.perple == this.datasearchbarber){
                const item = {
                keyId,
                date: datauser.date,
                name: datauser.name,
                perple: datauser.perple,
                phone: datauser.phoneNumber,
                time: datauser.time,
                img: datauser.encodedImage,
                message: datauser.etc || "-",
                bath: datauser.bath || "-",
                cash: datauser.cash,
                userId: datauser.userId,
              };
              items.push(item);
              }
            }
          }
          this.items = items;
        });
      }else{
        const db = this.$fireModule.database();
        db.ref("booking").on("value", (snapshot) => {
          const childDate = snapshot.val();
          const items = [];
          for (const keyId in childDate) {
            const datauser = childDate[keyId];
            if (datauser && datauser.date == this.currentDate()) {
              const item = {
                keyId,
                date: datauser.date,
                name: datauser.name,
                perple: datauser.perple,
                phone: datauser.phoneNumber,
                time: datauser.time,
                img: datauser.encodedImage,
                message: datauser.etc || "-",
                bath: datauser.bath || "-",
                cash: datauser.cash,
                userId: datauser.userId,
              };
              items.push(item);
            }
          }
          this.items = items;
        });
      }
    },
    fetchDataweek() {
      console.log("fetchDatweek");
      if(this.datasearchbarber != 'All' && this.datasearchbarber != null){
        const db = this.$fireModule.database();
        db.ref("booking").on("value", (snapshot) => {
          const childDate = snapshot.val();
          const items = [];
          for (const keyId in childDate) {
            const datauser = childDate[keyId];
            if (
              datauser &&
              parseInt(datauser.date.substring(8, 10)) >=
                parseInt(this.currentDate().substring(8, 10)) &&
              datauser.date.substring(8, 10) <=
                parseInt(this.currentDate().substring(8, 10)) + 7
            ) {
              if(datauser.perple == this.datasearchbarber){
                const item = {
                  keyId,
                  date: datauser.date,
                  name: datauser.name,
                  perple: datauser.perple,
                  phone: datauser.phoneNumber,
                  time: datauser.time,
                  img: datauser.encodedImage,
                  message: datauser.etc || "-",
                  bath: datauser.bath || "-",
                  cash: datauser.cash,
                  userId: datauser.userId,
                };
              items.push(item);
              }              
            }
          }
          this.items = items;
        });
      }else{
        const db = this.$fireModule.database();
        db.ref("booking").on("value", (snapshot) => {
          const childDate = snapshot.val();
          const items = [];
          for (const keyId in childDate) {
            const datauser = childDate[keyId];
            if (
              datauser &&
              parseInt(datauser.date.substring(8, 10)) >=
                parseInt(this.currentDate().substring(8, 10)) &&
              datauser.date.substring(8, 10) <=
                parseInt(this.currentDate().substring(8, 10)) + 7
            ) {              
              const item = {
                keyId,
                date: datauser.date,
                name: datauser.name,
                perple: datauser.perple,
                phone: datauser.phoneNumber,
                time: datauser.time,
                img: datauser.encodedImage,
                message: datauser.etc || "-",
                bath: datauser.bath || "-",
                cash: datauser.cash,
                userId: datauser.userId,
              };
            items.push(item);
            }            
          }
          this.items = items;
        });        
      }
    },
    fetchDatamonth() {
      console.log("fetchDatamonth");
      if(this.datasearchbarber != 'All' && this.datasearchbarber != null){
        const db = this.$fireModule.database();
        db.ref("booking").on("value", (snapshot) => {
          const childDate = snapshot.val();
          const items = [];
          for (const keyId in childDate) {
            const datauser = childDate[keyId];
            if (
              datauser &&
              parseInt(datauser.date.substring(0, 4)) ==
                parseInt(this.currentDate().substring(0, 4))
            ) {
              if (
                parseInt(datauser.date.substring(5, 7)) ==
                parseInt(this.currentDate().substring(5, 7))
              ) {
                if (
                  parseInt(datauser.date.substring(8, 10)) >=
                    parseInt(this.currentDate().substring(8, 10)) &&
                  parseInt(datauser.date.substring(8, 10)) <= 30
                ) {
                  if(datauser.perple == this.datasearchbarber){
                    const item = {
                      keyId,
                      date: datauser.date,
                      name: datauser.name,
                      perple: datauser.perple,
                      phone: datauser.phoneNumber,
                      time: datauser.time,
                      img: datauser.encodedImage,
                      message: datauser.etc || "-",
                      bath: datauser.bath || "-",
                      cash: datauser.cash,
                      userId: datauser.userId,
                    };
                  items.push(item);
                  }                  
                }
              }
            }
          }
          this.items = items;
        });
      }else{
        const db = this.$fireModule.database();
        db.ref("booking").on("value", (snapshot) => {
          const childDate = snapshot.val();
          const items = [];
          for (const keyId in childDate) {
            const datauser = childDate[keyId];
            if (
              datauser &&
              parseInt(datauser.date.substring(0, 4)) ==
                parseInt(this.currentDate().substring(0, 4))
            ) {
              if (
                parseInt(datauser.date.substring(5, 7)) ==
                parseInt(this.currentDate().substring(5, 7))
              ) {
                if (
                  parseInt(datauser.date.substring(8, 10)) >=
                    parseInt(this.currentDate().substring(8, 10)) &&
                  parseInt(datauser.date.substring(8, 10)) <= 30
                ) {                 
                  const item = {
                    keyId,
                    date: datauser.date,
                    name: datauser.name,
                    perple: datauser.perple,
                    phone: datauser.phoneNumber,
                    time: datauser.time,
                    img: datauser.encodedImage,
                    message: datauser.etc || "-",
                    bath: datauser.bath || "-",
                    cash: datauser.cash,
                    userId: datauser.userId,
                  };
                items.push(item);                                  
                }
              }
            }
          }
          this.items = items;
        });
      }
    },
    fetchDataall() {
      console.log("fetchDataall");
      if(this.datasearchbarber != 'All' && this.datasearchbarber != null){
        const db = this.$fireModule.database();
        db.ref("booking").on("value", (snapshot) => {
          const childDate = snapshot.val();
          const items = [];
          for (const keyId in childDate) {
            const datauser = childDate[keyId];
            if (
              datauser &&
              parseInt(datauser.date.substring(0, 4)) >=
                parseInt(this.currentDate().substring(0, 4))
            ) {
              if (
                parseInt(datauser.date.substring(5, 7)) >=
                parseInt(this.currentDate().substring(5, 7))
              ) {
                if (
                  parseInt(datauser.date.substring(8, 10)) >=
                  parseInt(this.currentDate().substring(8, 10))
                ) {
                  if(datauser.perple == this.datasearchbarber){
                    const item = {
                      keyId,
                      date: datauser.date,
                      name: datauser.name,
                      perple: datauser.perple,
                      phone: datauser.phoneNumber,
                      time: datauser.time,
                      img: datauser.encodedImage,
                      message: datauser.etc || "-",
                      bath: datauser.bath || "-",
                      cash: datauser.cash,
                      userId: datauser.userId,
                    };
                  items.push(item);
                  }                  
                }
              }
            }
          }
          this.items = items;
        });
      }else{
        const db = this.$fireModule.database();
        db.ref("booking").on("value", (snapshot) => {
          const childDate = snapshot.val();
          const items = [];
          for (const keyId in childDate) {
            const datauser = childDate[keyId];
            if (
              datauser &&
              parseInt(datauser.date.substring(0, 4)) >=
                parseInt(this.currentDate().substring(0, 4))
            ) {
              if (
                parseInt(datauser.date.substring(5, 7)) >=
                parseInt(this.currentDate().substring(5, 7))
              ) {
                if (
                  parseInt(datauser.date.substring(8, 10)) >=
                  parseInt(this.currentDate().substring(8, 10))
                ) {
                  const item = {
                    keyId,
                    date: datauser.date,
                    name: datauser.name,
                    perple: datauser.perple,
                    phone: datauser.phoneNumber,
                    time: datauser.time,
                    img: datauser.encodedImage,
                    message: datauser.etc || "-",
                    bath: datauser.bath || "-",
                    cash: datauser.cash,
                    userId: datauser.userId,
                  };
                  items.push(item);
                }
              }
            }
          }
          this.items = items;
        });
      }
    },
    toggleSort() {
      this.sortDesc = !this.sortDesc;
    },
    currentDate() {
      const current = new Date();
      let month = current.getMonth() + 1;
      let day = current.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      const date = `${current.getFullYear()}-${month}-${day}`;
      return date;
    },
    checkpopup(item){
      const {userId} = item;
      console.log(userId);
      if(userId != undefined && userId != null && userId != ""){
        console.log("doitID");
        this.confirmdel = true;
      }else{
        this.confirmdelnoid = true;
      }
    },
    async onDeleteItem(item) {
      const {keyId , userId ,img ,name ,date ,time ,perple} = item;
        this.confirmdel = true;
        this.data.userId = userId;
        this.data.im = img;
        this.data.name = name;
        if(this.switch1 == true && this.data.Number != null && this.data.nameBank != null ){
        await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userCancel/${this.data.key}.json`, this.data)       
        const db = this.$fireModule.database();
        db.ref(`booking/${keyId}`).remove();
        db.ref(`userLineliff/${userId}`).remove(); 
        db.ref(`Table/${perple}/${date}/${time}`).remove();
        this.confirmdel=false;
        this.dialog=false;
      }      
  },
  onDeleteItemnoid(item){
    const {keyId , userId,date ,time ,perple} = item;
    this.confirmdelnoid = true;
    const db = this.$fireModule.database();
    db.ref(`booking/${keyId}`).remove();
    db.ref(`userLineliff/${userId}`).remove(); 
    db.ref(`Table/${perple}/${date}/${time}`).remove();
    this.confirmdelnoid=false;
    this.dialog=false;
  },
    saveqbarber() {
      try {
        if (
          this.dateclick == "" ||
          this.firstname == "" ||
          this.selectedBarber == "" ||
          this.phonenumber == "" ||
          this.selectedTime == ""
        ) {
          alert("บันทึกไม่สำเร็จ");
          return;
        }
        let key = new Date().getTime();
        const db = this.$fireModule.database();
        db.ref("booking/" + key).set({
          date: this.dateclick,
          name: this.firstname,
          perple: this.selectedBarber,
          phoneNumber: this.phonenumber,
          time: this.selectedTime,
          cash:"ไม่มีเงินโอน เนื่องจากช่างเพิ่มคิวด้วยตนเอง",
        });
        db.ref(`Table/${this.selectedBarber}/${this.dateclick}/${this.selectedTime}`).set({
          perple: this.firstname,
          phoneNumber: this.phonenumber,
          cash:"ไม่มีเงินโอน เนื่องจากช่างเพิ่มคิวด้วยตนเอง",
        });
        alert("บันทึกสำเร็จ");
        console.log("success");
      } catch (err) {
        console.log(err);
      }
    },
    autodelfetchData() {
      console.log("autodelfetchData");
      const db = this.$fireModule.database();
      db.ref("booking").on("value", (snapshot) => {
        const childDate = snapshot.val();
        for (const keyId in childDate) {
          const datauser = childDate[keyId];
          if (parseInt(datauser.date.substring(0,4)) < parseInt(this.currentDate().substring(0,4))){
            console.log('ลบๆปี')
            db.ref(`booking/${keyId}`).remove();
          }   
          if (parseInt(datauser.date.substring(0,4)) == parseInt(this.currentDate().substring(0,4))){
            if (parseInt(datauser.date.substring(5,7)) < parseInt(this.currentDate().substring(5,7))){
              console.log('ลบๆเดือน')
              db.ref(`booking/${keyId}`).remove();
            }
          } 
          if (parseInt(datauser.date.substring(0,4)) == parseInt(this.currentDate().substring(0,4))){
            if (parseInt(datauser.date.substring(5,7)) == parseInt(this.currentDate().substring(5,7))){
              if (parseInt(datauser.date.substring(8,10)) < parseInt(this.currentDate().substring(8,10))){
                console.log('ลบๆวัน')
                db.ref(`booking/${keyId}`).remove();
              }
            }
          }        
        }
      });
    },
  },
};
</script>
