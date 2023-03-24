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

                    <v-dialog
                        ref="dialog"
                        v-model="modal"
                        persistent
                        width="290px"
                        class="bg-danger"
                    >
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
                        :allowed-dates="allowedDates"
                           >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="modal = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date),checkPeople()"  
                      
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
                               @change="checkTimeBarber"
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
                                :rules="nameRules"
                                @change="checkTime"
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
    <v-dialog 
    v-model="checkT" 
    max-width="290"
    transition="dialog-bottom-transition"
    dark>
      <v-card>
        <v-card-title>คิวเต็ม</v-card-title>
              <v-card-text>
                <h3> เวลานี้มีคนจองเต็มแล้วครับ </h3>
             </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog 
    v-model="checkOvertime" 
    max-width="290"
    transition="dialog-bottom-transition"
    dark>
      <v-card>
        <v-card-title>Error Form</v-card-title>
              <v-card-text>
                <h3> จองคิวล่วงหน้า {{(this.Tbooking/60)}} ชม.ขึ้นไป </h3>
             </v-card-text>
      </v-card>
    </v-dialog>
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
        getDatahair() {
            return this.$store.getters.getHair;
        },
        getStopday() {
            return this.$store.getters.getStopday;
        },

        getCheck() {
            return this.$store.getters.getCheck;
        },
        getCancel() {
            return this.$store.getters.getCancel;
        }
    },
    data() {
        return {
            workdays: [],
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
            states: [
                this.$store.getters.getCheck.b1,
                this.$store.getters.getCheck.b2,
                this.$store.getters.getCheck.b3,
                this.$store.getters.getCheck.b4,
                this.$store.getters.getCheck.b5,
                this.$store.getters.getCheck.b6,
                this.$store.getters.getCheck.b7,
                this.$store.getters.getCheck.b8,
                this.$store.getters.getCheck.b9,
                this.$store.getters.getCheck.b10,
            ],
            time: [
                this.$store.getters.getCheck.t1, this.$store.getters.getCheck.t2,
                this.$store.getters.getCheck.t3, this.$store.getters.getCheck.t4,
                this.$store.getters.getCheck.t5, this.$store.getters.getCheck.t6,
                this.$store.getters.getCheck.t7, this.$store.getters.getCheck.t8,
                this.$store.getters.getCheck.t9, this.$store.getters.getCheck.t10,
                this.$store.getters.getCheck.t11, this.$store.getters.getCheck.t12,
                this.$store.getters.getCheck.t13, this.$store.getters.getCheck.t14,
                this.$store.getters.getCheck.t15, this.$store.getters.getCheck.t16,
                this.$store.getters.getCheck.t17, this.$store.getters.getCheck.t18,
                this.$store.getters.getCheck.t19, this.$store.getters.getCheck.t20,
                this.$store.getters.getCheck.t21, this.$store.getters.getCheck.t22,
                this.$store.getters.getCheck.t23, this.$store.getters.getCheck.t24,
                this.$store.getters.getCheck.t23, this.$store.getters.getCheck.t24,
                this.$store.getters.getCheck.t25, this.$store.getters.getCheck.t26,
                this.$store.getters.getCheck.t27, this.$store.getters.getCheck.t28,
                this.$store.getters.getCheck.t29, this.$store.getters.getCheck.t30,
                this.$store.getters.getCheck.t31, this.$store.getters.getCheck.t32,
                this.$store.getters.getCheck.t33, this.$store.getters.getCheck.t34,
                this.$store.getters.getCheck.t35, this.$store.getters.getCheck.t36,
                this.$store.getters.getCheck.t37, this.$store.getters.getCheck.t38,
                this.$store.getters.getCheck.t39, this.$store.getters.getCheck.t40,
                this.$store.getters.getCheck.t41, this.$store.getters.getCheck.t42,
                this.$store.getters.getCheck.t43, this.$store.getters.getCheck.t44,
                this.$store.getters.getCheck.t45, this.$store.getters.getCheck.t46,
                this.$store.getters.getCheck.t47, this.$store.getters.getCheck.t48,
                this.$store.getters.getCheck.t49, this.$store.getters.getCheck.t50,
            ],
            nameRules: [value => this.nameValidator(value)],
            phoneRules: [value => this.phoneValidator(value)],
            dialog: false,
            resetData: {
                t1: null, t2: null, t3: null, t4: null, t5: null,
                t6: null, t7: null, t8: null, t9: null, t10: null,
                t11: null, t12: null, t13: null, t14: null, t15: null,
                t16: null, t17: null, t18: null, t19: null, t20: null,
                t21: null, t22: null, t23: null, t24: null, t25: null,
                t26: null, t27: null, t28: null, t29: null, t30: null,
                t31: null, t32: null, t33: null, t34: null, t35: null,
                t36: null, t37: null, t38: null, t39: null, t40: null,
                t41: null, t42: null, t43: null, t44: null, t45: null,
                t46: null, t47: null, t48: null, t49: null, t50: null,
            },
            resetDataBarber: {
                b1: null, b2: null, b3: null, b4: null,
                b5: null, b6: null, b7: null, b8: null,
                b9: null, b10: null,
            },
            Tbooking:this.$store.getters.getCancel.Tbooking,
        }
    },
    methods: {
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
        async checkPeople() {

            await this.$store.dispatch('setCheck', this.resetDataBarber);
            await this.$store.dispatch('setCheck', this.resetData);
            await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/TimeQBarber/${this.form.date}/nBarber.json`).then((res) => {
                this.$store.dispatch('setCheck', res.data)
            });
            this.form.perple = null;
            this.form.time = null;
            await this.$store.dispatch('setDatahair', this.form)
            this.form.date = "";
            await this.$router.push("/register/reset");
            // console.log(res.data)
        },
        created() {
            this.checkPeople();
        },
        async checkTimeBarber() {

            await this.$store.dispatch('setCheck', this.resetData);
            await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/TimeQBarber/${this.form.date}/${this.form.perple}.json`).then((res) => {
                this.$store.dispatch('setCheck', res.data);
            });
            this.form.time = null;
            await this.$store.dispatch('setDatahair', this.form)
            this.form.perple = '';
            this.form.time = '';
            await this.$router.push("/register/resetTime");
            // console.log(555)
        },
        next() {

            // this.$store.dispatch('Datahair', this.form)
            //   this.$router.push("/register/step3");

            if (this.form.name == "" || this.form.date == "" || this.form.perple == null || this.form.time == null || this.form.perple == "" || this.form.time == "" || this.form.phoneNumber.length != 10 || this.$store.getters.getBt.bt == false) {
                this.dialog = true
            } else {
                this.$store.dispatch('setDatahair', this.form)
                this.$router.push("/register/step3");
            }

        },
        //allowedDates: val => { if( (  ( new Date(val).toString().substring(0,3)) != "Sun") && ( new Date(val).toString().substring(0,3) != "Sat" )) { return true } } 
        allowedDates(val) {
            console.log(new Date(val).toString().substring(8,11));
            if ((new Date(val).toString().substring(0, 3) != this.$store.getters.getStopday.Sat)
                && (new Date(val).toString().substring(0, 3) != this.$store.getters.getStopday.Sun)
                && (new Date(val).toString().substring(0, 3) != this.$store.getters.getStopday.Mon)
                && (new Date(val).toString().substring(0, 3) != this.$store.getters.getStopday.Tue)
                && (new Date(val).toString().substring(0, 3) != this.$store.getters.getStopday.Wed)
                && (new Date(val).toString().substring(0, 3) != this.$store.getters.getStopday.Thu)
                && (new Date(val).toString().substring(0, 3) != this.$store.getters.getStopday.Fri)
                && (new Date(val).toString().substring(8, 11) != this.$store.getters.getStopday.d1)
                && (new Date(val).toString().substring(8, 11) != this.$store.getters.getStopday.d2)
                && (new Date(val).toString().substring(8, 11) != this.$store.getters.getStopday.d3)
                && (new Date(val).toString().substring(8, 11) != this.$store.getters.getStopday.d4)
                && (new Date(val).toString().substring(8, 11) != this.$store.getters.getStopday.d5)
                && (new Date(val).toString().substring(8, 11) != this.$store.getters.getStopday.d6)
                && (new Date(val).toString().substring(8, 11) != this.$store.getters.getStopday.d7)
                && (new Date(val).toString().substring(8, 11) != this.$store.getters.getStopday.d8)
            ) {
                return true
            } else { return false }
        },
        printDate: function () {
            return new Date().toLocaleString(); //16/12/2565 13:33:36
        },
        printTime: function () {
            return new Date().toLocaleTimeString();
        },
        async checkTime() {
            if (this.form.perple != null && this.form.perple != '' && this.form.date != '') {
                this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.form.perple}/${this.form.date}/${this.form.time}.json`).then((res) => {
                    this.text = res.data
                    console.log(res.data.perple)
                    console.log('-------------------')
                    if (res.data.perple != null) {
                        console.log(res.data.perple)
                        this.checkT = true;
                        this.form.time = null;
                        console.log("ซ้ำk");
                    }
                });

            }

            const d = new Date();
            console.log(d.toLocaleString())
            let cd1 = this.$store.getters.getDatahair.date.toLocaleString().substring(8, 10)
            console.log("cd1= " + cd1)
            let cm1 = this.$store.getters.getDatahair.date.toLocaleString().substring(5, 7)
            console.log("cm1= " + cm1)
            let cy1 = this.$store.getters.getDatahair.date.toLocaleString().substring(0, 4)
            console.log("cy1= " + cy1)
            //////////////////////////////////////////////////// จบ

            let dateArray = this.printDate().split("/");
            let cd = Number(dateArray[0]);
            let cm = Number(dateArray[1]);
            let cy = Number(dateArray[2].substring(0, 4)) - 543;

            console.log(cd)
            console.log(cm)
            console.log("cy = " + cy)
            console.log(dateArray)

            let th = this.printTime().slice(0, 2);  //ชั่วโมงปัจจุบัน
            let tm = this.printTime().slice(3, 5);   //นาทีัจุบัน
            let th1 = this.form.time.slice(0, 2); //ชั่วโมงที่เลือก
            let tm1 = this.form.time.slice(3, 5);  //นาทีที่เลือก
            console.log(5555)
            console.log(th)
            console.log(tm)
            console.log(th1)
            console.log(tm1)
            console.log((((Number(cd1) * 1440) + (Number(cm1) * 44640) + (Number(cy1) * 525600) + (Number(th1) * 60) + Number(tm1)) - ((Number(cd) * 1440) + (Number(cm) * 44640) + (Number(cy) * 525600) + (Number(th) * 60) + Number(tm))))

            if ((((Number(cd1) * 1440) + (Number(cm1) * 44640) + (Number(cy1) * 525600) + (Number(th1) * 60) + Number(tm1)) - ((Number(cd) * 1440) + (Number(cm) * 44640) + (Number(cy) * 525600) + (Number(th) * 60) + Number(tm))) <= this.Tbooking) {
                this.checkOvertime = true; this.form.time = '';
            } else { console.log('pass') }
        }

    },
    mounted() {
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

        /*  this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/TimeQBarber/${this.$store.getters.getDatahair.date}/nBarber.json`).then((res) => {
              this.$store.dispatch('setCheck',res.data); });
          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/TimeQBarber/${this.$store.getters.getDatahair.date}/${this.$store.getters.getDatahair.perple}.json`).then((res) => {
              this.$store.dispatch('setCheck',res.data); });*/

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


