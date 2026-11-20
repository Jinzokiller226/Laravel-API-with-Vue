<script setup>

</script>

<template>
    <title>Error 401</title>
 
<div class="loginFormTemplate ">
        <div class=" bg-white shadow-lg rounded-xl p-8 text-center border border-gray-100">
            <div class="w-auto grid content-center justify-center justify-items-center  py-10 ">
            <img class="max-w-1/2" src="../assets/Insys.png" alt="Vue Logo">
            </div>
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-500 rounded-full mb-6 text-2xl font-bold">
            401
        </div>

    
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Unauthorized Access</h1>
        
     
        <p class="text-gray-600 mb-6 text-sm leading-relaxed">
            Sorry, you lack valid authentication credentials to access this resource. Please log in with the correct credentials to continue.
        </p>

       
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/login" class="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm">
                Log In
            </a>
          
        </div>

          <div class="mt-8 text-center text-xs text-gray-400">
        Need help? Contact <a href="mailto:brightsightopticalclinic@gmail.com" class="text-indigo-500 hover:underline">support team</a>.
    </div>

    </div>

</div>
    

   
  


</template>
