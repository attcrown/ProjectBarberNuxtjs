<template>
    <div>
    {{next()}}
    </div>
                </template>
<script>
export default {
    data(){
        return {
            form:{
                    time:null,
                },

        }
    },
       
    methods: {
      
     async next() {
        //await this.$store.dispatch('setCheck', this.resetData)
       // this.$store.dispatch('setDatahair', this.form) 
           this.$router.push("/changetime/pass")
          }
         }    
    
    
};
</script>