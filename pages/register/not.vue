<template>
  <div>
      <v-app-bar
    color="#20DE79"
    dense
    flat
    dark
  >
  <v-toolbar-title>Success ✓</v-toolbar-title>
      </v-app-bar>
      <v-container class="pt-0 pb-0">
        <v-row>
          <v-col cols="12" >
                  <div class="mt-8 text-primary text-title text-center">
                  มีคิวของคุณอยู่ในระบบแล้ว
                    </div>
              </v-col>

              <v-col cols="12" class="text-center">
                <v-avatar
                  size="150"
                  center
                >
                <img
                     :src="this.$store.getters.getLine.pictureUrl"  
                  >
                </v-avatar>
                
             </v-col>
             <v-col class="text-center">
                <h3 class="text-primary">คุณได้ทำการจองคิวเสร็จสิ้นแล้ว</h3> 
                 {{ getLine.displayName}}
             </v-col>
             <v-col cols="12">
                  <v-textarea
                    outlined
                    readonly
                    height="130"
                    success
                    name="input-7-4"
                    label="รายละเอียดการจองคิว"
                    :value =  " 
                    '- วันที่คุณจองคิว: '+$store.getters.getCancel.date+ 
                    '\n- ช่างที่คุณเลือก : '+$store.getters.getCancel.perple+
                    '\n- เวลาที่จองคิว : '+$store.getters.getCancel.time+
                    '\n(ยกเลิก หรือ เปลี่ยนเวลา ได้ตามเงื่อนไขที่กำหนด) '
                      "
                ></v-textarea>
                </v-col> 
        </v-row>
      </v-container>
      <Footer />
</div>
</template>

<script>
import Footer from '~/components/Footer.vue';
export default {
  components: { Footer }, 


  data(){
    return{
      form:{
        perple:this.$store.getters.getDatahair.name
      }
    }
  },
    computed: {
        getLine(){
           return this.$store.getters.getLine;
        },
        getDatahair(){
           return this.$store.getters.getDatahair;
        },
        
    },
    methods:{
      cancel(){
        this.$router.push("../cancel");
      },
      changeTime(){
        this.$router.push("../changetime");
      }
    }

    
};
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