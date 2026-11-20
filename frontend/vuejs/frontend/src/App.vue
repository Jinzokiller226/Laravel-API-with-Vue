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

  

<body class="min-h-screen w-full m-0 flex flex-col bg-slate-50 text-slate-900 bg-gradient-to-b from-white via-blue-500 to-blue-600 ">
<div class="  ">
   <main class="">
  <div class="mb-6">
      <RouterView />    
  </div>
</main>
</div>

</body>
 
</template>



