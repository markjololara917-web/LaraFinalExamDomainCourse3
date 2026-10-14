<script setup>
import RecordActions from '../components/RecordActions.vue'
import { data, deleteRegistration, editingRegistrationId, openAddForm, openEditForm, registrationForm, registrations, saveRegistration, search, showForm } from './RegistrationsPage.js'
</script>

<template>
	<section class="page-content management-page">
		<div class="management-heading">
			<div><div class="eyebrow">CAMPUS CONNECT / REGISTRATIONS</div><h1>Registrations</h1><p class="page-intro">Manage sign-ups, confirmations, and attendee status.</p></div>
			<button class="primary-button" @click="openAddForm"><span>＋</span> Add registration</button>
		</div>
		<section class="panel table-panel">
			<div class="table-toolbar"><div class="result-count"><strong>{{ registrations.length }}</strong> registrations</div><label class="search-box"><span>⌕</span><input v-model="search" type="search" placeholder="Search registrations..." /></label></div>
			<div class="table-scroll">
				<table>
					<thead><tr><th>Participant</th><th>Event</th><th>Date</th><th>Status</th><th>Payment</th><th>Actions</th></tr></thead>
					<tbody>
						<tr v-for="registration in registrations" :key="registration.id">
							<td>{{ registration.participant }}</td><td>{{ registration.event }}</td><td>{{ registration.date }}</td>
							<td><span class="status-pill" :class="registration.status.toLowerCase()">{{ registration.status }}</span></td><td>{{ registration.payment }}</td>
							<td class="row-actions"><RecordActions :record="registration" @update="openEditForm" @delete="deleteRegistration" /></td>
						</tr>
						<tr v-if="registrations.length === 0"><td colspan="6" class="table-empty">No registrations found.</td></tr>
					</tbody>
				</table>
			</div>
			<div class="table-footer"><span>Showing {{ registrations.length }} of {{ data.registrations.length }} records</span><span>Changes save automatically</span></div>
		</section>
		<div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
			<section class="form-modal" role="dialog" aria-modal="true">
				<div class="modal-heading"><div><div class="eyebrow">REGISTRATION DETAILS</div><h2>{{ editingRegistrationId ? 'Edit registration' : 'Add registration' }}</h2></div><button class="close-button" aria-label="Close" @click="showForm = false">×</button></div>
				<form @submit.prevent="saveRegistration">
					<div class="form-grid">
						<label class="form-field"><span>Participant*</span><select v-model="registrationForm.participant" required><option disabled value="">Select participant</option><option v-for="participant in data.participants" :key="participant.id">{{ participant.name }}</option></select></label>
						<label class="form-field"><span>Event*</span><select v-model="registrationForm.event" required><option disabled value="">Select event</option><option v-for="event in data.events" :key="event.id">{{ event.title }}</option></select></label>
						<label class="form-field"><span>Registered on*</span><input v-model="registrationForm.date" type="date" required /></label>
						<label class="form-field"><span>Status</span><select v-model="registrationForm.status"><option>Confirmed</option><option>Waitlisted</option><option>Cancelled</option></select></label>
						<label class="form-field"><span>Payment</span><select v-model="registrationForm.payment"><option>No fee</option><option>Pending</option><option>Paid</option></select></label>
					</div>
					<div class="modal-actions"><button type="button" class="secondary-button" @click="showForm = false">Cancel</button><button class="primary-button" type="submit">Save registration</button></div>
				</form>
			</section>
		</div>
	</section>
</template>