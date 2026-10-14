import { computed, ref } from 'vue'
import { data, saveData } from '../data'

export const search = ref('')
export const showForm = ref(false)
export const editingVenueId = ref(null)
export const venueForm = ref({})

export const venues = computed(() => data.venues.filter((venue) =>
	venue.name.toLowerCase().includes(search.value.toLowerCase()),
))

export function openAddForm() {
	editingVenueId.value = null
	venueForm.value = { name: '', location: '', capacity: 1, type: 'Auditorium', status: 'Available' }
	showForm.value = true
}

export function openEditForm(venue) {
	editingVenueId.value = venue.id
	venueForm.value = { ...venue }
	showForm.value = true
}

export function saveVenue() {
	if (editingVenueId.value === null) {
		data.venues.push({ id: Date.now(), ...venueForm.value, capacity: Number(venueForm.value.capacity) })
	} else {
		const index = data.venues.findIndex((venue) => venue.id === editingVenueId.value)
		data.venues[index] = { ...venueForm.value, id: editingVenueId.value, capacity: Number(venueForm.value.capacity) }
	}

	saveData()
	showForm.value = false
}

export function deleteVenue(id) {
	if (!window.confirm('Delete this venue?')) return
	data.venues = data.venues.filter((venue) => venue.id !== id)
	saveData()
}

export { data }