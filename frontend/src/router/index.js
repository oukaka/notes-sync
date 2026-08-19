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

export default router