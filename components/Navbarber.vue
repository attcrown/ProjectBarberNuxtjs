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

      <v-toolbar-title class="text-center pl-0">Barber : {{ this.$store.getters.getUser.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="logout">
            <v-icon>mdi-export</v-icon>
        </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  export default { 
    async mounted() {
      if(this.$store.getters.getUser.role != "B"){
        this.$store.dispatch('setUser', this.form)
        this.$router.push("/login")
      }
    },
    data(){
      return{
        form:{
          id:null,
          pwd:null,
          name:null,
          dialogcheck:false
        }
      }
    },
  methods:{
      logout(){
        this.$store.dispatch('setUser', this.form)
        this.$router.push("/login")
      },
      gohome(){
     this.$router.push("/barber")
      }
  },
  
      computed: {
          getUser(){
             return this.$store.getters.getUser;
          },
          
      },
      
      
  };
  </script>
