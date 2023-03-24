<template>
<div>
        <v-app-bar
      color="primary"
      dense
      flat
      dark
    >
    <v-toolbar-title>จองคิวใช้บริการ</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                    Step 2 to 4
                      </div>
                </v-col>
                <v-col cols="12">
                    <v-form>
                         <v-text-field 
                         v-model="form.name"
                         dense
                         required
                         prepend-icon="mdi-account"
                         :rules="nameRules"
                         label="Name"> 
                    </v-text-field>
                    <v-text-field 
                         v-model="form.phoneNumber"
                         dense
                         :rules="phoneRules"
                         prepend-icon="mdi-phone"
                         @keypress="onlyNumber($event,10)"
                         label="phoneNumber"> 
                    </v-text-field>

                    <v-text-field 
                    class="mt-3"
                         v-model="form.email"
                         dense
                         readonly
                         prepend-icon="mdi-email"
                         label="Email"> 
                    </v-text-field>
                    <v-btn
                        depressed
                        color="primary"
                        @click="checkbarber = true;"
                        >
                    ดูตารางช่าง<span class="mdi mdi-calendar-range"></span>
                    </v-btn>
                    <v-dialog
                        ref="dialog"
                        v-model="modal"
                        persistent
                        width="290px"
                        class="bg-danger">
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="form.date"
                            label="Choose a booking date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            class="dateIcon mt-0 mb-0"                                                   
                        ></v-text-field>
                        </template>
                        <v-date-picker
                            :min="new Date().toISOString().substring(0,10)"
                            v-model="form.date"
                            scrollable
                            :allowed-dates="allowedDates">
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="modal = false">
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="namebarber(),(modal = false)"                        
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                        </v-dialog>
                        <v-col cols="12" class="pt-0 pl-0 mt-0">
                            <v-select
                                v-model="form.perple"
                                :items="states"
                                menu-props="auto"
                                label="เลือกช่าง"
                                hide-details
                                prepend-icon="mdi-account-filter"
                                single-line
                                class="pt-0 pl-0 mt-0"
                               @change="changetimebarber()"
                            ></v-select>
                            </v-col>

                            <v-col cols="12" class="pt-0 pl-0 mt-0">
                            <v-select
                                v-model="form.time"
                                :items="time"
                                menu-props="auto"
                                label="เลือกเวลา"
                                hide-details
                                prepend-icon="mdi-clock-time-five-outline"
                                single-line
                                class="pt-0 pl-0 mt-0"
                            ></v-select>
                            </v-col>
                            <v-col cols="12"  md="6" class="pt-0 pb-0">
                                <v-textarea 
                                v-model="form.etc"
                            dense
                            outlined
                            name="input-7-4"
                            label="รายละเอียดอื่นๆถึงช่าง"
                            value="" >
                                </v-textarea>
                            </v-col>
                        <!--     <v-btn class="w100 my-btn mt-5 center " width="50%" rounded color="primary" dark  @click="checkTime"> Check </v-btn> -->
                    <v-btn class="w100 my-btn mt-5 " width="100%" rounded color="primary" dark  @click="next">    Next </v-btn>
                    </v-form>   
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
                        v-model="dateclick"
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
                    @click="(checkbarber = false),autoselectdate()"
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
import { get } from 'http';
import Footer from '~/components/Footer.vue';
const REGEX_PHONE = /^[0]([0-9]{9})*$/
const REGEX_NUMBER = /^[0-9]*$/
//let day = ['Sun'];

export default {
  components: { Footer },
    computed: {
        getBt() {
            return this.$store.getters.getBt;
        },
        getCancel() {
      return this.$store.getters.getCancel;
    }
    },
    data() {
        return {
            arrayEvents: [],
            dateclick:null,
            barberitemssel: null,
            barberitems: [],
            checkbarber: false,
            states:[],
            time:[],
            workdays: [],
            workdaysbarber:[],
            checkOvertime: false,
            text: '',
            checkT: false,
            form: {
                name: this.$store.getters.getDatahair.name,
                phoneNumber: this.$store.getters.getDatahair.phoneNumber,
                date: this.$store.getters.getDatahair.date,
                perple: this.$store.getters.getDatahair.perple,
                time: this.$store.getters.getDatahair.time,
                etc: this.$store.getters.getDatahair.etc,
                email: ' - ',
            },
            modal: false,
            nameRules: [value => this.nameValidator(value)],
            phoneRules: [value => this.phoneValidator(value)],
            dialog: false,
            Tbooking:this.$store.getters.getCancel.Tbooking,
        }
    },
    methods: {
        allowedDatesbarber(val) {
            return this.workdaysbarber.includes(val);
        },
        nameValidator(value) {
            if (value == '') {
                return 'กรุณากรอกชื่อที่ใช้จองคิว'
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
        onlyNumber(event, max) {
            if (event.target.value.length == 0) {
                if (event.key != 0) {
                    return event.preventDefault()
                }
            }
            if (!REGEX_NUMBER.test(event.key) || event.target.value.length == max) {
                return event.preventDefault()
            }
        },
        next() {
            console.log(this.form.name,this.form.date,this.form.perple,this.form.time,this.form.phoneNumber,this.$store.getters.getBt.bt);
            if (this.form.name == "" || this.form.date == "" || this.form.perple == null || this.form.time == null || this.form.perple == "" || this.form.time == "" || this.form.phoneNumber.length != 10 || this.$store.getters.getBt.bt == false) {
                this.dialog = true
            } else {
                this.$store.dispatch('setDatahair', this.form)
                this.$router.push("/register/step3");
            }
        },
        allowedDates(val) {
            return this.workdays.includes(val);
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
        namebarber() {
            const db = this.$fireModule.database();
            db.ref(`TimeQBarber/${this.form.date}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                const items = [];
                for (const userId in childData) {
                if (userId != "nBarber") {
                    items.push(userId);
                }
                }        
                this.states = items;
            });
        },
        changetimebarber() {
            const db = this.$fireModule.database();
            db.ref(`TimeQBarber/${this.form.date}/${this.form.perple}`).on(
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
                            indata.date == this.form.date &&
                            indata.perple == this.form.perple
                        ) {
                            deltime.push(indata.time);
                        }
                    }
                    for (const times in childData) {
                    const time = childData[times];
                    if (!deltime.includes(time)) {
                        if (
                        parseInt(this.form.date.substring(8, 10)) >
                        parseInt(new Date().getDate())
                        ) {
                        items.push(time);
                        } else if (
                        parseInt(time.substring(0, 2)) >=
                        new Date().getHours() + (Number(this.Tbooking))
                        ) {
                        items.push(time);
                        } else {
                        }
                    }
                    }
                });
                this.time = items;
                }
            );
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
                this.barberitems = items;
            });
        },  
        autoselectdate(){
            this.states = this.barberitemssel;
            this.form.perple = this.barberitemssel;
            this.form.date = this.dateclick;
            this.changetimebarber();
        },     
    },
    mounted() {
        this.loadworkday();
        this.searchbarber();
        liff.init({
            liffId: '1657521762-klyEy4wR'
        }).then(() => {
           if (liff.isLoggedIn()) {
               liff.getProfile().then(profile => {
                   const em = liff.getDecodedIDToken().email;
                   //   console.log(em)
                   this.form.email = em

               })
           } else {
               liff.login();
           }
        })

        this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/data.json`).then((res) => {
                this.$store.dispatch('setCheck', res.data);
            });
    },

}
</script>

<style lang="scss" scoped>
.rotating-image {
    animation: rotation 8s infinite linear;
    transform-origin: center;
    transform-style: preserve-3d;
    animation: rotation 3s infinite linear; //ความเร็วในการหมุนภาพ
}

@keyframes rotation {
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(360deg);
    }
}

.resized-image {
    width: 25px;
    height: 25px;
}
</style>


