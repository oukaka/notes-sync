import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('../views/NotesView.vue'),
    },
    {
      path: '/',
      redirect: '/notes',
    },
    {
    path: '/notes/:id',
    name: 'note-edit',
    component: () => import('../views/NoteEditView.vue'),
  },
  {
    path: '/files',
    name: 'files',
    component: () => import('../views/FilesView.vue'),
  },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isPublic = to.path === '/login'

  if (!token && !isPublic) {
    next('/login')
  } else if (token && to.path === '/login') {
    next('/notes')
  } else {
    next()
  }
})

export default router