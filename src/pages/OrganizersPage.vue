<script setup>
import RecordActions from '../components/RecordActions.vue'
import { data, deleteOrganizer, editingOrganizerId, openAddForm, openEditForm, organizerForm, organizers, saveOrganizer, search, showForm } from './OrganizersPage.js'
</script>

<template>
	<section class="page-content management-page">
		<div class="management-heading">
			<div><div class="eyebrow">CAMPUS CONNECT / ORGANIZERS</div><h1>Organizers</h1><p class="page-intro">Coordinate the teams bringing campus events to life.</p></div>
			<button class="primary-button" @click="openAddForm"><span>＋</span> Add organizer</button>
		</div>
		<section class="panel table-panel">
			<div class="table-toolbar"><div class="result-count"><strong>{{ organizers.length }}</strong> organizers</div><label class="search-box"><span>⌕</span><input v-model="search" type="search" placeholder="Search organizers..." /></label></div>
			<div class="table-scroll">
				<table>
					<thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Phone</th><th>Actions</th></tr></thead>
					<tbody>
						<tr v-for="organizer in organizers" :key="organizer.id">
							<td>{{ organizer.name }}</td><td>{{ organizer.email }}</td><td>{{ organizer.department }}</td><td>{{ organizer.phone }}</td>
							<td class="row-actions"><RecordActions :record="organizer" @update="openEditForm" @delete="deleteOrganizer" /></td>
						</tr>
						<tr v-if="organizers.length === 0"><td colspan="5" class="table-empty">No organizers found.</td></tr>
					</tbody>
				</table>
			</div>
			<div class="table-footer"><span>Showing {{ organizers.length }} of {{ data.organizers.length }} records</span><span>Changes save automatically</span></div>
		</section>
		<div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
			<section class="form-modal" role="dialog" aria-modal="true">
				<div class="modal-heading"><div><div class="eyebrow">ORGANIZER DETAILS</div><h2>{{ editingOrganizerId ? 'Edit organizer' : 'Add organizer' }}</h2></div><button class="close-button" aria-label="Close" @click="showForm = false">×</button></div>
				<form @submit.prevent="saveOrganizer">
					<div class="form-grid">
						<label class="form-field field-wide"><span>Organizer / group name*</span><input v-model="organizerForm.name" required /></label>
						<label class="form-field field-wide"><span>Email address*</span><input v-model="organizerForm.email" type="email" required /></label>
						<label class="form-field"><span>Department*</span><input v-model="organizerForm.department" required /></label>
						<label class="form-field"><span>Contact number</span><input v-model="organizerForm.phone" type="tel" /></label>
					</div>
					<div class="modal-actions"><button type="button" class="secondary-button" @click="showForm = false">Cancel</button><button class="primary-button" type="submit">Save organizer</button></div>
				</form>
			</section>
		</div>
	</section>
</template>