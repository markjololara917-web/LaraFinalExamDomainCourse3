import { computed, ref } from 'vue'
import { data, saveData } from '../data'

export const search = ref('')
export const showForm = ref(false)
export const editingEventId = ref(null)
export const eventForm = ref({})

export const events = computed(() => data.events.filter((event) =>
	event.title.toLowerCase().includes(search.value.toLowerCase()),
))

export function openAddForm() {
	editingEventId.value = null
	eventForm.value = {
		title: '', date: '', time: '', venue: '', organizer: '',
		category: 'Campus life', capacity: 1, status: 'Upcoming',
	}
	showForm.value = true
}

export function openEditForm(event) {
	editingEventId.value = event.id
	eventForm.value = { ...event }
	showForm.value = true
}

export function saveEvent() {
	if (editingEventId.value === null) {
		data.events.push({ id: Date.now(), ...eventForm.value, capacity: Number(eventForm.value.capacity) })
	} else {
		const index = data.events.findIndex((event) => event.id === editingEventId.value)
		data.events[index] = { ...eventForm.value, id: editingEventId.value, capacity: Number(eventForm.value.capacity) }
	}

	saveData()
	showForm.value = false
}

export function deleteEvent(id) {
	if (!window.confirm('Delete this event?')) return
	data.events = data.events.filter((event) => event.id !== id)
	saveData()
}

export { data }