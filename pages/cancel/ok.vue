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
                  Step 4 to 4
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
                <h3 class="text-primary">ขอบคุณที่ใช้บริการ</h3> 
                 {{ getLine.displayName}}
             </v-col>
             <v-col cols="12">
                  <v-textarea
                    outlined
                    readonly
                    height="80"
                    success
                    name="input-7-4"
                    label="รายละเอียดการยกเลิกจองคิว"
                    :value = '"- ทำการยกเลิกการจองคิวของคุณเรียบร้อย \n- การคืนเงินจะเสร็จสิ้นภายใน 1-3 วันทำการ\n" '
                ></v-textarea>
                </v-col>

            
        </v-row>
      </v-container>
      <Footer />
</div>
</template>

<script>
export default { 


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
    mounted(){
      liff.sendMessages([
            {
                   type: 'text',
                  text: `ฉันได้ทำการยกเลิกการจองคิวเรียบร้อย\n
ข้อความจากระบบ\n
- ท่านจะได้รับเงินมัดจำคืนภายใน 1-3 วันทำการ 
- หากมีโอกาศสามารถเข้าใช้บริการจองคิวตัดผมกับทางร้านของเราได้ตลอดนะคะ 
- สามารถตรวจสอบสถนานะการคืนเงิน ได้ที่เมนู สถานะการคืนเงิน
- ขอบคุณค่ะ`
                }
                ]).then(() => {
                // The message was successfully sent
                console.log('Message sent!')
                }).catch((error) => {
                // An error occurred while sending the message
                console.error(error)
                })
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