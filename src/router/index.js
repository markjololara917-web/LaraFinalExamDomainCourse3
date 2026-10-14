import { createRouter, createWebHistory } from 'vue-router'
import OverviewPage from '../pages/OverviewPage.vue'
import EventsPage from '../pages/EventsPage.vue'
import VenuesPage from '../pages/VenuesPage.vue'
import RegistrationsPage from '../pages/RegistrationsPage.vue'
import ParticipantsPage from '../pages/ParticipantsPage.vue'
import OrganizersPage from '../pages/OrganizersPage.vue'

const routes = [
  { path: '/', redirect: '/overview' },
  { path: '/overview', component: OverviewPage, meta: { title: 'Overview' } },
  { path: '/events', component: EventsPage, meta: { title: 'Events' } },
  { path: '/venues', component: VenuesPage, meta: { title: 'Venues' } },
  { path: '/registrations', component: RegistrationsPage, meta: { title: 'Registrations' } },
  { path: '/participants', component: ParticipantsPage, meta: { title: 'Participants' } },
  { path: '/organizers', component: OrganizersPage, meta: { title: 'Organizers' } },
  { path: '/:pathMatch(.*)*', redirect: '/overview' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router