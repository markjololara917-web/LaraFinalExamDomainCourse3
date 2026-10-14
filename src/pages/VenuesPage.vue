<script setup>
import RecordActions from '../components/RecordActions.vue'
import { data, deleteVenue, editingVenueId, openAddForm, openEditForm, saveVenue, search, showForm, venueForm, venues } from './VenuesPage.js'
</script>

<template>
	<section class="page-content management-page">
		<div class="management-heading">
			<div><div class="eyebrow">CAMPUS CONNECT / VENUES</div><h1>Venues</h1><p class="page-intro">Keep spaces, capacities, and availability in one place.</p></div>
			<button class="primary-button" @click="openAddForm"><span>＋</span> Add venue</button>
		</div>
		<section class="panel table-panel">
			<div class="table-toolbar"><div class="result-count"><strong>{{ venues.length }}</strong> venues</div><label class="search-box"><span>⌕</span><input v-model="search" type="search" placeholder="Search venues..." /></label></div>
			<div class="table-scroll">
				<table>
					<thead><tr><th>Name</th><th>Location</th><th>Capacity</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
					<tbody>
						<tr v-for="venue in venues" :key="venue.id">
							<td>{{ venue.name }}</td><td>{{ venue.location }}</td><td>{{ venue.capacity }} seats</td><td>{{ venue.type }}</td>
							<td><span class="status-pill">{{ venue.status }}</span></td>
							<td class="row-actions"><RecordActions :record="venue" @update="openEditForm" @delete="deleteVenue" /></td>
						</tr>
						<tr v-if="venues.length === 0"><td colspan="6" class="table-empty">No venues found.</td></tr>
					</tbody>
				</table>
			</div>
			<div class="table-footer"><span>Showing {{ venues.length }} of {{ data.venues.length }} records</span><span>Changes save automatically</span></div>
		</section>
		<div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
			<section class="form-modal" role="dialog" aria-modal="true">
				<div class="modal-heading"><div><div class="eyebrow">VENUE DETAILS</div><h2>{{ editingVenueId ? 'Edit venue' : 'Add venue' }}</h2></div><button class="close-button" aria-label="Close" @click="showForm = false">×</button></div>
				<form @submit.prevent="saveVenue">
					<div class="form-grid">
						<label class="form-field field-wide"><span>Venue name*</span><input v-model="venueForm.name" required /></label>
						<label class="form-field field-wide"><span>Location*</span><input v-model="venueForm.location" required /></label>
						<label class="form-field"><span>Capacity*</span><input v-model="venueForm.capacity" type="number" min="1" required /></label>
						<label class="form-field"><span>Space type</span><select v-model="venueForm.type"><option>Auditorium</option><option>Classroom</option><option>Outdoor</option><option>Meeting room</option><option>Other</option></select></label>
						<label class="form-field"><span>Availability</span><select v-model="venueForm.status"><option>Available</option><option>In use</option><option>Maintenance</option></select></label>
					</div>
					<div class="modal-actions"><button type="button" class="secondary-button" @click="showForm = false">Cancel</button><button class="primary-button" type="submit">Save venue</button></div>
				</form>
			</section>
		</div>
	</section>
</template>