import { computed, ref } from 'vue'
import { data, saveData } from '../data'

export const search = ref('')
export const showForm = ref(false)
export const editingOrganizerId = ref(null)
export const organizerForm = ref({})

export const organizers = computed(() => data.organizers.filter((organizer) =>
	organizer.name.toLowerCase().includes(search.value.toLowerCase()),
))

export function openAddForm() {
	editingOrganizerId.value = null
	organizerForm.value = { name: '', email: '', department: '', phone: '' }
	showForm.value = true
}

export function openEditForm(organizer) {
	editingOrganizerId.value = organizer.id
	organizerForm.value = { ...organizer }
	showForm.value = true
}

export function saveOrganizer() {
	if (editingOrganizerId.value === null) {
		data.organizers.push({ id: Date.now(), ...organizerForm.value })
	} else {
		const index = data.organizers.findIndex((organizer) => organizer.id === editingOrganizerId.value)
		data.organizers[index] = { ...organizerForm.value, id: editingOrganizerId.value }
	}

	saveData()
	showForm.value = false
}

export function deleteOrganizer(id) {
	if (!window.confirm('Delete this organizer?')) return
	data.organizers = data.organizers.filter((organizer) => organizer.id !== id)
	saveData()
}

export { data }