import { computed, ref } from 'vue'
import { data, saveData } from '../data'

export const search = ref('')
export const showForm = ref(false)
export const editingParticipantId = ref(null)
export const participantForm = ref({})

export const participants = computed(() => data.participants.filter((participant) =>
	participant.name.toLowerCase().includes(search.value.toLowerCase()),
))

export function openAddForm() {
	editingParticipantId.value = null
	participantForm.value = { name: '', email: '', course: '', year: '1st year' }
	showForm.value = true
}

export function openEditForm(participant) {
	editingParticipantId.value = participant.id
	participantForm.value = { ...participant }
	showForm.value = true
}

export function saveParticipant() {
	if (editingParticipantId.value === null) {
		data.participants.push({ id: Date.now(), ...participantForm.value })
	} else {
		const index = data.participants.findIndex((participant) => participant.id === editingParticipantId.value)
		data.participants[index] = { ...participantForm.value, id: editingParticipantId.value }
	}

	saveData()
	showForm.value = false
}

export function deleteParticipant(id) {
	if (!window.confirm('Delete this participant?')) return
	data.participants = data.participants.filter((participant) => participant.id !== id)
	saveData()
}

export { data }