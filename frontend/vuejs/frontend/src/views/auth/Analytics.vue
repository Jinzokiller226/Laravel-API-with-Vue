<script setup lang="ts" >
import { inject, ref } from 'vue';

interface UserState {
    name: string;
    email: string;

}
const user = inject('currentUser', ref({ name: '', email: '' }));

</script>

<template>
    
      <div class="pt-8 min-h-screen border-2 border-default border-dashed rounded-base">
        <h1 class="mx-2 font-bold">Welcome, {{ user.name }} </h1> 
        <!-- Get Users Name and Email from dashboard or cookies -->
      <div class="flex content-center justify-center p-6">
        <div class="w-20 flex-1  border-black-200 rounded-xl h-20 p-6 mx-4 bg-slate-200 "><h1>Data 1</h1></div>
        <div class="w-20 flex-1 border-black-200 rounded-xl h-20 p-6 mx-4  bg-slate-200  ">Data 2</div>
        <div class="w-20 flex-1 border-black-200 rounded-xl h-20 p-6 mx-4 bg-slate-200  ">Data 3</div>
      </div>

      <div class="flex content-center justify-center p-6">
          <div class="w-20 h-100 flex-1  border-black-200 rounded-xl h-20 p-6 mx-4 bg-slate-200 ">Graph 1</div>
      </div>
   </div>
</template>