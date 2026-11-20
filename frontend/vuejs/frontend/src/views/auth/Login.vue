<script setup lang="ts">
import axiosInstance from '@/lib/axios';
import { FormKitNode } from '@formkit/core';
import { AxiosError } from 'axios';
// import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const handleIconClick = (node: FormKitNode) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
 
interface LoginForm{
    email: string;
    password: string;
   
}


// const form = reactive<LoginForm>({
//     email: "",
//     password: "",
    
// });

// const errors = reactive({
   
//     email: [],
//     password: [],
// });

const login = async (payload: LoginForm, node?: FormKitNode) => {
    
   
   await axiosInstance.get('/sanctum/csrf-cookie', {
        baseURL: "http://localhost:8000",

        });
      
    try{
        await axiosInstance.post('/login' ,payload ); 
         
        router.push('/dashboard');
    }
    catch(e){
       if (e instanceof AxiosError && e.response?.status === 422){
            node?.setErrors([''],e.response?.data.errors)

        }

    }

};




</script>
<template >
<div class="loginFormTemplate">
    <div class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl ">
        <div class="w-full   max-w-sm justify-items-center bg-neutral-primary-soft p-6  shadow-xs  ">
            <img class="max-w-2/3" src="./../../assets/Insys.png" alt="Vue Logo">
        </div>
       
        <div class="w-full  max-w-sm  p-6  shadow-xs">
             <h1 class="w-full text-xl font-bold text-heading grid content-center justify-center p-2 ">Login</h1>
            <FormKit  type="form" submit-label="Login" @submit="login">
                <FormKit  type="email" label="Email" name="email" />
                <FormKit type="password" label="Password" name="password"  
                 inner-class=" !border-neutral-400 focus-within:!border-blue-500 focus-within:!ring-1 focus-within:!ring-blue-500"
                    input-class="!border-0 !ring-0 !shadow-none !outline-none focus:!border-0 focus:!ring-0 focus:!outline-none"
                suffix-icon="eyeClosed" @suffix-icon-click="handleIconClick" />
                

            </FormKit>
            
        </div>
    </div>
</div>
</template>