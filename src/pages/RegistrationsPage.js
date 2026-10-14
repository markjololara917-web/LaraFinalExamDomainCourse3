import { computed, ref } from 'vue'
import { data, saveData } from '../data'

export const search = ref('')
export const showForm = ref(false)
export const editingRegistrationId = ref(null)
export const registrationForm = ref({})

export const registrations = computed(() => data.registrations.filter((registration) =>
	registration.participant.toLowerCase().includes(search.value.toLowerCase())
	|| registration.event.toLowerCase().includes(search.value.toLowerCase()),
))

export function openAddForm() {
	editingRegistrationId.value = null
	registrationForm.value = {
		participant: '', event: '', date: new Date().toISOString().slice(0, 10),
		status: 'Confirmed', payment: 'No fee',
	}
	showForm.value = true
}

export function openEditForm(registration) {
	editingRegistrationId.value = registration.id
	registrationForm.value = { ...registration }
	showForm.value = true
}

export function saveRegistration() {
	if (editingRegistrationId.value === null) {
		data.registrations.push({ id: Date.now(), ...registrationForm.value })
	} else {
		const index = data.registrations.findIndex((registration) => registration.id === editingRegistrationId.value)
		data.registrations[index] = { ...registrationForm.value, id: editingRegistrationId.value }
	}

	saveData()
	showForm.value = false
}

export function deleteRegistration(id) {
	if (!window.confirm('Delete this registration?')) return
	data.registrations = data.registrations.filter((registration) => registration.id !== id)
	saveData()
}

export { data }