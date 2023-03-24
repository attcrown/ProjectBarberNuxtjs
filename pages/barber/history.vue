<template>
  <div>
    <Navbarber />
    <div class="mt-8 text-primary text-title text-center">History</div>
    <template>
      <div class="text-right">
        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex" cols="5" sm="3">
              <v-select
                v-model="selectedMonth"
                :items="selectmonths"
                label="Months"
                dense
                solo
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="7" sm="3">
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
                @click="searchbtn()"
                >Search</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>

    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left pr-0 pl-0">
            <v-btn x-small @click="toggleSort()">Date</v-btn>
          </th>
          <th class="text-left pr-1 pl-1">Time</th>
          <th class="text-left pr-1 pl-1">Customers</th>
          <th class="text-left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="pr-0 pl-0">{{ item.date }}</td>
          <td class="pr-1 pl-1">{{ item.time }}</td>
          <td class="pr-1 pl-1">
            {{ item.user.substring(0, 4) + ".." }}
          </td>
          <td>
            <v-btn
              color="primary"
              x-small
              @click="
                selectedItem = item;
                dialog = true;
              "
              ><span class="mdi mdi-account-details" style="font-size: 15px;"></span>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <Footer />

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-text>
              <v-col cols="12">
                <div class="mt-1 text-primary text-title text-center mb-5">
                  Details
                </div>
                <h3 class="mb-2">
                  <v-icon small>{{ icons.mdiAccount }}</v-icon> Name :
                  {{ selectedItem ? selectedItem.user : "-" }}
                </h3>
                <h3 class="mb-2">
                  <v-icon small>mdi-email</v-icon> Barber :
                  {{ selectedItem ? selectedItem.userId : "-" }}
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
                  <span class="mdi mdi-cash-fast"></span> เงินมัดจำ
                  {{ selectedItem ? selectedItem.bath : "-" }} บาท
                </h3>
                <h3 class="mb-2">
                  <span class="mdi mdi-cash-fast"></span> เงินค่าตัดผม
                  {{ selectedItem ? selectedItem.money : "-" }} บาท
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
              <v-btn color="red darken-1" text @click="confirmdel = true">
                <v-icon small>{{ icons.mdiDelete }}</v-icon> Del</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog v-model="confirmdel" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> ยืนยันการลบประวัติ? </v-card-title>
            <v-card-text
              >การลบครั้งนี้จะไม่สามารถกู้คืนประวัติกลับมาได้
              ท่านต้องการที่จะลบหรือไม่</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="confirmdel = false">
                Cancel
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="
                  onDeleteItem(selectedItem),
                    (confirmdel = false),
                    (dialog = false)
                "
              >
                <v-icon small>{{ icons.mdiDelete }}</v-icon> Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import { mdiAccount, mdiPencil, mdiShareVariant, mdiDelete } from "@mdi/js";
import { count } from "console";
export default {
  data() {
    return {
      form: {
        perple: this.$store.getters.getDatahair.name,
      },
      selectedMonth: null,
      selectedYear: null,
      items: [],
      sortBy: "date",
      sortDesc: false,
      selectedItem: null,
      dialog: false,
      confirmdel: false,
      icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete,
      },
      selectyears: ["2023", "2024", "2025", "2026", "All"],
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
        "All",
      ],
    };
  },
  computed: {
    // คำนวณข้อมูลที่ได้จากการเรียงลำดับ โดยใช้ sortBy และ sortDesc
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
    getLine() {
      return this.$store.getters.getLine;
    },
    getDatahair() {
      return this.$store.getters.getDatahair;
    },
  },
  mounted() {
   this.fetchData();
  },
  methods: {
   fetchData() {
      console.log("fetchDat");
      const db = this.$fireModule.database();
      db.ref("Table/" + this.$store.getters.getUser.name).on(
        "value",
        (snapshot) => {
          const childData = snapshot.val();
          const items = [];
          for (const date in childData) {
            const user = childData[date];
            console.log(user);
            for (const time in user) {
              if(time == "null"){
                console.log("error null");
              }else{
                const username = user[time];
                const item = {
                  userId: this.$store.getters.getUser.name,
                  date,
                  time,
                  user: username.perple,
                  cash: username.cash,
                  money: username.money || "-",
                  phone: username.phoneNumber,
                  img: username.encodedImage,
                  bath: username.bath || "-",
                };
              items.push(item);
              }              
            }
          }
          this.items = items;
        }
      );
    },
    onDeleteItem(item) {
      const db = this.$fireModule.database();
      const { userId, date, time } = item;
      db.ref(`Table/${userId}/${date}/${time}`).remove();

      },
    // เมื่อกดปุ่มสลับการเรียงลำดับให้เปลี่ยนค่า sortDesc
    toggleSort() {
      this.sortDesc = !this.sortDesc;
    },
    searchbtn() {
      console.log(this.selectedMonth, this.selectedYear);
      if (this.selectedMonth == undefined || this.selectedYear == undefined) {
        alert("กรุณาระบุการค้นหาให้ครบ");
        return;
      } else if (this.selectedMonth == "All" && this.selectedYear == "All") {
        this.fetchData();
      } else if (this.selectedMonth == "All" && this.selectedYear != "All") {
        this.TableMonthYear();
      } else if (this.selectedMonth != "All" && this.selectedYear == "All") {
        this.TableMonthYear();
      } else if (this.selectedMonth != "All" && this.selectedYear != "All") {
        this.TableMonthYear();
      }else {

      }
    },
    TableMonthYear() {
      console.log("TableMonthYear");
      var Months = ["January","February","March","April","May",
        "June","July","August","September","October","November","December",];
      let numMonth;
      console.log("มีค่า", this.selectedYear, this.selectedMonth);
      for (let i = 0; i < Months.length; i++) {
        if (this.selectedMonth == Months[i]) {
          numMonth = i + 1;
          if (numMonth < 10) {
            numMonth = "0" + numMonth.toString();
          }
        }
      }
      const db = this.$fireModule.database();
      db.ref("Table/" + this.$store.getters.getUser.name).on("value",
        (snapshot) => {
          const childData = snapshot.val();
          const items = [];
          for (const date in childData) {
            const user = childData[date];
            if (date.substring(0, 4) == this.selectedYear &&
            date.substring(5, 7) == numMonth) {
              for (const time in user) {
                const username = user[time];
                const item = {
                  userId: this.$store.getters.getUser.name,
                  date,
                  time,
                  user: username.perple,
                  cash: username.cash,
                  money: username.money || "-",
                  phone: username.phoneNumber,
                  img: username.encodedImage,
                  bath: username.bath || "-",
                };
                items.push(item);
              }
            }else if(this.selectedMonth == "All" && this.selectedYear != "All"){
              if (date.substring(0, 4) == this.selectedYear) {
                for (const time in user) {
                  const username = user[time];
                  const item = {
                    userId: this.$store.getters.getUser.name,
                    date,
                    time,
                    user: username.perple,
                    cash: username.cash,
                    money: username.money || "-",
                    phone: username.phoneNumber,
                    img: username.encodedImage,
                    bath: username.bath || "-",
                  };
                  items.push(item);
                }
              }
            }else if(this.selectedMonth != "All" && this.selectedYear == "All"){
              if (date.substring(5, 7) === numMonth) {
                for (const time in user) {
                  const username = user[time];
                  const item = {
                    userId: this.$store.getters.getUser.name,
                    date,
                    time,
                    user: username.perple,
                    cash: username.cash,
                    money: username.money || "-",
                    phone: username.phoneNumber,
                    img: username.encodedImage,
                    bath: username.bath || "-",
                  };
                  items.push(item);
                }
              }
            }else{console.log('ดึงไม่สำเร็จ');}
          }
          this.items = items;
        }
      );
    },
  },
};
</script>
