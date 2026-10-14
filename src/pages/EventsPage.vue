<script setup>
import { data, deleteEvent, editingEventId, eventForm, events, openAddForm, openEditForm, saveEvent, search, showForm } from './EventsPage.js'
</script>

<template>
	<section class="page-content management-page">
		<div class="management-heading">
			<div>
				<div class="eyebrow">CAMPUS CONNECT / EVENTS</div>
				<h1>Events</h1>
				<p class="page-intro">Plan programs, track capacity, and keep campus life moving.</p>
			</div>
			<button class="primary-button" @click="openAddForm"><span>＋</span> Add event</button>
		</div>

		<section class="panel table-panel">
			<div class="table-toolbar">
				<div class="result-count"><strong>{{ events.length }}</strong> events</div>
				<label class="search-box"><span>⌕</span><input v-model="search" type="search" placeholder="Search events..." /></label>
			</div>
			<div class="table-scroll">
				<table>
					<thead><tr><th>Title</th><th>Date</th><th>Venue</th><th>Organizer</th><th>Status</th><th>Actions</th></tr></thead>
					<tbody>
						<tr v-for="event in events" :key="event.id">
							<td>{{ event.title }}</td>
							<td>{{ event.date }}</td>
							<td>{{ event.venue }}</td>
							<td>{{ event.organizer }}</td>
							<td><span class="status-pill">{{ event.status }}</span></td>
							<td class="row-actions">
								<button class="action-button" @click="openEditForm(event)">✎</button>
								<button class="action-button delete-action" @click="deleteEvent(event.id)">×</button>
							</td>
						</tr>
						<tr v-if="events.length === 0"><td colspan="6" class="table-empty">No events found.</td></tr>
					</tbody>
				</table>
			</div>
			<div class="table-footer"><span>Showing {{ events.length }} of {{ data.events.length }} records</span><span>Changes save automatically</span></div>
		</section>

		<div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
			<section class="form-modal" role="dialog" aria-modal="true">
				<div class="modal-heading">
					<div><div class="eyebrow">EVENT DETAILS</div><h2>{{ editingEventId ? 'Edit event' : 'Add event' }}</h2></div>
					<button class="close-button" aria-label="Close" @click="showForm = false">×</button>
					</div>
					<form @submit.prevent="saveEvent">
						<div class="form-grid">
							<label class="form-field field-wide"><span>Event name*</span><input v-model="eventForm.title" required /></label>
							<label class="form-field"><span>Date*</span><input v-model="eventForm.date" type="date" required /></label>
							<label class="form-field"><span>Start time*</span><input v-model="eventForm.time" type="time" required /></label>
							<label class="form-field"><span>Venue*</span><select v-model="eventForm.venue" required><option disabled value="">Select venue</option><option v-for="venue in data.venues" :key="venue.id">{{ venue.name }}</option></select></label>
							<label class="form-field"><span>Organizer*</span><select v-model="eventForm.organizer" required><option disabled value="">Select organizer</option><option v-for="organizer in data.organizers" :key="organizer.id">{{ organizer.name }}</option></select></label>
							<label class="form-field"><span>Category</span><select v-model="eventForm.category"><option>Campus life</option><option>Workshop</option><option>Performance</option><option>Sports</option><option>Academic</option></select></label>
							<label class="form-field"><span>Capacity*</span><input v-model="eventForm.capacity" type="number" min="1" required /></label>
							<label class="form-field"><span>Status</span><select v-model="eventForm.status"><option>Upcoming</option><option>Open</option><option>Full</option><option>Completed</option><option>Cancelled</option></select></label>
						</div>
						<div class="modal-actions"><button type="button" class="secondary-button" @click="showForm = false">Cancel</button><button class="primary-button" type="submit">Save event</button></div>
					</form>
				</section>
			</div>
		</section>
	</template>