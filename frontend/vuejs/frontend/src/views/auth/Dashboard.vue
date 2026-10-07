<script setup lang="ts">


import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { onMounted, ref } from 'vue';
import { initFlowbite } from 'flowbite';
import { useRoute, useRouter } from 'vue-router'
onMounted(()=> initFlowbite())

const user = ref({
    name: "",
    email: ""
});

const router = useRouter()


const getUser = async() => {
    try{
        const response = await axiosInstance.get('/user');
        user.value = response.data;
        console.log(response.data);
    
    }catch (e){
         if( e instanceof AxiosError && e.response?.status === 401 ){
          router.push('/error401');
        }

    }
};


const logout = async() => {
    try{
        const response = await axiosInstance.post('/logout');
        user.value = {
            name: "",
            email: "",
          
        };
        router.push('/login');
    
    }catch (e){
        if( e instanceof AxiosError && e.response?.status === 401 ){
          router.push('/error401');
        }

    }
};


getUser();
</script>
<template>
    

<nav class="fixed top-0 z-50 w-full bg-neutral-primary-soft border-b border-default">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start rtl:justify-end">
        <button data-drawer-target="top-bar-sidebar" data-drawer-toggle="top-bar-sidebar" aria-controls="top-bar-sidebar" type="button" class="sm:hidden text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
   </svg>
         </button>
        <a href="https://flowbite.com" class="flex ms-2 md:me-24">
          <img src="../../assets/InsysLogo.png" class="h-6 me-3" alt="FlowBite Logo" />
          <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Insys App</span>
        </a>
      </div>
      <div class="flex items-center">
          <div class="flex items-center ms-3">
            <div>
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
              </button>
            </div>
            <div class="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44" id="dropdown-user">
              <div class="px-4 py-3 border-b border-default-medium" role="none">
                <p class="text-sm font-medium text-heading" role="none">
                  {{user.name}}
                </p>
                <p class="text-sm text-body " role="none">
                  {{user.email}}
                </p>
              </div>
              <ul class="p-2 text-sm text-body font-medium" role="none">
                <li>
                  <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Edit Profile</a>
                </li>
        
                <li>
                  <a href="#" @click="logout" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>


<aside id="top-bar-sidebar" class="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
      <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5">
         <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 me-3" alt="Flowbite Logo" />
         <span class="self-center text-lg text-heading font-semibold whitespace-nowrap">Flowbite</span>
      </a>
      <ul class="space-y-2 font-medium">
         <li>
            <a href="#" class=" flex  items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand  group ">
               <svg class="w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/></svg>
               <span class="ms-3 ">Dashboard</span>
            </a>
         </li>
         
         <li>
            <a href="#" class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
               <svg class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"/></svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
               <!-- <span class="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full">2</span> -->
            </a>
         </li>
         
      </ul>
   </div>
</aside>

<div class="p-4 sm:ml-64 pt-20">
   <div class="pt-8 min-h-screen border-2 border-default border-dashed rounded-base">
      <div class="flex content-center justify-center p-6">
        <div class="w-20 flex-1  border-black-200 rounded-xl h-20 p-6 mx-4 bg-slate-200 ">Data 1</div>
        <div class="w-20 flex-1 border-black-200 rounded-xl h-20 p-6 mx-4  bg-slate-200  ">Data 2</div>
        <div class="w-20 flex-1 border-black-200 rounded-xl h-20 p-6 mx-4 bg-slate-200  ">Data 3</div>
      </div>

      <div class="flex content-center justify-center p-6">
          <div class="w-20 h-100 flex-1  border-black-200 rounded-xl h-20 p-6 mx-4 bg-slate-200 ">Graph 1</div>
      </div>
   </div>
</div>
    
</template>