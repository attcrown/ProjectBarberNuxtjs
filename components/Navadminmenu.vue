<template>
    <div>
        <v-toolbar dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-nav-icon>
                <v-btn icon @click="gohome">
                    <v-icon>mdi-home</v-icon>
                </v-btn>
            </v-app-bar-nav-icon>

            <v-toolbar-title class="text-center pl-0">Admin : {{ this.$store.getters.getUser.name }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="logout">
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute bottom temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group">
                    <div class=" " style="text-align:center">
                        <v-btn class="my-btn" width="75%" @click="btn1" outlined color="blue darken-4">
                            <v-icon>mdi-cash-refund </v-icon>
                            <h5>รับเรื่องขอคืนเงิน</h5>
                        </v-btn><br>
                        <v-btn class="my-btn" outlined color="blue darken-4" width="75%" @click="btn2">
                            <v-icon>mdi-table-account </v-icon>
                            <h5>ตารางงาน</h5>
                        </v-btn><br>
                        <v-btn class="my-btn" outlined color="blue darken-4" width="75%" @click="btn3">
                            <v-icon>mdi-book-edit-outline </v-icon>
                            <h5>จัดการบัญชี</h5>
                        </v-btn><br>
                        <v-btn class="my-btn" outlined color="blue darken-4" width="75%" @click="btn4">
                            <v-icon>mdi-home-clock </v-icon>
                            <h5>เวลาทำการร้าน</h5>
                        </v-btn><br>
                        <v-btn class="my-btn" outlined color="blue darken-4" width="75%" @click="btn5">
                            <v-icon>mdi-monitor-edit </v-icon>
                            <h5>แก้ไขข้อมูลต่างๆ</h5>
                        </v-btn><br>
                        <v-btn class="my-btn" outlined color="blue darken-4" width="75%" @click="btn6">
                            <v-icon>mdi-history </v-icon>
                            <h5>ประวัติการบริการ</h5>
                        </v-btn><br>
                        <v-btn class="my-btn" outlined color="blue darken-4" width="75%" @click="btn8">
                            <span class="mdi mdi-file-star-outline"></span>
                            <h5>จัดการโปรโมชั่น</h5>
                        </v-btn><br>
                        <v-btn class="my-btn" outlined color="blue darken-4" width="75%" @click="btn7">
                            <span class="mdi mdi-cash-multiple"></span>
                            <h5>รายได้</h5>
                        </v-btn><br>                       
                    </div>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card shaped>
                <v-card-title class="text-h5">
                    <h6>คุณต้องการออกจากระบบหรือไม่</h6>
                </v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
                    <v-btn color="green" text @click="out"> Ok </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    async mounted() {
        if (this.$store.getters.getUser.role != "A") {
            this.$store.dispatch("setUser", this.form);
            this.$router.push("/login");
        }
    },
    data() {
        return {
            dialog: false,
            drawer: false,
            group: null,
            form: {
                id: null,
                pwd: null,
                name: null,
                dialogcheck: false,
            },
        };
    },

    watch: {
        group() {
            this.drawer = false;
        },
    },
    computed: {
        getUser() {
            return this.$store.getters.getUser;
        },
    },
    methods: {
        btn1() {
            this.$router.push("/admin/refund");
        },
        btn2() {
            this.$router.push("/admin/work");
        },
        btn3() {
            this.$router.push("/admin/register");
        },
        btn4() {
            this.$router.push("/admin/timeshop");
        },
        btn5() {
            this.$router.push("admin/detial");
        },
        btn6() {
            this.$router.push("/admin/history");
        },
        btn7() {
            this.$router.push("/admin/indexdashboard");
        },
        btn8() {
            this.$router.push("/admin/editPromotion");
        },
        out() {
            this.$store.dispatch("setUser", this.form);
            this.$router.push("/login");
        },
        logout() {
            this.dialog = true;
        },
        gohome() {
            this.$router.push("/admin");
        },
    },
};
</script>
