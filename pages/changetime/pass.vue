<template>
    <div>
        <v-app-bar
      color="#F01414"
      dense
      flat
      dark
    >
    <v-toolbar-title>เปลี่ยนข้อมูลการจองคิว</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                    Check booking status
                </div>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-avatar
                    size="150"
                    center
                  >
                  <img
                  :src="getLine.pictureUrl" 
                    >
                  </v-avatar>
                    
                </v-col>
                 <v-col class="text-center">
                   <h3 class="text-primary">สวัสดีคุณ</h3> 
                    {{ getLine.displayName}}
                </v-col>
                <v-col cols="12">
             <v-checkbox
                    v-model="ex4"
                    label="ทำการจองคิวเรียบร้อย"
                    color="success"
                    value="success"
                    hide-details
                    readonly
                    class="ml-5"
            ></v-checkbox>
            <v-checkbox
                    v-model="ex4"
                    label="อยู่ในช่วงที่สามารถเปลี่ยนการจองคิว"
                    color="success"
                    value="success"
                    hide-details
                    readonly
                    class="ml-5"
            ></v-checkbox>
                </v-col>
                 

                <v-col>
                  <v-dialog
                        ref="dialog"
                        v-model="modal"
                        persistent
                        width="290px"
                        class="bg-danger"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="data.date"
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
                        v-model="data.date"
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
                            @click="namebarber(),(modal = false)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                        </v-dialog>

                        <v-col cols="12" class="pl-0 pt-0">
                            <v-select
                                v-model="data.perple"
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
                                v-model="data.time"
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
                                v-model="data.etc"
                            dense
                            outlined
                            name="input-7-4"
                            label="รายละเอียดอื่นๆถึงช่าง"
                            :value="etc" >
                                </v-textarea>
                                <v-switch 
                                class="mt-0 pt-0"           
                                  color="success" 
                                  hide-details
                            v-model="switch1"
                            :label="`ยืนยันข้อมูลถูกต้อง`"
                          ></v-switch>
                            </v-col>
                </v-col>
                <v-col cols="12">
                            <v-btn class="w100 my-btn " width="100%" rounded color="#FFA500"  @click="next">    Ok </v-btn>
                        </v-col>
                        <div class="hidden">
                          {{addtime()}}
                {{ checknot() }}
                        </div>
             

            </v-row>
        </v-container>
        <Footer />
  <v-dialog 
    v-model="dialog" 
    max-width="290"
    transition="dialog-bottom-transition"
    dark>
      <v-card>
        <v-card-title>Form Error</v-card-title>
              <v-card-text>
                <h3> กรุณาเลือกข้อมูลให้ครบถ้วน </h3>
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
                <h3> จองคิวล่วงหน้า {{ (this.Tbooking) }} ชม.ขึ้นไป </h3>
             </v-card-text>
      </v-card>
    </v-dialog>
        
    </div>
</template>

<script>

export default {
  mounted() {
    this.loadworkday();
    liff.init({
      liffId: '1657521762-yJ505ZNL'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.$store.dispatch('setLine', profile);
        })

        this.data.date=this.$store.getters.getCancel.date;
        this.data.perple=this.$store.getters.getCancel.perple;

        this.namebarber()
        this.changetimebarber()



      } else {
        liff.login();
      }
    })
  },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
    getCheck() {
      return this.$store.getters.getCancel;
    },
    getStopday() {
      return this.$store.getters.getStopday;
    },
    getDatahair() {
      return this.$store.getters.getHair;
    },
    getCancel() {
      return this.$store.getters.getCancel;
    },

  },
  data() {
    return {
      people:"",
      date:'',
      time2:'',
      etc:"",
      states:[],
      time:[],
      workdays: [],
      text: '',
      ex4: ['success'],
      form: {
        dateEnd: '',
        timeEnd: '',
        minute: '',
        min: '',
        hour: '',
        hor: '',
      },
      summinute: '',
      switch1: false,
      data: {
        date: '',
        perple: '',
        time: '',
        etc: '',
      },
      dataname: {
        perple: this.$store.getters.getCancel.name
      },
      dialog: false,
      checkOvertime: false,
      Cbooking:this.$store.getters.getCancel.Cbooking,
      Tbooking:this.$store.getters.getCancel.Tbooking,
      dataim:{
        encodedImage:null,
        bath:null
      },
      id:{
        userId: this.$store.getters.getLine.userId
      }
    }
  },
  methods: {
    async test() {
      const d = new Date();
      console.log(this.data.time.substring(0, 2))
      if (Number(this.data.time.substring(0, 2) - d.getHours()) >= 2) {
        console.log("pass")
      } else console.log(555)
      // await this.addtime();
    },
    async checknot() {
      await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`).then((res) => {
            this.time2 = res.data.time;
            this.people = res.data.perple;
            this.date = res.data.date;
            this.etc = res.data.etc;
          });

      if (((this.summinute) - (this.$store.getters.getCancel.summinute)) >= this.Cbooking) {
        this.$router.push("/changetime/notpass");
      }
    },
    printDate: function () {
      return new Date().toLocaleString();
    },
    printTime: function () {
      return new Date().toLocaleTimeString();
    },
    async next() {
      console.log(this.$store.getters.getLine.userId)
      await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`).then((res) => {
            this.dataim.encodedImage=res.data.encodedImage;    
                console.log(res.data.encodedImage)
          });
          this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Data.json`).then((res) => {
            this.dataim.bath=res.data.bath;
          });
          console.log(this.dataim.encodedImage)
      if (this.data.time == null || this.data.time == '' || this.switch1 == false) {
        this.dialog = true
      } else {
        await this.addtime();
        //this.dataname.perple=this.data.perple;



        //newData
        try {
          await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.data.perple}/${this.data.date}/${this.data.time}.json`, this.dataname)
          await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.data.perple}/${this.data.date}/${this.data.time}.json`, this.dataim)
          await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`, this.data)
          await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/userLineliff/${this.$store.getters.getLine.userId}.json`, this.form)
          await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/booking/${this.$store.getters.getCancel.summinute}.json`, this.data)
          await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/booking/${this.$store.getters.getCancel.summinute}.json`, this.id)
          await this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.$store.getters.getCancel.perple}/${this.$store.getters.getCancel.date}/${this.$store.getters.getCancel.time}.json`);

          //  timeout: 1000
          this.$router.push("/changetime/verify");
        }
        catch (err) { console.log(err) }
        console.log(555);
      }
    },
    allowedDates(val) {
      return this.workdays.includes(val);
    },
    loadworkday() {
      console.log('ทำงาน');
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
          console.log(items);
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
        console.log("namebarber");
        console.log(this.data.date);
        const db = this.$fireModule.database();
        db.ref(`TimeQBarber/${this.data.date}`).on("value", (snapshot) => {
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
            console.log(this.data.date);
            const db = this.$fireModule.database();
            db.ref(`TimeQBarber/${this.data.date}/${this.data.perple}`).on(
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
                        indata.date == this.data.date &&
                        indata.perple == this.data.perple
                    ) {
                        deltime.push(indata.time);
                    }
                    }
                    console.log(deltime);
                    for (const times in childData) {
                    const time = childData[times];
                    if (!deltime.includes(time)) {
                        if (
                        parseInt(this.data.date.substring(8, 10)) >
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
                console.log(items);
                this.time = items;
                }
            );
        },       

    async checkPeople() {
      // await this.$store.dispatch('setDatahair', this.reset) 
      await this.$store.dispatch('setCheck', this.resetDataBarber);
      await this.$store.dispatch('setCheck', this.resetData);
      await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/TimeQBarber/${this.data.date}/nBarber.json`).then((res) => {
        this.$store.dispatch('setCheck', res.data)
      });
      this.data.perple = null;
      this.data.time = null;
      await this.$store.dispatch('setDatahair', this.data)
      this.data.date = "";

     // this.$router.push("/changetime/reset");
      // console.log(res.data)
    },
     created() {
      this.checkPeople()
    },
    async checkTimeBarber() {

      await this.$store.dispatch('setCheck', this.resetData);
      await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/TimeQBarber/${this.data.date}/${this.data.perple}.json`).then((res) => {
        this.$store.dispatch('setCheck', res.data);
      });
      this.data.time = null;
      await this.$store.dispatch('setDatahair', this.data)
     // this.data.perple = '';
      //this.data.time = '';
     //await this.$router.push("/changetime/resetTime");
      // console.log(555)
    },
    checkTime() {
      if (this.data.perple != null && this.data.perple != '' && this.data.date != '') {
        this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/Table/${this.data.perple}/${this.data.date}/${this.data.time}.json`).then((res) => {
          this.text = res.data
          console.log(res.data.perple)
          console.log('-------------------')
          if (res.data.perple != null) {
            console.log(res.data.perple)
            this.checkT = true;
            this.data.time = null;
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
      let th1 = this.data.time.slice(0, 2); //ชั่วโมงที่เลือก
      let tm1 = this.data.time.slice(3, 5);  //นาทีที่เลือก
      console.log(5555)
      console.log((((Number(cd1) * 1440) + (Number(cm1) * 44640) + (Number(cy1) * 525600) + (Number(th1) * 60) + Number(tm1)) - ((Number(cd) * 1440) + (Number(cm) * 44640) + (Number(cy) * 525600) + (Number(th) * 60) + Number(tm))))

      if ((((Number(cd1) * 1440) + (Number(cm1) * 44640) + (Number(cy1) * 525600) + (Number(th1) * 60) + Number(tm1)) - ((Number(cd) * 1440) + (Number(cm) * 44640) + (Number(cy) * 525600) + (Number(th) * 60) + Number(tm))) <= this.Tbooking) {
        this.checkOvertime = true; this.data.time = '';
      } else { console.log('pass') }
    },
    async addtime() {

      const d = new Date();
      console.log(d.toLocaleString())
      let cd1 = this.$store.getters.getCancel.date.toLocaleString().substring(8, 10)
      console.log("cd1= " + cd1)
      let cm1 = this.$store.getters.getCancel.date.toLocaleString().substring(5, 7)
      console.log("cm1= " + cm1)
      let cy1 = this.$store.getters.getCancel.date.toLocaleString().substring(0, 4)
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

      this.form.dateEnd = cy + "-" + cm + "-" + cd;
      // console.log(this.form.dateEnd)

      this.form.timeEnd = this.printTime();
      this.form.min = (this.form.timeEnd.slice(3, 5));
      this.form.minute = Number(this.form.min);
      this.form.hor = (this.form.timeEnd.slice(0, 2));
      this.form.hour = Number(this.form.hor);

      this.summinute = (this.form.hour * 60) + (this.form.minute) + ((1440 * cd) + (44640 * cm) + (525600 * cy));

    }
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

.hidden {
  display: none;
}
</style>