<script setup>
import { RouterLink, RouterView } from 'vue-router'

// import HelloWorld from './components/HelloWorld.vue'

import { ref } from 'vue'

const activeTab = ref('profile')

const menu = [
  { key: 'home',     label: 'Home',     icon: 'fa-solid fa-house' },
  { key: 'login',  label: 'Login',  icon: 'fa-solid fa-user' },
  { key: 'register', label: 'Register', icon: 'fa-solid fa-gear' },
]

function activeTabFunc(value){
 activeTab.value = value
}
</script>

<template>
  <header>
  </header>

  

<body class="min-h-screen w-full m-0 flex flex-col bg-slate-50 text-slate-900 bg-gradient-to-r from-white via-blue-500 to-blue-600">
<div class="  bg-gradient-to-b from-white via-blue-500 to-blue-600">
   <main class="">
  <div class="mb-6">
        <Transition name="fade" mode="in-out">
        <RouterView/>
        </Transition>
  </div>
</main>
</div>

</body>
 
</template>
<style>
.fade-enter-from,.fade-leave-to{
  transition: opacity 0.2 ease-in-out;
    opacity: 0;

}
.fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s ease-out ;
}

</style>


