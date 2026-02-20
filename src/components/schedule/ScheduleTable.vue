<template>
  <div class="card bg-base-200 shadow-xl overflow-hidden border border-base-content/5">
    <div class="card-body p-0">
      <div class="bg-primary/10 px-6 py-4 flex justify-between items-center border-b border-primary/10">
        <h3 class="font-bold text-lg flex items-center gap-2 font-sans">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Jadwal Harian
        </h3>
        <div class="badge badge-primary font-mono text-xs tracking-tighter">Zenshin</div>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full border-separate border-spacing-0">
          <thead>
            <tr class="bg-base-300/30">
              <th class="py-4 px-6 text-xs uppercase opacity-50 font-sans">Waktu</th>
              <th class="py-4 px-6 text-xs uppercase opacity-50 font-sans">Jadwal Harian</th>
              <th class="py-4 px-6 text-xs uppercase opacity-50 font-sans text-center">Ruang</th>
              <th class="py-4 px-6 text-xs uppercase opacity-50 font-sans text-right">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-content/5">
            <tr 
              v-for="(item, index) in schedules" 
              :key="index"
              class="hover:bg-primary/5 transition-colors group"
            >
              <td class="py-4 px-6">
                <div class="flex flex-col">
                  <span class="font-mono font-bold text-sm text-primary">{{ item.timeStart }}</span>
                  <span class="font-mono text-[10px] opacity-40">{{ item.timeEnd }}</span>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex flex-col">
                  <span class="font-bold text-sm group-hover:text-primary transition-colors">{{ item.subject }}</span>
                  <span class="text-[10px] opacity-50 uppercase tracking-wide">{{ item.lecturer }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-center">
                <div class="badge badge-ghost font-mono text-xs py-3 border-base-content/10">
                  {{ item.room }}
                </div>
              </td>
              <td class="py-4 px-6 text-right">
                <div :class="['badge badge-xs', item.active ? 'badge-primary' : 'badge-ghost opacity-20']"></div>
              </td>
            </tr>

            <tr v-if="schedules.length === 0">
              <td colspan="4" class="text-center py-10 opacity-40 italic text-sm">
                Tidak ada jadwal untuk hari ini. Oyasumi! 🌙
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props agar data jadwal bisa dikirim dari Dashboard atau ScheduleView
defineProps({
  schedules: {
    type: Array,
    default: () => [
      {
        timeStart: '07:30',
        timeEnd: '09:10',
        subject: 'Pemrograman Web',
        lecturer: 'Dr. Tech Enthusiast',
        room: 'D.2.1',
        active: true
      },
      {
        timeStart: '10:00',
        timeEnd: '12:30',
        subject: 'Basis Data Lanjut',
        lecturer: 'Prof. Data Master',
        room: 'Lab-3',
        active: false
      }
    ]
  }
})
</script>

<style scoped>
/* Membuat tabel terlihat lebih tajam dengan font Inter */
.table th {
  @apply bg-transparent;
}

.table td {
  @apply transition-all duration-200;
}

/* Garis halus di bagian bawah baris terakhir */
tbody tr:last-child {
  border-bottom: none;
}
</style>