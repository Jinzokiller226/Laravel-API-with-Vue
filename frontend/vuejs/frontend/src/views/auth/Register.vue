<script setup lang="ts">
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { reactive } from 'vue';
// import { P } from 'vue-router/dist/index-D7ja2BKs.js';

interface RegisterForm{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const form = reactive<RegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const errors = reactive({
    name: [],
    email: [],
    password: [],
});

const register = async (payload: RegisterForm) => {
    
   
   await axiosInstance.get('/sanctum/csrf-cookie', {
        baseURL: "http://localhost:8000",

        });
    try{
        const response = await axiosInstance.post('/register' ,payload );  
        errors.name = [];
        errors.email = [];
        errors.password = [];

    }
    catch(e){
        if (e instanceof AxiosError && e.response?.status === 422){
            errors.name = e.response.data.errors.name;
            errors.email = e.response.data.errors.email;
            errors.password = e.response.data.errors.password;

        }

    }

};




</script>
<template>
<div class="RegisterForm">
   <div class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
    <div class="w-full max-w-sm justify-items-center bg-neutral-primary-soft p-6  shadow-xs  ">
        <img class="max-w-1/2" src="./../../assets/logo.svg" alt="Vue Logo">
    </div>
    <div class="w-full max-w-sm bg-neutral-primary-soft p-6  shadow-xs">
        <h1 class="text-3xl font-bold text-center  border-5 border-white border-b-slate-500 rounded-md my-4">Register</h1>
             <form @submit.prevent="register(form)" class="max-w-md mx-auto">
        <div class="relative z-0 w-full mb-5 group">
            <input
                v-model="form.name" 
                type="name"
                
                id="name"
               class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
               placeholder=" " 
                />
            <template v-if="errors.name?.length">
                <span
                    v-for="error in errors.name"
                    :key="error"
                    class="text-red-500 text-xs italic"
                >
                    {{ error }}
                </span>
            </template>
            <label for="name" class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input
                v-model="form.email" 
                type="email"
                
                id="email"
               class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
               placeholder=" " 
                />

                  <template v-if="errors.email?.length">
                <span
                    v-for="error in errors.email"
                    :key="error"
                    class="text-red-500 text-xs italic"
                >
                    {{ error }}
                </span>
            </template>
            <label for="email" class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input 
            type="password" 
            name="password" 
            id="password" 
            v-model="form.password"
            class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" "  />
             <template v-if="errors.password?.length">
                <span
                    v-for="error in errors.password"
                    :key="error"
                    class="text-red-500 text-xs italic"
                >
                    {{ error }}
                </span>
            </template>
            
            <label 
            for="password" 
            class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input 
            type="password" 
            name="repeat_password" 
            id="password_confirmation" 
            v-model="form.password_confirmation"
            class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" "  />
            <label 
            for="password_confirmation" 
            class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Confirm password</label>
        </div>
        <!-- <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                <label for="floating_first_name" class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">First name</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                <label for="floating_last_name" class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Last name</label>
            </div>
        </div> -->
<!--         
            <div class="relative z-0 w-full mb-5 group">
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                <label for="floating_phone" class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone number</label>
            </div> -->
            
       
        <button type="submit" class="inline-block w-40 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Register</button>
        <RouterLink to="/login" class="inline-block  m-2 w-40 text-white text-center bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cancel</RouterLink>
        </form>

    </div>
        
   </div>

</div>       

</template>