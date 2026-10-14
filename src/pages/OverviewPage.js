import { computed } from 'vue'
import { data } from '../data'

export const confirmedCount = computed(() =>
	data.registrations.filter((registration) => registration.status === 'Confirmed').length,
)

export const upcomingEvents = computed(() =>
	[...data.events].sort((first, second) => first.date.localeCompare(second.date)).slice(0, 3),
)

export const recentRegistrations = computed(() => [...data.registrations].slice(-4).reverse())

export const availableVenues = computed(() =>
	data.venues.filter((venue) => venue.status === 'Available').length,
)

export { data }