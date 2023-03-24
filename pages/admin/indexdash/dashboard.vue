<template>
    <div>
        <Navadmin />
        <div class="mt-8 mb-5 text-primary text-title text-center">
            <span class="mdi mdi-view-dashboard"></span> DashBoard
        </div>
        <center><div>
            <v-col class="d-flex" cols="8" sm="3">
                <v-select
                v-model="selectedYear"
                :items="selectyears"
                label="Year"
                dense
                solo
                ></v-select>
                <v-btn
                class="ms-5 mt-2"
                small
                color="primary"
                @click="historytable()"
                >Search</v-btn
                >
            </v-col>
        </div></center>
        
        <div>
            <v-card
                class=" mx-auto"
                max-width="800"
            >
                <v-sheet
                class="v-sheet--offset mx-auto"
                color="cyan"
                elevation="24"
                max-width="calc(100% - 5px)"
                >
                <v-sparkline
                    :labels="labels"
                    :value="value"
                    height="150"
                    color="white"
                    line-width="2"
                    padding="10"
                ></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0">
                <div class="text-h7 font-weight-light mt-2">
                    สรุปประจำปี {{selectedYear}}
                </div>
                <div class="text-h8 subheading font-weight-light">
                    รวมรายได้ของช่าง (ไม่หัก%) : {{summoneys ? summoneys:'-'}} บาท 
                </div>
                <div class="text-h7 font-weight-black" style="color:black;">
                    ค่าเช่าร้านทั้งหมด {{percent}}% : {{sumpercent ? sumpercent: '-'}}บาท
                </div>
                <v-divider class="my-2"></v-divider>
                </v-card-text>
            </v-card>
        </div>

            <div class="container">
                <h3 style="text-align:center;" class="mt-3 mb-5 text-primary text-title">รายได้ของช่างประจำเดือน</h3>
                <v-alert
                border="top"
                color="indigo darken-1"
                dark
                >
                <div class="flex-container">
                    <span>January</span>
                    <h3 style="text-align:right; margin:0;">{{JAN ? JAN:'-' }} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="right"
                color="indigo"
                dark
                >                
                <div class="flex-container">
                    <span>Febuary</span>
                    <h3 style="text-align:right; margin:0;">{{FEB ? FEB:'-'}} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="bottom"
                color="indigo darken-3"
                dark
                >                
                <div class="flex-container">
                    <span>March</span>
                    <h3 style="text-align:right; margin:0;">{{MAR ? MAR:'-' }} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="left"
                color="indigo darken-2"
                dark
                >
                <div class="flex-container">
                    <span>April</span>
                    <h3 style="text-align:right; margin:0;">{{ APR? APR:'-' }} ฿</h3>
                </div>                
                </v-alert>
                <v-alert
                border="top"
                color="indigo darken-1"
                dark
                >                
                <div class="flex-container">
                    <span>May</span>
                    <h3 style="text-align:right; margin:0;">{{MAY ? MAY:'-'}} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="right"
                color="indigo"
                dark
                >                
                <div class="flex-container">
                    <span>June</span>
                    <h3 style="text-align:right; margin:0;">{{JUN ? JUN:'-'}} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="bottom"
                color="indigo darken-1"
                dark
                >                
                <div class="flex-container">
                    <span>July</span>
                    <h3 style="text-align:right; margin:0;">{{JUL ? JUL:'-' }} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="left"
                color="indigo darken-2"
                dark
                >                
                <div class="flex-container">
                    <span>August</span>
                    <h3 style="text-align:right; margin:0;">{{ AUG? AUG:'-'}} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="top"
                color="indigo darken-3"
                dark
                >                
                <div class="flex-container">
                    <span>September</span>
                    <h3 style="text-align:right; margin:0;">{{SEP?SEP:'-'}} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="right"
                color="indigo darken-2"
                dark
                >                
                <div class="flex-container">
                    <span>October</span>
                    <h3 style="text-align:right; margin:0;">{{ OCT ? OCT:'-'}} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="bottom"
                color="indigo darken-1"
                dark
                >                
                <div class="flex-container">
                    <span>November</span>
                    <h3 style="text-align:right; margin:0;">{{NOV?NOV:'-'}} ฿</h3>
                </div>
                </v-alert>
                <v-alert
                border="left"
                color="indigo"
                dark
                >                
                <div class="flex-container">
                    <span>December</span>
                    <h3 style="text-align:right; margin:0;">{{DEC?DEC:'-'}} ฿</h3>
                </div>
                </v-alert>
            </div>        
        <div>

        </div>
        <Footer />
    </div>
</template>

<script>
export default {
    data: () => ({
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Api',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Set',
        'Oct',
        'Nov',
        'Dec',
      ],
      value: [
        100,
        675,
        410,
        390,
        310,
        0,
        250,
        240,
        500,
        1000,
        1253,
        0,
      ],
      selectedYear: null,
      selectyears: ["2023", "2024", "2025", "2026"],
      JAN:0,
      FEB:0,
      MAR:0,
      APR:0,
      MAY:0,
      JUN:0,
      JUL:0,
      AUG:0,
      SEP:0,
      OCT:0,
      NOV:0,
      DEC:0,
      summoneys:0,
      selectmonths: ["JAN","FEB","MAR","APR","MAY","JUN",
                "JUL","AUG","SEP","OCT","NOV","DEC"],
      percent:null,
      sumpercent: null,
    }),
    created() {
            this.autoselect();
            // this.searchbarber();
            this.historytable();
            // this.tablebarber();
            this.check();            
        },
    methods: {
        autoselect() {
                this.selectedYear = this.currentDate().substring(0, 4);
            },
        check(){
            const db = this.$fireModule.database();
            db.ref("Data/").on("value", (snapshot) => {
                const childDate = snapshot.val();
                this.percent = childDate.percent;
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
        historytable(){
            this.summoneys = 0;
            const db = this.$fireModule.database();
            db.ref("Table/").on("value", (snapshot) => {
                const data = snapshot.val();
                const item = [];
                let sum = 0;
                let summ = 0;
                let money = 0;
                for(let v = 0 ;v<this.selectmonths.length ;v++){
                    for (const barber in data) {
                    const userdays = data[barber];
                        for(const days in userdays){ 
                            const times = userdays[days];                                                        
                            if(days.substring(0, 4) == this.selectedYear &&
                            days.substring(5, 7) == this.nummonth(this.selectmonths[v])){
                                for(const time in times){
                                    const userdata = times[time];
                                    if(userdata.cash != null){
                                        summ++;
                                    }
                                    if(userdata.bath != null){
                                        sum++;
                                        money += parseInt(userdata.bath); 
                                    }  
                                    if(userdata.money != null){
                                        money += parseInt(userdata.money);
                                    }                                  
                                }
                            }
                        }
                    }
                    item.push(money);
                    this[this.selectmonths[v]] = money;
                    this.summoneys += money;
                    console.log(money);
                    money = 0;
                }
                this.value = item;
                setTimeout(() => {
                    this.sumpercent = this.percent * this.summoneys / 100;
                }, 1000);                
            });
        },
        nummonth(a){
            for(let i =0;i<this.selectmonths.length;i++){
                if(a == this.selectmonths[i]){
                if((i+1)<10){
                    i = '0'+(i+1);
                }else{
                    i = i+1;
                }
                return i;
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .v-sparkline .v-sparkline__label {
    font-size: 32px; /* เปลี่ยนขนาดตัวอักษรตามต้องการ */
    }
    .flex-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>