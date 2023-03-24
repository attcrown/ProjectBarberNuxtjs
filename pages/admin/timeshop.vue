<template>
  <div>
    <Navadmin />
    <div class="mt-8 text-primary text-title text-center mb-8">
        <span class="mdi mdi-store-clock-outline"></span> Shop hours
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
              <h3>ต้องการเปิดร้านวันนี้ หรือไม่</h3>              
            </v-card-text>
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
      arrayEvents: [],
    };
  },

  created() {
    console.log(this.$store.getters.getUser.name);
    console.log(this.currentDate());
    this.loadworkbarberday();
    this.autoselect();
  },

  mounted() {
    
  },

  methods: {
    loadworkbarberday() {
      const db = this.$fireModule.database();
      db.ref("TimeShop").on("value", (snapshot) => {
        const childData = snapshot.val();
        const items = [];
        for (const dayId in childData){
            items.push(dayId);
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
    autoselect() {
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
    savedate(){      
      if(!this.ex4 || this.ex4.length === 0){
        alert("กรุณาเลือกวัน");
        return;
      }
      try{
        const db = this.$fireModule.database();
        const d = new Date(this.selectedYear,this.nummonth(),0).getDate();
        let days = d;        
        for(let i=1;i<=days;i++){
          // ลบของเก่า
          if(i<10){
            db.ref(`TimeShop/${this.selectedYear}-${this.nummonth()}-0${i}`).remove();
          }else{
            db.ref(`TimeShop/${this.selectedYear}-${this.nummonth()}-${i}`).remove();
          }    
          // Savedata      
          const dd = new Date(`${this.selectedYear}-${this.nummonth()}-${i}`);
          let day = dd.getDay();
          if(this.ex4.includes(day.toString())){
            if(i<10){
              console.log('save');
              db.ref(`TimeShop/${this.selectedYear}-${this.nummonth()}-0${i}/`).update({
                Status : "Open"
              });
            }else{
              console.log('save');
              db.ref(`TimeShop/${this.selectedYear}-${this.nummonth()}-${i}/`).update({
                Status : "Open"
              });               
            }
          }          
        }
      }catch(err){
        console.log(err);
      }
      this.loadworkbarberday();
    },
    editday(){
      const db = this.$fireModule.database();
      db.ref(`TimeShop/${this.date}/`).remove();
      db.ref(`TimeShop/${this.date}/`).update({
        Status : "Open"
      });      
    },
    editdaydel(){
      const db = this.$fireModule.database();
      db.ref(`TimeShop/${this.date}`).remove();
    },
  },
};
</script>
