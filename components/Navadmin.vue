<template>
    <div>
    <v-toolbar
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    > 

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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card shaped >
        <v-card-title class="text-h5">
         <h6>คุณต้องการออกจากระบบหรือไม่</h6> 
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green"
            text
            @click="out"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default { 
    async mounted() {
      if(this.$store.getters.getUser.role != "A"){
        this.$store.dispatch('setUser', this.form)
        this.$router.push("/login")
      }
    },
    data(){
      return{
        dialog:false,
        form:{
          id:null,
          pwd:null,
          name:null,
          dialogcheck:false
        }
      }
    },
  methods:{
    out(){
      this.$store.dispatch('setUser', this.form)
        this.$router.push("/login")
    },
      logout(){
        this.dialog=true
      },
      gohome(){
     this.$router.push("/admin")
      }
  },
      computed: {
          getUser(){
             return this.$store.getters.getUser;
          },
          
      },
      
      
  };
  </script>
