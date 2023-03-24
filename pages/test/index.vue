<template>
<div>
  <div>
    <h3> 5555</h3>
    </div>
    <v-sheet
        class="v-sheet--offset mx-auto mt-20 pt-20"
        color="cyan"
         elevation="12"
        max-width="calc(100% - 3px)"
      >
        <v-sparkline
          :labels="labels"
          :value="value"
          color="white"
          line-width="2"
          padding="16"
          auto-draw
  
        ></v-sparkline>
      </v-sheet>
  </div>
    

   
</template>

<script>
  export default {
    data: () => ({
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
    }),
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>