<script setup>
import { data, deleteParticipant, editingParticipantId, openAddForm, openEditForm, participantForm, participants, saveParticipant, search, showForm } from './ParticipantsPage.js'
</script>

<template>
	<section class="page-content management-page">
		<div class="management-heading">
			<div><div class="eyebrow">CAMPUS CONNECT / PARTICIPANTS</div><h1>Participants</h1><p class="page-intro">A clear view of the students taking part.</p></div>
			<button class="primary-button" @click="openAddForm"><span>＋</span> Add participant</button>
		</div>
		<section class="panel table-panel">
			<div class="table-toolbar"><div class="result-count"><strong>{{ participants.length }}</strong> participants</div><label class="search-box"><span>⌕</span><input v-model="search" type="search" placeholder="Search participants..." /></label></div>
			<div class="table-scroll">
				<table>
					<thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Year</th><th>Actions</th></tr></thead>
					<tbody>
						<tr v-for="participant in participants" :key="participant.id">
							<td>{{ participant.name }}</td><td>{{ participant.email }}</td><td>{{ participant.course }}</td><td>{{ participant.year }}</td>
							<td class="row-actions"><button class="action-button" @click="openEditForm(participant)">✎</button><button class="action-button delete-action" @click="deleteParticipant(participant.id)">×</button></td>
						</tr>
						<tr v-if="participants.length === 0"><td colspan="5" class="table-empty">No participants found.</td></tr>
					</tbody>
				</table>
			</div>
			<div class="table-footer"><span>Showing {{ participants.length }} of {{ data.participants.length }} records</span><span>Changes save automatically</span></div>
		</section>
		<div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
			<section class="form-modal" role="dialog" aria-modal="true">
				<div class="modal-heading"><div><div class="eyebrow">PARTICIPANT DETAILS</div><h2>{{ editingParticipantId ? 'Edit participant' : 'Add participant' }}</h2></div><button class="close-button" aria-label="Close" @click="showForm = false">×</button></div>
				<form @submit.prevent="saveParticipant">
					<div class="form-grid">
						<label class="form-field field-wide"><span>Full name*</span><input v-model="participantForm.name" required /></label>
						<label class="form-field field-wide"><span>Email address*</span><input v-model="participantForm.email" type="email" required /></label>
						<label class="form-field"><span>Course / program*</span><input v-model="participantForm.course" required /></label>
						<label class="form-field"><span>Year level</span><select v-model="participantForm.year"><option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option><option>Graduate</option></select></label>
					</div>
					<div class="modal-actions"><button type="button" class="secondary-button" @click="showForm = false">Cancel</button><button class="primary-button" type="submit">Save participant</button></div>
				</form>
			</section>
		</div>
	</section>
</template>