<template>
    <div>
        <Navadmin />
        <div class="mt-8 text-primary text-title text-center">
            <span class="mdi mdi-cash-multiple"></span> รายได้
        </div>
        <template>
            <div class="text-right">
                <v-container fluid>
                <v-row align="center">
                    <v-col class="d-flex" cols="4" sm="4">
                    <v-select
                        v-model="selectedMonth"
                        :items="selectmonths"
                        label="Months"
                        dense
                        solo
                    ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="4" sm="4">
                    <v-select
                        v-model="selectedYear"
                        :items="selectyears"
                        label="Year"
                        dense
                        solo
                    ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="4" sm="4">
                        <v-btn
                        class=" "
                        style="margin-top: -25px;"
                        color="primary"
                        @click="historytable(),tablebarber()"
                        >Search</v-btn
                    >
                    </v-col>
                </v-row>
                </v-container>
            </div>
        </template>
        <center><div style="width: 90%; text-align: center;">
            <div class="container" style="margin-top: -25px;">
            <v-card
                elevation="24"
                shaped
                color="green lighten-3">
                <div class="container">
                    <h4>ลูกค้าใช้บริการผ่าน Line <span class="mdi mdi-chat"></span> : {{dataservice ? dataservice: "-"}} คิว</h4>
                </div> 
                <div class="container">
                        <h4>ลูกค้าที่ช่างเพิ่มด้วยตนเอง <span class="mdi mdi-account-edit"></span> : {{dataservicebarber ? dataservicebarber: "-"}} คิว</h4>
                </div> 
            </v-card>
            </div>
            <div class="container">
                <v-card
                    elevation="24"
                    shaped
                    color="info">
                    <div class="container">
                        <h4>รายได้ทั้งหมดของช่าง : {{datamoney ? datamoney:"-"}} บาท</h4>
                    </div> 
                    <div class="container">
                        <h4>ค่าเช่าร้านทั้งหมด {{percent ? percent:'-'}}% : {{sumpercent ? sumpercent:"-"}} บาท</h4>
                    </div> 
                </v-card>
            </div>
        </div></center>
        <template>
            <v-data-table
                :headers="headers"
                :items="desserts"
                class="elevation-1"
                style="margin-top: -25px;"
            >
                <template v-slot:[`item.service`] ="{ item }">
                    {{ item.service }}
                </template>
                <!-- <template v-slot:[`item.detail`]="{ item }">
                    <v-btn small color="success" @click="showDetails(item)">ดูรายละเอียด</v-btn>
                </template> -->
            </v-data-table>
        </template>

        <template>
            <v-row justify="center">
                <v-dialog
                v-model="detailbarber"
                persistent
                max-width="290"
                >
                <v-card>
                    <v-card-title class="text-h6">
                        <span class="mdi mdi-account-details me-1"></span>
                        รายละเอียดการให้บริการ
                    </v-card-title>
                    <v-card-text>
                        <template>
                            <v-data-table
                                :headers="headersbarber"
                                :items="dessertsbarber"
                                :items-per-page="5"
                                class="elevation-1"
                            ></v-data-table>
                        </template>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="detailbarber = false"
                    >
                        CLOSE
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </template>

        <Footer />
    </div>
</template>

<script>
    export default{
        data(){
            return{
                // cancelser: null,
                detailbarber: false,
                namebarber: [],
                dataservice: null,
                dataservicebarber: null,
                datamoney: null,
                selectedMonth: null,
                selectedYear: null,
                selectyears: ["2023", "2024", "2025", "2026", "All"],
                selectmonths: ["January","February","March","April","May","June",
                "July","August","September","October","November","December","All",],
                headers: [
                    {
                        text: 'Name',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'ให้บริการผ่าน Line', value: 'service' },
                    { text: 'บริการที่ช่างเพิ่มเอง', value: 'add' },
                    { text: 'รายได้ของช่าง', value: 'baths' },
                    { text: "หักค่าเช่าร้าน : ", value: 'percent' },
                    { text: "สรุปรายได้ทั้งหมด : ", value: 'sumpercent' },
                    ],
                desserts: [
                    {
                        name: 'barber',
                        service: 11,
                        add: 6,
                        baths: 1100+'฿',
                    },
                    {
                        name: 'test',
                        service: 6,
                        add: 9,
                        baths: 600+'฿',
                    },
                ],
                headersbarber: [
                    {
                        text: 'Name',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Date', value: 'calories' },
                    { text: 'เงินมัดจำ', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' },
                    ],
                    dessertsbarber: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: 1,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: 1,
                    },
                ],
                percent:null,
                sumpercent: null,
            }             
        },
        created() {
            this.autoselect();
            this.searchbarber();
            this.historytable();
            setTimeout(() => {
                this.tablebarber();
            }, 1000);
            this.check();                           
        },
        methods: {
            autoselect() {
                this.selectedMonth = this.selectmonths[parseInt(this.currentDate().substring(5.7)) - 1];
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
                const db = this.$fireModule.database();
                db.ref("Table/").on("value", (snapshot) => {
                    const data = snapshot.val();
                    let sum = 0;
                    let summ = 0;
                    let money = 0;
                    for (const barber in data) {
                        const userdays = data[barber];
                        for(const days in userdays){ 
                            const times = userdays[days];                                                        
                            if(days.substring(0, 4) == this.selectedYear &&
                            days.substring(5, 7) == this.nummonth()){
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
                            }else if(this.selectedMonth == 'All'&& this.selectedYear != 'All'){
                                if(days.substring(0, 4) == this.selectedYear){
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
                            }else if(this.selectedYear == 'All' && this.selectedMonth != 'All'){
                                if(days.substring(5, 7) == this.nummonth()){
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
                            }else if(this.selectedYear == 'All' && this.selectedMonth == 'All'){
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
                            }else{}
                        }
                    }
                    this.dataservice = sum;
                    this.dataservicebarber = summ;
                    this.datamoney = money;
                    this.tablebarber(); 
                    setTimeout(() => {
                        this.sumpercent = this.percent * this.datamoney / 100;
                    }, 1000); 
                });    
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
            getColor (service) {
                if (service > 10) return 'red'
                else if (service > 5) return 'orange'
                else return 'green'
            },
            tablebarber(){
                const items = [];
                var barbername = this.namebarber;
                for(let i = 0; i< barbername.length;i++){
                    const db = this.$fireModule.database();
                    db.ref("Table/").on("value", (snapshot) => {
                        const data = snapshot.val();
                        let money = 0;
                        let service = 0;
                        let add = 0;
                        for (const barber in data) {
                            if(barber == barbername[i]){
                                const userdays = data[barber];
                                for(const days in userdays){
                                    const day = userdays[days];                                    
                                    if(days.substring(0, 4) == this.selectedYear &&
                                    days.substring(5, 7) == this.nummonth()){
                                        for(const databars in day){
                                            const databar = day[databars];                                            
                                            if(databar.cash != undefined){
                                                add++;
                                            }
                                            if(databar.bath != undefined){
                                                money += parseInt(databar.bath) ;
                                                service++;
                                            }   
                                            if(databar.money != undefined){
                                                money += parseInt(databar.money);
                                            }                                      
                                        }
                                    }else if(this.selectedMonth == 'All'&& this.selectedYear != 'All'){
                                        if(days.substring(0, 4) == this.selectedYear){
                                            for(const databars in day){
                                                const databar = day[databars];
                                                if(databar.cash != undefined){
                                                add++;
                                                }
                                                if(databar.bath != undefined){
                                                    money += parseInt(databar.bath) ;
                                                    service++;
                                                }  
                                                if(databar.money != undefined){
                                                    money += parseInt(databar.money);
                                                }                                      
                                            }
                                        }                                
                                    }else if(this.selectedYear == 'All' && this.selectedMonth != 'All'){
                                        if(days.substring(5, 7) == this.nummonth()){
                                            for(const databars in day){
                                                const databar = day[databars];
                                                if(databar.cash != undefined){
                                                    add++;
                                                }
                                                if(databar.bath != undefined){
                                                    money += parseInt(databar.bath) ;
                                                    service++;
                                                }         
                                                if(databar.money != undefined){
                                                    money += parseInt(databar.money);
                                                }                                
                                            }
                                        }
                                    }else if(this.selectedYear == 'All' && this.selectedMonth == 'All'){
                                        for(const databars in day){
                                            const databar = day[databars];
                                            if(databar.cash != undefined){
                                                add++;
                                            }
                                            if(databar.bath != undefined){
                                                money += parseInt(databar.bath) ;
                                                service++;
                                            }   
                                            if(databar.money != undefined){
                                                money += parseInt(databar.money);
                                            }                                      
                                        }
                                    }else{}
                                }
                                const item = {
                                name:barber,
                                service: service,
                                add: add,
                                baths: money+"฿",
                                percent: (money*this.percent/100)+"฿", 
                                sumpercent: money-(money*this.percent/100)+"฿",
                                } 
                                items.push(item)
                            }                                                       
                        }
                    });    
                }    
                this.desserts = items;            
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
                    this.namebarber = items;
                });
            },
            // showDetails(item) {
            //     this.detailbarber = true;

            // },
        },
    }
</script>

<style>
.v-data-footer{
    display: none;
}
.v-data-table-header-mobile__wrapper{
    display: none;
}
.v-data-table__mobile-row__cell{
 font-size: medium;
 color: rgb(35, 207, 35);
 font-weight: 800;
}
</style>