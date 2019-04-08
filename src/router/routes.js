export default [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/Rank.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/Singer.vue'),
    children: [
      {
        path: ':id',
        name: 'singer_detail',
        component: () => import('@/views/Singer_Detail.vue')
      }
    ]
  }
]
