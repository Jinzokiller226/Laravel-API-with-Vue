<script setup lang="ts">
import { inject, ref, computed, reactive } from 'vue';

interface UserState {
  name: string;
  email: string;
}

interface CalendarEvent {
  date: string;
  title: string;
  color: string;
}

interface ScheduleForm {
  date: string;
  time: string;
  doctor: string;
  branch: string;
}

const user = inject('currentUser', ref<UserState>({ name: '', email: '' }));

const currentDate = ref(new Date());

const weekdays = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

// Sample Events
const events = ref<CalendarEvent[]>([
  { date: '2026-11-02', title: 'Dr. Aries Cruz', color: 'bg-blue-100 text-blue-700' },
  { date: '2026-11-03', title: 'Dr. Pya Reyes', color: 'bg-green-100 text-green-700' },
  { date: '2026-11-05', title: 'Dr. Marco Rivera', color: 'bg-orange-100 text-orange-700' },
  { date: '2026-11-07', title: 'Dr. Lena Santos', color: 'bg-purple-100 text-purple-700' },
  { date: '2026-11-10', title: 'Dr. Aries Cruz', color: 'bg-blue-100 text-blue-700' },
  { date: '2026-11-10', title: 'Dr. Sofia Tan', color: 'bg-pink-100 text-pink-700' },
  { date: '2026-11-12', title: 'Dr. Pya Reyes', color: 'bg-green-100 text-green-700' },
  { date: '2026-11-14', title: 'Dr. Carlos Diaz', color: 'bg-yellow-100 text-yellow-700' },
  { date: '2026-11-17', title: 'Dr. Marco Rivera', color: 'bg-orange-100 text-orange-700' },
  { date: '2026-11-18', title: 'Dr. Lena Santos', color: 'bg-purple-100 text-purple-700' },
  { date: '2026-11-20', title: 'Dr. Aries Cruz', color: 'bg-blue-100 text-blue-700' },
  { date: '2026-11-20', title: 'Dr. Pya Reyes', color: 'bg-green-100 text-green-700' },
  { date: '2026-11-21', title: 'Dr. Sofia Tan', color: 'bg-pink-100 text-pink-700' },
  { date: '2026-11-24', title: 'Dr. Carlos Diaz', color: 'bg-yellow-100 text-yellow-700' },
  { date: '2026-11-25', title: 'Dr. Marco Rivera', color: 'bg-orange-100 text-orange-700' },
  { date: '2026-11-26', title: 'Dr. Aries Cruz', color: 'bg-blue-100 text-blue-700' },
  { date: '2026-11-28', title: 'Dr. Lena Santos', color: 'bg-purple-100 text-purple-700' },
]);

// Dropdown options
const doctors = [
  { id: 1, name: 'Doc Aries' },
  { id: 2, name: 'Doc Pya' },
  { id: 3, name: 'Doc Rivera' },
  { id: 4, name: 'Doc Santos' }
];

const branches = [
  { id: 1, name: 'Main Branch' },
  { id: 2, name: 'North Branch' },
  { id: 3, name: 'South Branch' }
];

const timeSlots = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM'
];

// Modal state
const showModal = ref(false);
const scheduleForm = reactive<ScheduleForm>({
  date: '',
  time: '',
  doctor: '',
  branch: ''
});

function openScheduleModal(day: number) {
  const year = currentDate.value.getFullYear();
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0');
  const date = String(day).padStart(2, '0');
  scheduleForm.date = `${year}-${month}-${date}`;
  scheduleForm.time = '';
  scheduleForm.doctor = '';
  scheduleForm.branch = '';
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function submitSchedule() {
  const selectedDoctor = doctors.find((d) => d.name === scheduleForm.doctor);
  const colorMap: Record<string, string> = {
    'Doc Aries': 'bg-blue-100 text-blue-700',
    'Doc Pya': 'bg-green-100 text-green-700',
    'Doc Rivera': 'bg-orange-100 text-orange-700',
    'Doc Santos': 'bg-purple-100 text-purple-700'
  };

  events.value.push({
    date: scheduleForm.date,
    title: scheduleForm.doctor,
    color: colorMap[scheduleForm.doctor] || 'bg-gray-100 text-gray-700'
  });

  showModal.value = false;
}

// Display selected date for modal header
const formattedSelectedDate = computed(() => {
  if (!scheduleForm.date) return '';
  const d = new Date(scheduleForm.date + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Display Month Year
const monthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
});

// Generate Calendar Days
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
});

// Previous / Next Month
function changeMonth(value: number) {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + value,
    1
  );
}

// Today
function goToday() {
  currentDate.value = new Date();
}

// Check Today's Date
function isToday(day: number) {
  const today = new Date();
  return (
    day === today.getDate() &&
    currentDate.value.getMonth() === today.getMonth() &&
    currentDate.value.getFullYear() === today.getFullYear()
  );
}

// Get Events for Selected Date
function getEvents(day: number) {
  const year = currentDate.value.getFullYear();
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0');
  const date = String(day).padStart(2, '0');
  const dateKey = `${year}-${month}-${date}`;
  return events.value.filter((event) => event.date === dateKey);
}

// Check if form is valid
const isFormValid = computed(() => {
  return scheduleForm.time && scheduleForm.doctor && scheduleForm.branch;
});
</script>

<template>
  <div class="pt-8 min-h-screen border-2 border-default border-dashed rounded-base">
    <h2 class="text-4xl p-4 font-bold">Schedule Board --- {{ user.name }}</h2>

    <!-- Calendar -->
    <div class="p-4">
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

        <!-- Calendar Header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-3">
            <button
              @click="changeMonth(-1)"
              class="border rounded-lg px-3 py-2 hover:bg-gray-100">
              &larr;
            </button>

            <h3 class="text-xl font-bold min-w-44 text-center">
              {{ monthYear }}
            </h3>

            <button
              @click="changeMonth(1)"
              class="border rounded-lg px-3 py-2 hover:bg-gray-100">
              &rarr;
            </button>
          </div>

          <button
            @click="goToday"
            class="border rounded-lg px-4 py-2 text-sm hover:bg-gray-100">
            Today
          </button>
        </div>

        <!-- Weekdays -->
        <div class="grid grid-cols-7 border-b text-center text-sm font-semibold text-gray-500">
          <div
            v-for="day in weekdays"
            :key="day"
            class="py-3">
            {{ day }}
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="min-h-28 border-b border-r p-2 transition-colors"
            :class="[
              day ? 'hover:bg-blue-50 cursor-pointer' : 'bg-gray-50'
            ]"
            @click="day ? openScheduleModal(day) : null">

            <template v-if="day">
              <!-- Date Number -->
              <span
                class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm"
                :class="isToday(day)
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-gray-700'">
                {{ day }}
              </span>

              <!-- Events -->
              <div class="space-y-1 mt-2">
                <div
                  v-for="(event, eventIndex) in getEvents(day)"
                  :key="eventIndex"
                  class="text-xs rounded-md px-2 py-1 truncate"
                  :class="event.color">
                  {{ event.title }}
                </div>
              </div>
            </template>

          </div>
        </div>

      </div>
    </div>

    <!-- Schedule Modal -->
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
              <h3 class="text-lg font-bold text-gray-900">Schedule Appointment</h3>
              <p class="text-sm text-gray-500 mt-0.5">{{ formattedSelectedDate }}</p>
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
              <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                v-model="scheduleForm.date"
                readonly
                class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 text-sm" />
            </div>

            <!-- Time Dropdown -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select
                v-model="scheduleForm.time"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>Select time</option>
                <option v-for="slot in timeSlots" :key="slot" :value="slot">
                  {{ slot }}
                </option>
              </select>
            </div>

            <!-- Doctor Dropdown -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                v-model="scheduleForm.doctor"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>Select doctor</option>
                <option v-for="doc in doctors" :key="doc.id" :value="doc.name">
                  {{ doc.name }}
                </option>
              </select>
            </div>

            <!-- Branch Dropdown -->
            <div>
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

          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end gap-3 mt-6">
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
            </button>
          </div>

        </div>
      </div>
    </Teleport>

  </div>
</template>