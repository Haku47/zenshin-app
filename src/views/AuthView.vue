<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-12 transition-colors duration-500">
    <router-link 
      to="/" 
      class="absolute top-8 left-8 btn btn-ghost btn-sm font-black gap-3 opacity-40 hover:opacity-100 transition-all rounded-xl"
    >
      <i class="fa-solid fa-chevron-left text-[10px]"></i> 
      <span class="tracking-[0.2em] text-[10px] uppercase">Landing Page</span>
    </router-link>

    <div class="w-full max-w-[440px] animate-fade-in">
      <div class="zenshin-glass rounded-[3rem] shadow-2xl p-8 md:p-14 border-none relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

        <div class="text-center mb-12 relative">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-[2rem] shadow-2xl shadow-primary/30 mb-6 rotate-3">
            <span class="text-primary-content text-4xl font-black">前</span>
          </div>
          <h2 class="text-3xl font-black tracking-tighter uppercase leading-none">
            {{ isLogin ? 'System Login' : 'Initial Setup' }}
          </h2>
          <p class="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] mt-3">
            Zenshin Core Environment
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <Transition name="slide-up">
            <div v-if="!isLogin" class="form-control">
              <label class="label pt-0">
                <span class="label-text font-black opacity-50 uppercase text-[10px] tracking-widest">Full Identity</span>
              </label>
              <div class="relative">
                <i class="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 opacity-20"></i>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="Your Full Name" 
                  class="input input-bordered w-full pl-12 font-bold bg-base-100/30 border-none focus:ring-4 focus:ring-primary/10 rounded-2xl h-14" 
                  required 
                />
              </div>
            </div>
          </Transition>

          <div class="form-control">
            <label class="label pt-0">
              <span class="label-text font-black opacity-50 uppercase text-[10px] tracking-widest">Core Mail</span>
            </label>
            <div class="relative">
              <i class="fa-solid fa-at absolute left-4 top-1/2 -translate-y-1/2 opacity-20"></i>
              <input 
                v-model="form.email" 
                type="email" 
                placeholder="name@domain.com" 
                class="input input-bordered w-full pl-12 font-bold bg-base-100/30 border-none focus:ring-4 focus:ring-primary/10 rounded-2xl h-14" 
                required 
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label pt-0">
              <span class="label-text font-black opacity-50 uppercase text-[10px] tracking-widest">Access Key</span>
            </label>
            <div class="relative">
              <i class="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 opacity-20"></i>
              <input 
                v-model="form.password" 
                type="password" 
                placeholder="••••••••" 
                class="input input-bordered w-full pl-12 font-bold bg-base-100/30 border-none focus:ring-4 focus:ring-primary/10 rounded-2xl h-14" 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-full rounded-2xl font-black shadow-2xl shadow-primary/20 border-none mt-4 h-14 tracking-widest group"
            :disabled="authStore.loading"
          >
            <span v-if="authStore.loading" class="loading loading-spinner"></span>
            <div v-else class="flex items-center gap-2">
              {{ isLogin ? 'AUTHORIZE ACCESS' : 'INITIALIZE SYSTEM' }}
              <i class="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </div>
          </button>
        </form>

        <div class="text-center mt-10">
          <p class="text-[10px] font-black opacity-30 uppercase tracking-widest mb-3">
            {{ isLogin ? "New to Zenshin?" : "Existing Environment?" }}
          </p>
          <button 
            @click="isLogin = !isLogin" 
            class="text-primary font-black text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
          >
            {{ isLogin ? 'Create Key' : 'Sign In Now' }}
          </button>
        </div>
      </div>

      <div class="mt-12 text-center">
        <div class="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-base-content/5 opacity-20">
          <i class="fa-solid fa-fingerprint text-[10px]"></i>
          <p class="text-[9px] font-black uppercase tracking-[0.4em]">Zenshin Core • Encrypted Local Session</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const form = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = async () => {
  let success = false
  if (isLogin.value) {
    success = await authStore.login(form.email, form.password)
  } else {
    success = await authStore.register(form.name, form.email, form.password)
  }

  if (success) {
    // Navigasi ke Internal Dashboard setelah sukses
    router.push({ name: 'Dashboard' })
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Transisi Form: Slide Up Effect */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
</style>