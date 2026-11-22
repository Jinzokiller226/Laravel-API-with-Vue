<script setup lang="ts">
import axiosInstance from '@/lib/axios';
import { computed } from '@vue/reactivity';
import { isAxiosError } from 'axios';
import {  ref,onMounted } from 'vue';
import { rolesService } from '@/services/roleService';
import type { Roles, RolesPayload } from '@/types/roles';


interface Role {
  id: number
  role_name: string
  role_description: string
  is_admin: boolean
  is_employee: boolean
  role_data: string
  created_by: number
}
const isFormValid = computed(() => {
  return roles.value.some((role) => role.role_name) && roles.value.some((role) => role.role_description) && roles.value.some((role) => role.role_data);
});


const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const roles = ref<Role[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const showModal = ref(false);
function openAddRolesModal() {
 
  showModal.value = true;
}

// Form data for adding a new role
 const form  = ref<RolesPayload> ({
  role_name: '',
  role_description: '',
  role_data: '',
 });


 // Handle Submission of Role
    const handleCreate = async () => {
      try {
        console.log('Form data:', form.value);
        await rolesService.create(form.value);
        // Reset the form after successful submission
        form.value = {
          role_name: '',
          role_description: '',
          role_data: '',
        };
        closeModal();
        fetchRoles(); // Refresh the roles list after adding a new role
      } catch (error) {
        console.error('Error creating role:', error);
      }
    };
 //

function closeModal() {
  showModal.value = false;
}
const fetchRoles = async () => {
  // try {
  //   const response = await axiosInstance.get<Role[]>('/roles')
  //   roles.value = response.data
  // } catch (err) {
  //   error.value = err instanceof Error ? err.message : 'Failed to parse JSON'
  // } finally {``
  //   loading.value = false
  // }
  try {
    const response = await rolesService.getAll();
    roles.value = response.data.map((role: Roles) => ({
      ...role,
      role_name: role.role_name,
      role_description: role.role_description,
      is_admin: false,
      is_employee: false,
      created_by: 0,
    }));
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch roles';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchRoles()
})


</script>


<template>
    
      <div class="pt-8 min-h-screen border-2 border-default border-dashed rounded-base">

      <div class="content-center justify-center px-6 py-2 ">
            <div class="w-xs flex justify-left content-left  border  border-slate-400 shadow-md rounded-xl h-18 p-6 mx-4 bg-slate-200 ">
                <h1 class="flex-none mx-2 font-bold">Roles Management </h1>
                <button type="button" @click="openAddRolesModal" class="inline-flex self-center items-center justify-center  text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-8 h-8 focus:outline-none">
                    <svg class="w-6 h-6 text-white-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                </button>
            </div>
            
        </div>

      <div class="flex content-center justify-center p-6">
       <!-- <p v-if="loading">Loading data...</p> -->
                <div  v-if="loading"  class="max-w-screen w-screen p-4 border border-default divide-y divide-default rounded-base shadow-xs animate-pulse md:p-6">
                        <div class="flex items-center justify-between pb-4">
                            <div>
                                <div class="h-2.5 bg-neutral-quaternary rounded-full w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-neutral-quaternary rounded-full"></div>
                            </div>
                            <div class="h-2.5 bg-default rounded-full w-12"></div>
                        </div>
                        <div class="flex items-center justify-between py-4">
                            <div>
                                <div class="h-2.5 bg-neutral-quaternary rounded-full w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-neutral-quaternary rounded-full"></div>
                            </div>
                            <div class="h-2.5 bg-default rounded-full w-12"></div>
                        </div>
                        <div class="flex items-center justify-between py-4">
                            <div>
                                <div class="h-2.5 bg-neutral-quaternary rounded-full w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-neutral-quaternary rounded-full"></div>
                            </div>
                            <div class="h-2.5 bg-default rounded-full w-12"></div>
                        </div>
                        <div class="flex items-center justify-between py-4">
                            <div>
                                <div class="h-2.5 bg-neutral-quaternary rounded-full w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-neutral-quaternary rounded-full"></div>
                            </div>
                            <div class="h-2.5 bg-default rounded-full w-12"></div>
                        </div>
                        <div class="flex items-center justify-between py-4">
                            <div>
                                <div class="h-2.5 bg-neutral-quaternary rounded-full w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-neutral-quaternary rounded-full"></div>
                            </div>
                            <div class="h-2.5 bg-default rounded-full w-12"></div>
                        </div>
                        <span class="sr-only">Loading...</span>
                    </div>
         <p v-else-if="error" style="color: red;">{{ error }}</p>

            <div v-else class="relative w-full overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4">
                            <!-- Dropdown menu -->
                            <!-- <div>
                            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="inline-flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none" type="button">
                                Action
                                <svg class="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                            </button>
                        
                            <div id="dropdown" class="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-32">
                                <ul class="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Reward</a>
                                </li>
                                <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Promote</a>
                                </li>
                                <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Archive</a>
                                </li>
                                <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 text-fg-danger hover:bg-neutral-tertiary-medium rounded">Delete</a>
                                </li>
                                </ul>
                            </div>
                            </div> -->
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
                                        Role Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 font-medium">
                                        Description
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
                                <tr v-for="role in roles" :key="role.id" class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                                   
                                    <th scope="row" class="flex items-center px-6 py-4 text-heading whitespace-nowrap">
                                        
                                        <div class="ps-3">
                                            <div class="text-base font-semibold">{{ role.role_name }}</div>
                                            <!-- <div class="font-normal text-body">{{ role.role_description }}</div> -->
                                        </div>  
                                    </th>
                                    <td class="px-6 py-4">
                                        <!-- React Developer -->  {{ role.role_description }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div v-if="role.role_data === 'active'" class="h-2.5 w-2.5 rounded-full bg-success me-2"></div>
                                            <div v-else class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                                            {{ role.role_data === 'active' ? 'Online' : 'Inactive' }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#"  class="font-medium text-fg-brand hover:underline">Edit role</a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
            

            

          </div>
      </div>
  
  <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center">

        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/50 transition-opacity"
          @click="closeModal">
        </div>

        <!-- Modal Content -->
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 z-10">

          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-5">
            <div>
              <h3 class="text-lg font-bold text-gray-900">Add Role</h3>
           
            </div>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 rounded-lg p-1.5 hover:bg-gray-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          
          <div class="space-y-4">

            <!-- Date (read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
              <input
              v-model="form.role_name"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role Description</label>
              <input
              v-model="form.role_description"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 text-sm" />
            </div>
             <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role Status</label>
              <select
                v-model="form.role_data"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>Select Status</option>
                <option v-for="slot in statusOptions" :key="slot.value" :value="slot.value">
                  {{ slot.label }}

                </option>
                 
               
              </select>

              <div class="flex justify-end gap-3 mt-6">
                  <button
                    @click="closeModal"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    @click="handleCreate"
                    :disabled="!isFormValid"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    Save Role
                  </button>
            </div>
            </div>
         
            <!-- Time Dropdown -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select
                v-model="scheduleForm.time"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>Select time</option>
                <option v-for="slot in timeSlots" :key="slot" :value="slot">
                  {{ slot }}
                </option>
              </select>
            </div> -->

            <!-- Doctor Dropdown -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                v-model="scheduleForm.doctor"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>Select doctor</option>
                <option v-for="doc in doctors" :key="doc.id" :value="doc.name">
                  {{ doc.name }}
                </option>
              </select>
            </div> -->

            <!-- Branch Dropdown -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <select
                v-model="scheduleForm.branch"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>Select branch</option>
                <option v-for="b in branches" :key="b.id" :value="b.name">
                  {{ b.name }}
                </option>
              </select>
            </div>

          </div> -->

          <!-- Modal Footer -->
          <!-- <div class="flex justify-end gap-3 mt-6">
            <button
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button
              @click="submitSchedule"
              :disabled="!isFormValid"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Save Schedule
            </button> -->
          </div> 

        </div>
      </div>
    </Teleport>
</template>