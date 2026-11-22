<script setup lang="ts">
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import {  ref,onMounted } from 'vue';


interface User {
  id: number
  name: string
  email: string
  
}

const users = ref<User[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get<User[]>('/users')
    users.value = response.data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to parse JSON'
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchUsers()
})
</script>

<template>
    
      <div class="pt-8 min-h-screen border-2 border-default border-dashed rounded-base">
        
      <div class="content-center justify-center px-6 py-2 ">
            <div class="w-xs flex justify-left content-left  border  border-slate-400 shadow-md rounded-xl h-18 p-6 mx-4 bg-slate-200 ">
                <h1 class="flex-none mx-2 font-bold">Users Management </h1>
                <button type="button" class="inline-flex self-center items-center justify-center  text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-8 h-8 focus:outline-none">
                    <svg class="w-6 h-6 text-white-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                </button>
            </div>
            
        </div>

      <div class="flex content-center justify-center p-10">
          <p v-if="loading">Loading data...</p>
         <p v-else-if="error" style="color: red;">{{ error }}</p>

                     <div v-else class="relative w-full overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4">
                            
                            <label for="input-group-1" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                                </div>
                                <input type="text" id="input-group-1" class="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search">
                            </div>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-body">
                            <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
                                <tr>
                                    
                                    <th scope="col" class="px-6 py-3 font-medium">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 font-medium">
                                        Position
                                    </th>
                                    <th scope="col" class="px-6 py-3 font-medium">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3 font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id" class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                                   
                                    <th scope="row" class="flex items-center px-6 py-4 text-heading whitespace-nowrap">
                                        <img class="w-10 h-10 rounded-full" src="" alt="Jese image">
                                        <div class="ps-3">
                                            <div class="text-base font-semibold">{{user.name}}</div>
                                            <div class="font-normal text-body">{{user.email}}</div>
                                        </div>  
                                    </th>
                                    <td class="px-6 py-4">
                                        React Developer
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="h-2.5 w-2.5 rounded-full bg-success me-2"></div> Online
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-fg-brand hover:underline">Edit user</a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
            

          </div>
      </div>
  
</template>