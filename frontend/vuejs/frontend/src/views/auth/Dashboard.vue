<script setup lang="ts">


import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { onMounted, ref, provide } from 'vue';
import { initFlowbite } from 'flowbite';
import { RouterLink, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const appMenuOpen = ref(
  ['/dashboard/roles', '/dashboard/users', '/dashboard/doctors', '/dashboard/category', '/dashboard/branch']
    .includes(route.path)
)
onMounted( async ()=> {
  initFlowbite()
  
})

const user = ref({
    name: "",
    email: ""
});

const router = useRouter()
provide('currentUser', user);



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
  <!-- Glass needs something colorful behind it: soft gradient + blurred blobs -->
  <div class="relative isolate min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-fuchsia-100">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-400/40 blur-3xl"></div>
      <div class="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-300/40 blur-3xl"></div>
      <div class="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-sky-400/40 blur-3xl"></div>
    </div>

    <!-- TOP NAV -->
    <nav class="fixed top-3 left-3 right-3 sm:left-[17rem] z-40 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(31,38,135,0.12)]">
      <div class="px-3 py-2.5 lg:px-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <button data-drawer-target="top-bar-sidebar" data-drawer-toggle="top-bar-sidebar" aria-controls="top-bar-sidebar" type="button"
              class="sm:hidden text-slate-700 bg-transparent border border-transparent hover:bg-white/50 focus:ring-4 focus:ring-white/60 font-medium leading-5 rounded-xl text-sm p-2 focus:outline-none">
              <span class="sr-only">Open sidebar</span>
              <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
              </svg>
            </button>
            <!-- logo only needed on mobile; the sidebar shows it on desktop -->
            <a href="/dashboard" class="flex items-center ms-2 sm:hidden">
              <img src="../../assets/InsysLogo.png" class="h-6 me-2" alt="InsysLogo" />
              <span class="text-lg font-semibold text-slate-800 whitespace-nowrap">Insys App</span>
            </a>
          </div>

          <div class="flex items-center">
            <div class="flex items-center ms-3">
              <div>
                <button type="button" class="flex text-sm rounded-full ring-2 ring-white/70 hover:ring-indigo-300 focus:ring-4 focus:ring-indigo-200 transition" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span class="sr-only">Open user menu</span>
                  <img class="w-9 h-9 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
                </button>
              </div>
              <!-- nested blur doesn't render inside a blurred parent, so this panel is more opaque -->
              <div class="z-50 hidden w-48 rounded-2xl border border-white/70 bg-white/90 shadow-xl" id="dropdown-user">
                <div class="px-4 py-3 border-b border-slate-200/70" role="none">
                  <p class="text-sm font-semibold text-slate-800" role="none">
                    {{user.name}}
                  </p>
                  <p class="text-sm text-slate-500 truncate" role="none">
                    {{user.email}}
                  </p>
                </div>
                <ul class="p-2 text-sm text-slate-700 font-medium" role="none">
                  <li>
                    <a href="#" class="inline-flex items-center w-full px-3 py-2 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition" role="menuitem">Edit Profile</a>
                  </li>
                  <li>
                    <a href="#" @click="logout" class="inline-flex items-center w-full px-3 py-2 rounded-xl hover:bg-rose-50 hover:text-rose-700 transition" role="menuitem">Sign out</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- SIDEBAR -->
    <aside id="top-bar-sidebar" class="fixed top-0 left-0 z-50 w-64 h-full p-3 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div class="h-full flex flex-col rounded-2xl border border-white/60 bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15)]">

        <!-- brand -->
        <div class="w-full px-4 py-4 flex justify-center rounded-t-2xl border-b border-white/50 bg-white/30">
          <a href="/dashboard" class="flex items-center">
            <img src="../../assets/InsysLogo.png" class="h-6 me-2" alt="InsysLogo" />
            <span class="flex items-center text-lg text-slate-800 font-semibold whitespace-nowrap">Insys App</span>
          </a>
        </div>

        <ul class="space-y-1 p-3 font-medium">
          <li>
            <RouterLink
              class="group flex items-center px-3 py-2 rounded-xl text-slate-700 transition-all duration-200 hover:bg-white/60 hover:text-indigo-700 hover:shadow-sm"
              exact-active-class="!bg-white/80 !text-indigo-700 shadow-sm ring-1 ring-white"
              to="/dashboard">
              <svg class="shrink-0 w-5 h-5 transition duration-200 group-hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/></svg>
              <span class="ms-3">Dashboard</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              class="group flex items-center px-3 py-2 rounded-xl text-slate-700 transition-all duration-200 hover:bg-white/60 hover:text-indigo-700 hover:shadow-sm"
              exact-active-class="!bg-white/80 !text-indigo-700 shadow-sm ring-1 ring-white"
              to="/dashboard/scheduleboard">
              <!-- calendar icon (was a duplicate of the dashboard icon) -->
              <svg class="shrink-0 w-5 h-5 transition duration-200 group-hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/></svg>
              <span class="ms-3">Scheduling</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              class="group flex items-center px-3 py-2 rounded-xl text-slate-700 transition-all duration-200 hover:bg-white/60 hover:text-indigo-700 hover:shadow-sm"
              exact-active-class="!bg-white/80 !text-indigo-700 shadow-sm ring-1 ring-white"
              to="/dashboard/patientlist">
              <svg class="shrink-0 w-5 h-5 transition duration-200 group-hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              <span class="ms-3">Patient Record</span>
            </RouterLink>
          </li>

          <li>
            <a href="#" class="group flex items-center px-3 py-2 rounded-xl text-slate-700 transition-all duration-200 hover:bg-white/60 hover:text-indigo-700 hover:shadow-sm">
              <svg class="shrink-0 w-5 h-5 transition duration-200 group-hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"/></svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
              <!-- <span class="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full">2</span> -->
            </a>
          </li>

          <li>
            <div class="my-2 mx-2 border-t border-white/60"></div>
            <button id="dropdownRightButton" data-dropdown-toggle="dropdownRight" data-dropdown-placement="right"
              class="group flex items-center w-full px-3 py-2 rounded-xl text-slate-700 transition-all duration-200 hover:bg-white/60 hover:text-indigo-700 hover:shadow-sm" type="button">
              <svg class="shrink-0 w-5 h-5 transition duration-200 group-hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              <span class="flex-1 ms-3 text-left whitespace-nowrap">App Management</span>
              <svg class="w-4 h-4 opacity-60" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
            </button>

            <div id="dropdownRight" class="z-[60] hidden w-56 rounded-2xl border border-white/70 bg-white/90 shadow-xl">
              <ul class="p-2 text-sm text-slate-700 font-medium" aria-labelledby="dropdownRightButton">
                <li>
                  <RouterLink to="/dashboard/roles" class="group flex items-center px-3 py-2 rounded-xl transition hover:bg-indigo-50 hover:text-indigo-700">
                    <svg class="shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Role Management</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/dashboard/users" class="group flex items-center px-3 py-2 rounded-xl transition hover:bg-indigo-50 hover:text-indigo-700">
                    <svg class="shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/dashboard/doctors" class="group flex items-center px-3 py-2 rounded-xl transition hover:bg-indigo-50 hover:text-indigo-700">
                    <svg class="shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Doctors</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/dashboard/category" class="group flex items-center px-3 py-2 rounded-xl transition hover:bg-indigo-50 hover:text-indigo-700">
                    <svg class="shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Category</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/dashboard/branch" class="group flex items-center px-3 py-2 rounded-xl transition hover:bg-indigo-50 hover:text-indigo-700">
                    <svg class="shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Branch</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </aside>

    <!-- PAGE CONTENT -->
    <div class="relative z-10 px-4 pb-6 pt-24 sm:ml-64 sm:pl-6">
      <RouterView />
    </div>
  </div>
</template>