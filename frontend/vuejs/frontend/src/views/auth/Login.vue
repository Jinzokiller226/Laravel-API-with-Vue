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
       
        <div class="w-full  max-w-sm bg-gradient-to-t from-white via-blue-200 to-blue-300  p-6  shadow-xs">
             <h1 class="w-full text-xl font-bold text-heading grid content-center justify-center p-2 ">Login</h1>
            <FormKit  type="form" submit-label="Login" @submit="login">
                <FormKit  type="email" label="Email" name="email" />
                <FormKit type="password" label="Password" name="password" prefix-icon="password"  suffix-icon="eyeClosed" @suffix-icon-click="handleIconClick" />
                

            </FormKit>
             <!-- <form @submit.prevent="login(form)">
                    <h5 class="text-xl text-center  font-bold text-heading mb-6">Login</h5>
                    <div class="mb-4">
                        <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Your email</label>
                        <input 
                        v-model="form.email"
                        type="email" 
                        id="email" 
                        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="example@company.com" required />
                    
                    </div>
                    <template v-if="errors.email?.length">
                    <span
                        v-for="error in errors.email"
                        :key="error"
                        class="text-red-500 text-xs italic"
                    >
                        {{ error }}
                    </span>
                </template>

                    <div>
                        <label for="password" class="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                        <input 
                        v-model="form.password"
                        type="password" 
                        id="password" 
                        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="•••••••••" required />
                    </div>

                    <template v-if="errors.email?.length">
                    <span
                        v-for="error in errors.email"
                        :key="error"
                        class="text-red-500 text-xs italic"
                    >
                        {{ error }}
                    </span>
                </template>

                    <div class="flex items-start my-6">
                        <div class="flex items-center">
                            <input id="checkbox-remember" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft">
                            <label for="checkbox-remember" class="ms-2 text-sm font-medium text-heading">Remember me</label>
                        </div>
                        <a href="#" class="pl-3 ms-auto text-sm font-medium text-fg-brand hover:underline">Lost Password?</a>
                    </div>
                    <div class="flex items-start my-6 ">
                        <button type="submit" class="login">Login to your account</button>

                    </div>
                    <div class="text-sm font-medium text-body">Not registered? <RouterLink class="text-fg-brand hover:underline" to="/register">Create account</RouterLink></div>
            </form> -->
        </div>
    </div>
</div>
</template>