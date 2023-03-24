<template>
    <div>

      <Navadmin />
        <v-container class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" >
                    <div class="mt-8 text-primary text-title text-center">
                   EditPromotion
                      </div>
                </v-col>
  
                <v-col cols="12" class="pb-0">
                    <h4> - เพิ่มรูปโปรโมชั่น</h4>
                    <v-file-input
                          v-model="imageFile"
                          :rules="rules"
                          color="deep-purple accent-4"
                          :show-size="1000"
                          chips
                          accept="image/png, image/jpeg"
                          placeholder="อัพโหลดรูปโปรโมชั่น"
                          prepend-icon="mdi-file-star-outline"
                          label="อัพโหลดรูปโปรโมชั่น"
                        ></v-file-input>
                        <v-img class="mx-auto d-block"  width="80%" height="auto" v-if="imageFile" :src="imageUrl" />
                    
                </v-col>   
                <v-col cols="12" class="pt-0">
                    <v-btn class="w100 my-btn " width="100%" rounded color="primary" dark  @click="save"> Save Data </v-btn>
                </v-col>   
                <v-col cols="12" >
                    <div class="mt-3 text-primary text-title text-center">
                   โปรโมชั่นที่มีในปัจจุบัน
                      </div>
                </v-col>
                <v-col>
                    <v-card
    flat
    tile
  >
    <v-window
      v-model="onboarding"
    >
      <v-window-item
        v-for="n in length"
        :key="`card-${n}`"
      >
        <v-card
          width="100%" height="auto"
        >
            <v-img class="mx-auto d-block"  width="80%" height="auto" :src="dataim[n-1]" />
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn
        text
        @click="prev"
      >
        <v-icon>mdi-chevron-left-circle</v-icon>
      </v-btn>
      <v-item-group
        v-model="onboarding"
        class="text-center"
        mandatory
      >
       <h4>โปรโมชั่นที่ : {{ this.onboarding+1 }}</h4> 
      </v-item-group>
      <v-btn
        text
        color="red"
        @click="dialogDelete=true"
        class="mr-0 pr-0"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
      <v-btn
        text
        @click="next"
        class="mr-0 pr-0"
      >
        <v-icon>mdi-chevron-right-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
                </v-col>
          </v-row>
        </v-container>
        <Footer />
        <v-dialog v-model="dialog" max-width="290" transition="dialog-bottom-transition">
            
            <v-card>
              <v-card-title>Form Error</v-card-title>
                    <v-card-text>
                      <h3>   กรุณาเพิ่มรูปภาพ </h3>
                   </v-card-text>
            </v-card>
          </v-dialog>


          <v-dialog
      v-model="dialogDelete"
      persistent
      max-width="290"
      dark
    >
      <v-card>
        <v-card-title class="text-h5">
          <h5>คุณต้องการลบใช่หรือไม่</h5> 
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogDelete = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialogDelete = false,deleteim()"
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
  methods:{
   async deleteim(){

        let d = this.datakey[this.onboarding]
        await this.$axios.delete(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/DataPromotion/${d}.json`);
        this.$router.push("/admin/verifyPromotion")
    },
    onFileInput() {
      if (this.imageFile != null) {
        this.imageUrl = URL.createObjectURL(this.imageFile)

        const reader = new FileReader();
        reader.readAsDataURL(this.imageFile);
        reader.onload = () => {
          this.data.encodedImage = reader.result;
        };
        reader.onerror = error => {
          console.log(error);
        };
      }
    },
   async save(){
    if(this.data.encodedImage == null){
        this.dialog=true
    }else{
       await this.$axios.patch(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/DataPromotion/${this.data.key}.json`, this.data)
        this.$router.push("/admin/verifyPromotion")
    }
    },
    next () {
        this.onboarding = this.onboarding + 1 === this.length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
      async get() {
              for (let i = 0; i < this.datakey.length; i++) {
                  await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/DataPromotion/${this.datakey[i]}.json`)
                      .then((res) => {
                        this.dataim.push(res.data.encodedImage);
                      })
              }
              this.length=this.dataim.length;
          },
  },

  async mounted() {

    try{
        await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/DataPromotion.json`)
            .then((res) => {
              const keys = Object.keys(res.data); // ดึง key ออกมาจาก Object
              for (let i = 0; i < keys.length; i++) { // วนลูปเพื่อเก็บ key ทั้งหมดลงใน array
                this.datakey.push(keys[i]);
              }
              this.get(); 
 
            })
            
                  await this.$axios.get(`https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app/DataPromotion.json`)
                  .then((res) => {
                      const keys = Object.keys(res.data); // ดึง key ออกมาจาก Object
                      for (let i = 0; i < keys.length; i++) { // วนลูปเพื่อเก็บ key ทั้งหมดลงใน array
                          if(Number(this.data.key.substring(1,3))< Number(keys[i].substring(1,3))){
                            this.data.key = keys[i]
                          }
                      }
                      let pnew=''
                      if(Number(this.data.key.substring(1,3)) < 10){
                        pnew = "p0"+(Number(this.data.key.substring(1,3))+1)
                      }else{
                        pnew = "p"+(Number(this.data.key.substring(1,3))+1)
                      }
                      this.data.key = pnew;
                       
                  }) 
                }catch(e){ }
    },
    watch: {
    async imageFile(newValue) {
      await this.onFileInput()

    }
  },
    data() {
          return {
            dialogDelete:false,
              dialog: false,
              data: {
                key:"p01",
                encodedImage:null,
              },
              imageFile: null,
              imageUrl: null,
              encodedImage:null,
              rules: [
                  value => !value || value.size < 2000000 || 'ไฟล์ภาพไม่เกิน 2 MB!',
              ],
              length: null,
              onboarding: 0,
              dataim:[],
              datakey:[],
          }
      },
  };
  </script>
  
