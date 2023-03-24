<template>
  <div>
    <Navbarber />
    <div class="mt-8 text-primary text-title text-center mb-8">
      <span class="mdi mdi-briefcase-outline"></span> Work Schedule
    </div>
    <template>
      <div class="text-right">
        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex" cols="6" sm="3">
              <v-select
                v-model="selectedMonth"
                :items="selectmonths"
                label="Months"
                dense
                solo
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select
                v-model="selectedYear"
                :items="selectyears"
                label="Year"
                dense
                solo
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-card flat class="ms-5" style="margin-top: -30px">
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-checkbox
                  v-model="ex4"
                  label="Sunday"
                  color="success"
                  value="0"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="Monday"
                  color="success"
                  value="1"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="Tuesday"
                  color="success"
                  value="2"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="Wednesday"
                  color="success"
                  value="3"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="Thursday"
                  color="success"
                  value="4"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="Friday"
                  color="success"
                  value="5"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="Saturday"
                  color="success"
                  value="6"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
      </v-card>
      <div class="text-right">
        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="3">
              <v-select
                v-model="Startq"
                :items="timesworkitemq"
                label="ระยะเวลาต่อหัวคิว /นาที"
                dense
                solo
                @change="enableselect(),timework()"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select
                v-model="Startwork"
                :items="timesworkitem"
                label="เริ่มงาน"
                dense
                solo
                :disabled = "selectdis"
                @change="cleartime()"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select
                v-model="Stopwork"
                :items="timesworkitem"
                label="เลิกงาน"
                dense
                solo
                :disabled = "selectdis"
                @change="(selectdisbreak = false) ,breaktime();"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select
                v-model="BreakStartwork"
                :items="timesworkitembreak"
                label="เริ่มพักงาน"
                dense
                solo
                :disabled = "selectdisbreak"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select
                v-model="BreakStopwork"
                :items="timesworkitembreak"
                label="หยุดพักงาน"
                dense
                solo
                :disabled = "selectdisbreak"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
    <div class="text-right me-5 mb-5">
      <v-btn 
        elevation="10"
        color="success"
        @click="savedate()"
      > Save</v-btn>
    </div>    
    <template>
      <v-row justify="center">
        <v-date-picker
          v-model="date"
          :allowed-dates="allowedDates"
          class="mt-4"
          min="2023-01-01"
          max="2026-01-01"
          :events="arrayEvents"
          event-color="green lighten-1"
          @change="Editcalan = true"
        ></v-date-picker>
      </v-row>
    </template>

    <template>
      <div class="text-center">
        <v-dialog
          v-model="Editcalan"
          width="500"
        >
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{this.date}}
            </v-card-title>

            <v-card-text class="mt-5">
              <h3>แก้ไขรายละเอียดเฉพาะวันของช่าง</h3>              
            </v-card-text>
            <div class="text-right">
              <v-container fluid>
                <v-row align="center">
                  <v-col class="d-flex" cols="12" sm="3">
                    <v-select
                      v-model="Startq"
                      :items="timesworkitemq"
                      label="ระยะเวลาต่อหัวคิว /นาที"
                      dense
                      solo
                      @change="enableselect(),timework()"
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="6" sm="3">
                    <v-select
                      v-model="Startwork"
                      :items="timesworkitem"
                      label="เริ่มงาน"
                      dense
                      solo
                      :disabled = "selectdis"
                      @change="cleartime()"
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="6" sm="3">
                    <v-select
                      v-model="Stopwork"
                      :items="timesworkitem"
                      label="เลิกงาน"
                      dense
                      solo
                      :disabled = "selectdis"
                      @change="(selectdisbreak = false),breaktime();"
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="6" sm="3">
                    <v-select
                      v-model="BreakStartwork"
                      :items="timesworkitembreak"
                      label="เริ่มพักงาน"
                      dense
                      solo
                      :disabled = "selectdisbreak"
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="6" sm="3">
                    <v-select
                      v-model="BreakStopwork"
                      :items="timesworkitembreak"
                      label="หยุดพักงาน"
                      dense
                      solo
                      :disabled = "selectdisbreak"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                text
                @click="editdaydel(),(Editcalan = false)"
              >
                Remove
              </v-btn>
              <v-btn
                color="success"
                text
                @click="editday(),(Editcalan = false)"
              >
                Apply
              </v-btn>
              <v-btn
                color="black"
                text
                @click="Editcalan = false"
              >
                cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <Footer />
  </div>
</template>

<script>
import { objectExpression } from "@babel/types";
import { time } from "console";
import Footer from '~/components/Footer.vue';
export default {
  components: { Footer },
  data() {
    return {
      Editcalan: false,
      Startq:null,
      selectdis: true,
      selectdisbreak: true,
      Startwork:null,
      Stopwork:null,
      BreakStartwork:null,
      BreakStopwork:null,
      timesworkitembreak:[],
      timesworkitem:[],
      timesworkitemq:[15,20,25,30,35,40,45,50,60],
      ex4: [],
      selectedMonth: null,
      selectedYear: null,
      selectyears: ["2023", "2024", "2025", "2026"],
      selectmonths: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      date: this.currentDate(),
      workdays: [],
      arrayEvents: [],
    };
  },

  created() {
    console.log(this.$store.getters.getUser.name);
    console.log(this.currentDate());
    this.loadworkday();
    this.loadworkbarberday();
    this.allowedDates();
    this.autoselect();
  },

  mounted() {
    
  },

  methods: {
    allowedDates(val) {
      return this.workdays.includes(val);
    },
    loadworkday() {
      const db = this.$fireModule.database();
      db.ref("TimeShop").on("value", (snapshot) => {
        const childData = snapshot.val();
        const items = [];
        for (const dayId in childData) {
          if (
            parseInt(dayId.substring(0, 4)) > this.currentDate().substring(0, 4)
          ) {
            items.push(dayId);
          } else if (
            parseInt(dayId.substring(0, 4)) ==
              this.currentDate().substring(0, 4) &&
            parseInt(dayId.substring(5, 7)) > this.currentDate().substring(5, 7)
          ) {
            items.push(dayId);
          } else if (
            parseInt(dayId.substring(0, 4)) ==
              this.currentDate().substring(0, 4) &&
            parseInt(dayId.substring(5, 7)) ==
              this.currentDate().substring(5, 7) &&
            parseInt(dayId.substring(8, 10)) >=
              this.currentDate().substring(8, 10)
          ) {
            items.push(dayId);
          } else {
          }
        }
        this.workdays = items;
      });
    },
    loadworkbarberday() {
      const db = this.$fireModule.database();
      db.ref("TimeQBarber").on("value", (snapshot) => {
        const childData = snapshot.val();
        const items = [];
        for (const dayId in childData) {
          const user = childData[dayId];
          for (const keyuser in user) {
            if(keyuser == this.$store.getters.getUser.name){
              if (
                parseInt(dayId.substring(0, 4)) > this.currentDate().substring(0, 4)
              ) {
                items.push(dayId);
              } else if (
                parseInt(dayId.substring(0, 4)) ==
                  this.currentDate().substring(0, 4) &&
                parseInt(dayId.substring(5, 7)) > this.currentDate().substring(5, 7)
              ) {
                items.push(dayId);
              } else if (
                parseInt(dayId.substring(0, 4)) ==
                  this.currentDate().substring(0, 4) &&
                parseInt(dayId.substring(5, 7)) ==
                  this.currentDate().substring(5, 7) &&
                parseInt(dayId.substring(8, 10)) >=
                  this.currentDate().substring(8, 10)
              ) {
                items.push(dayId);
              } else {
              }
            }            
          }
        }
        this.arrayEvents = items;
      });
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
    functionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    },
    autoselect(){
      this.selectedMonth =
        this.selectmonths[parseInt(this.currentDate().substring(5.7)) - 1];
      this.selectedYear = this.currentDate().substring(0, 4);
    },
    nummonth(){
      for(let i =0;i<this.selectmonths.length;i++){
        if(this.selectedMonth == this.selectmonths[i]){
          if((i+1)<10){
            i = '0'+(i+1);
          }else{
            i = i+1;
          }
          return i;
        }
      }
    },
    enableselect(){
      this.selectdis = false;
    },
    timework(){
      var items = ["00:00"];
      var q = this.Startq;
      let i = 0;
      let x = 0;
      while(i < 24){
        x = x+q;
        if(x>59){
          x = parseInt(x)-parseInt(60);
          i++;
        }
        if(i == 24){
          break;
        }
        if(i<10 && x<10){
          items.push(`0${i}:0${x}`);
        }else if(i<10){
          items.push(`0${i}:${x}`);
        }else if(x<10){
          items.push(`${i}:0${x}`);
        }else{
          items.push(`${i}:${x}`);
        }
      }
      this.timesworkitem = items;
    },
    breaktime(){
      let o = 0;
      const items = [];
      console.log(this.Startwork,this.Stopwork);
      for(let i = 0 ;i<this.timesworkitem.length;i++){
        console.log(this.timesworkitem[i]);
        if(this.Startwork == this.timesworkitem[i]){
          o--;
        }
        if(this.Stopwork == this.timesworkitem[i]){
          items.push(this.timesworkitem[i]);
          o++;
        }
        if(o != i){
          console.log(o,i);
          items.push(this.timesworkitem[i]);
        }
        o++;
      }
      console.log(items);
      items.push("-");
      this.timesworkitembreak = items;
    },
    savedate(){      
      const time = this.selecttimework();
      if(!this.ex4 || this.ex4.length === 0){
        alert("กรุณาเลือกวัน");
        return;
      }
      if(this.Startq == null){
        alert("กรุณาเลือกระยะเวลาต่อหัวคิว");
        return;
      }
      if(this.Startwork == null || this.Stopwork == null || this.BreakStartwork == null
      || this.BreakStopwork == null){
        alert("กรุณาเลือกลงเวลางานให้ครบ");
        return;
      }
      if(parseInt(this.Startwork.substring(0,2)+this.Startwork.substring(3,5)) > parseInt(this.Stopwork.substring(0,2)+this.Stopwork.substring(3,5))  || 
        parseInt(this.BreakStartwork.substring(0,2)+this.BreakStartwork.substring(3,5)) > parseInt(this.BreakStopwork.substring(0,2)+this.BreakStopwork.substring(3,5))
        ){
        alert("กรุณาเลือกเวลางานให้ถูกต้อง");
        return;
      }
      try{
        const db = this.$fireModule.database();
        const d = new Date(this.selectedYear,this.nummonth(),0).getDate();
        let days = d;        
        for(let i=1;i<=days;i++){
          if(this.workdays.includes(`${this.selectedYear}-${this.nummonth()}-0${i}`) 
          || this.workdays.includes(`${this.selectedYear}-${this.nummonth()}-${i}`)){
            // ลบของเก่า
            if(i<10){
              db.ref(`TimeQBarber/${this.selectedYear}-${this.nummonth()}-0${i}/${this.$store.getters.getUser.name}`).remove();
            }else{
              db.ref(`TimeQBarber/${this.selectedYear}-${this.nummonth()}-${i}/${this.$store.getters.getUser.name}`).remove();
            }    
            // Savedata      
            const dd = new Date(`${this.selectedYear}-${this.nummonth()}-${i}`);
            let day = dd.getDay();
            if(this.ex4.includes(day.toString())){
              console.log('dayloop',day);
              if(i<10){
                console.log('save');
                for(let v=0;v<time.length;v++){
                  db.ref(`TimeQBarber/${this.selectedYear}-${this.nummonth()}-0${i}/${this.$store.getters.getUser.name}/`).update({
                    [v] : time[v]
                  });
                }
              }else{
                console.log('save');
                for(let v=0;v<time.length;v++){
                  db.ref(`TimeQBarber/${this.selectedYear}-${this.nummonth()}-${i}/${this.$store.getters.getUser.name}/`).update({
                    [v]: time[v]
                  });
                }                
              }
            }
          }          
        }
      }catch(err){
        console.log(err);
      }
      this.loadworkbarberday();
    },
    selecttimework(){
      let Start = this.Startwork;
      let Stop = this.Stopwork;
      let StartB = this.BreakStartwork;
      let StopB = this.BreakStopwork;
      let o=0;
      const items = [];
      for(let i =0;i<this.timesworkitem.length;i++){
        if(this.timesworkitem[i] == Stop){
          o--;
        }
        if(this.timesworkitem[i] == Start){
          o++;
        }
        if(this.timesworkitem[i] == StopB){
          o++;
        }
        if(this.timesworkitem[i] == StartB){
          o--;
        }
        if(o != i){
          items.push(this.timesworkitem[i]);
        }
        o++;
      }
      return items;
    },
    editday(){
      if(parseInt(this.Startwork.substring(0,2)+this.Startwork.substring(3,5)) > parseInt(this.Stopwork.substring(0,2)+this.Stopwork.substring(3,5))  || 
        parseInt(this.BreakStartwork.substring(0,2)+this.BreakStartwork.substring(3,5)) > parseInt(this.BreakStopwork.substring(0,2)+this.BreakStopwork.substring(3,5))
        ){
        alert("กรุณาเลือกเวลางานให้ถูกต้อง");
        return;
      }
      if(this.Startq == null){
        alert("กรุณาเลือกระยะเวลาต่อหัวคิว");
        return;
      }
      if(this.Startwork == null || this.Stopwork == null || this.BreakStartwork == null
      || this.BreakStopwork == null){
        alert("กรุณาเลือกลงเวลางานให้ครบ");
        return;
      }
      const time = this.selecttimework();
      const db = this.$fireModule.database();
      db.ref(`TimeQBarber/${this.date}/${this.$store.getters.getUser.name}`).remove();
      for(let v=0;v<time.length;v++){
        db.ref(`TimeQBarber/${this.date}/${this.$store.getters.getUser.name}/`).update({
          [v] : time[v]
        });
      }
    },
    editdaydel(){
      const db = this.$fireModule.database();
      db.ref(`TimeQBarber/${this.date}/${this.$store.getters.getUser.name}`).remove();
    },
    cleartime(){
      this.breaktime();
      this.BreakStartwork = null;
      this.BreakStopwork = null;
    },
  },
};
</script>
