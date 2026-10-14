<script setup>
import { RouterLink } from 'vue-router'
import { availableVenues, confirmedCount, data, recentRegistrations, upcomingEvents } from './OverviewPage.js'
</script>

<template>
  <section class="page-content overview-page">
    <div class="welcome-row">
      <div>
        <div class="eyebrow">YOUR CAMPUS, IN MOTION</div>
        <h1>Good morning, Markjolo <span class="wave">✳</span></h1>
        <p class="page-intro">Here’s what’s happening across your campus today.</p>
      </div>
      <RouterLink class="primary-button" to="/events"><span>＋</span> Create an event</RouterLink>
    </div>

    <div class="stats-grid">
      <article class="stat-card stat-featured">
        <div class="stat-top"><span>Events this month</span><span class="stat-symbol coral-symbol">▦</span></div>
        <div class="stat-number">{{ data.events.length.toString().padStart(2, '0') }}</div>
        <div class="stat-foot"><span class="trend-up">↗ 2</span><span>compared to last month</span></div>
        <div class="stat-sparkline"><i v-for="number in 12" :key="number"></i></div>
      </article>
      <article class="stat-card">
        <div class="stat-top"><span>Active participants</span><span class="stat-symbol mint-symbol">♙</span></div>
        <div class="stat-number">{{ data.participants.length.toString().padStart(2, '0') }}</div>
        <div class="stat-foot"><span>Across all campus events</span></div>
      </article>
      <article class="stat-card">
        <div class="stat-top"><span>Registrations</span><span class="stat-symbol blue-symbol">✓</span></div>
        <div class="stat-number">{{ data.registrations.length.toString().padStart(2, '0') }}</div>
        <div class="stat-foot"><span class="trend-up">{{ confirmedCount }} confirmed</span><span>so far</span></div>
      </article>
      <article class="stat-card">
        <div class="stat-top"><span>Available venues</span><span class="stat-symbol yellow-symbol">⌂</span></div>
        <div class="stat-number">{{ availableVenues.toString().padStart(2, '0') }}</div>
        <div class="stat-foot"><span>Spaces ready to book</span></div>
      </article>
    </div>

    <div class="dashboard-grid">
      <section class="panel upcoming-panel">
        <div class="panel-heading">
          <div><div class="eyebrow">MARK YOUR CALENDAR</div><h2>Upcoming events</h2></div>
          <RouterLink class="text-button" to="/events">All events <span>→</span></RouterLink>
        </div>
        <div v-if="upcomingEvents.length" class="event-list">
          <article v-for="event in upcomingEvents" :key="event.id" class="event-row">
            <div class="date-tile">
              <strong>{{ new Date(`${event.date}T00:00:00`).getDate().toString().padStart(2, '0') }}</strong>
              <span>{{ new Date(`${event.date}T00:00:00`).toLocaleString('en', { month: 'short' }).toUpperCase() }}</span>
            </div>
            <div class="event-info"><strong>{{ event.title }}</strong><span>{{ event.time }} <i>·</i> {{ event.venue }}</span></div>
            <span class="category-pill">{{ event.category }}</span>
            <RouterLink class="row-arrow" to="/events" aria-label="View events">↗</RouterLink>
          </article>
        </div>
        <div v-else class="empty-state">No events yet. Add your first event to get started.</div>
      </section>

      <section class="panel pulse-panel">
        <div class="panel-heading">
          <div><div class="eyebrow">LIVE SNAPSHOT</div><h2>Registration pulse</h2></div>
          <span class="live-indicator">LIVE</span>
        </div>
        <div class="pulse-total"><strong>{{ data.registrations.length }}</strong><span>total sign-ups</span></div>
        <div class="pulse-track">
          <span :style="{ width: `${data.registrations.length ? (confirmedCount / data.registrations.length) * 100 : 0}%` }"></span>
        </div>
        <div class="pulse-legend">
          <span><i class="legend-confirmed"></i>Confirmed <strong>{{ confirmedCount }}</strong></span>
          <span><i class="legend-waitlist"></i>Waitlisted <strong>{{ data.registrations.filter((item) => item.status === 'Waitlisted').length }}</strong></span>
        </div>
        <div class="pulse-note"><span class="note-icon">↗</span><span><strong>Your community is showing up.</strong><br />Keep the momentum going with your next event.</span></div>
      </section>
    </div>

    <section class="panel activity-panel">
      <div class="panel-heading">
        <div><div class="eyebrow">JUST ADDED</div><h2>Recent registrations</h2></div>
        <RouterLink class="text-button" to="/registrations">View registrations <span>→</span></RouterLink>
      </div>
      <div v-if="recentRegistrations.length" class="activity-list">
        <div v-for="(registration, index) in recentRegistrations" :key="registration.id" class="activity-row">
          <div class="avatar" :class="['avatar-coral', 'avatar-blue', 'avatar-yellow', 'avatar-mint'][index % 4]">
            {{ registration.participant.split(' ').map((part) => part[0]).slice(0, 2).join('') }}
          </div>
          <div class="activity-copy"><strong>{{ registration.participant }}</strong><span>registered for <b>{{ registration.event }}</b></span></div>
          <span class="status-pill" :class="registration.status.toLowerCase()">{{ registration.status }}</span>
        </div>
      </div>
      <div v-else class="empty-state">New registrations will appear here.</div>
    </section>

    <footer class="page-footer">
      <span>Campus Connect <b>·</b> Student Event Management</span>
      <span>Making campus moments happen.</span>
    </footer>
  </section>
</template>