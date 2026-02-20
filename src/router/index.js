import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

// Public Views
const Landing = () => import('@/views/LandingView.vue')
const Auth = () => import('@/views/AuthView.vue')
const Privacy = () => import('@/views/PrivacyView.vue')
const Terms = () => import('@/views/TermsView.vue')

// Internal Views
const Dashboard = () => import('@/views/Dashboard.vue')
const Tasks = () => import('@/views/TasksView.vue')
const Schedule = () => import('@/views/ScheduleView.vue')
const Settings = () => import('@/views/SettingsView.vue')

const routes = [
  // --- PUBLIC ROUTES ---
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { title: 'Welcome | Zenshin Core' }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { title: 'Authorize Access | Zenshin', guestOnly: true }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
    meta: { title: 'Privacy Policy | Zenshin' }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
    meta: { title: 'Terms of Access | Zenshin' }
  },
  {
    path: '/security-audit',
    name: 'SecurityAudit',
    component: () => import('@/views/SecurityAuditView.vue'),
    meta: { title: 'Security Audit | Zenshin' }
  },
  {
    path: '/changelog',
    name: 'Changelog',
    component: () => import('@/views/ChangelogView.vue'),
    meta: { title: 'System Changelog | Zenshin' }
  },

  // --- INTERNAL ROUTES (Protected) ---
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'Overview | Zenshin Core', requiresAuth: true }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: { title: 'My Tasks | Zenshin Core', requiresAuth: true }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { title: 'Academic Schedule | Zenshin', requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { title: 'Configuration | Zenshin', requiresAuth: true }
  },

  // --- 404 REDIRECT ---
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLoggedIn

  // Set Browser Title
  document.title = to.meta.title || 'Zenshin Core'

  // Proteksi Internal: Harus Login
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Auth' })
  } 
  
  // Proteksi Auth: Jika sudah login, dilarang balik ke Login/Register
  else if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'Dashboard' })
  } 
  
  // Izinkan yang lain (Landing, Privacy, Terms)
  else {
    next()
  }
})

export default router