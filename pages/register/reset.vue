<template>
    <div>
    {{next()}}
    </div>
                </template>
<script>
export default {
    data(){
        return {
            resetData:{
               
    t1:null,t2:null,t3:null,t4:null,t5:null,
    t6:null,t7:null,t8:null,t9:null,t10:null,
    t11:null,t12:null,t13:null,t14:null,t15:null,
    t16:null,t17:null,t18:null,t19:null,t20:null,
    t21:null,t22:null,t23:null,t24:null,t25:null,
    t26:null,t27:null,t28:null,t29:null,t30:null,
    t31:null,t32:null,t33:null,t34:null,t35:null,
    t36:null,t37:null,t38:null,t39:null,t40:null,
    t41:null,t42:null,t43:null,t44:null,t45:null,
    t46:null,t47:null,t48:null,t49:null,t50:null,
            },
            form:{
                    time:null,
                    perple:null
                },


        }
    },
    methods: {
      
      next() {
       // this.$store.dispatch('setCheck', this.resetData)
       // this.$store.dispatch('setDatahair', this.form) 
                   this.$router.push("/register/step2")
           }
         }    
    
    
};
</script>