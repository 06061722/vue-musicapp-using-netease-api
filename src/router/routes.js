export default [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend.vue'),
    children: [
      {
        path: ':id',
        name: 'disc',
        component: () => import('@/views/Disc.vue')
      }
    ]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/Rank.vue'),
    children: [
      {
        path: ':id',
        name: 'rankDetail',
        component: () => import('@/views/Rank_Detail.vue')
      }
    ]
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
