<script setup>
import { useRoute } from 'vue-router'
import { data } from '../data'

const route = useRoute()

const navigation = [
  { path: '/overview', label: 'Overview', icon: '◫' },
  { path: '/events', label: 'Events', icon: '▦' },
  { path: '/venues', label: 'Venues', icon: '⌂' },
  { path: '/registrations', label: 'Registrations', icon: '✓' },
  { path: '/participants', label: 'Participants', icon: '♙' },
  { path: '/organizers', label: 'Organizers', icon: '♧' },
]
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <RouterLink class="brand" to="/overview">
        <span class="brand-mark">C<span>+</span></span>
        <span class="brand-name">campus<span>connect</span></span>
      </RouterLink>
      <div class="workspace-label">WORKSPACE</div>
      <nav class="main-nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigation"
          :key="item.path"
          class="nav-item"
          active-class="active"
          :to="item.path"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          <span v-if="item.path === '/registrations'" class="nav-count">
            {{ data.registrations.length }}
          </span>
        </RouterLink>
      </nav>

      <div class="sidebar-bottom">
        <div class="semester-card">
          <span class="semester-dot"></span>
          <div><strong>Fall semester</strong><small>2026 · Term 1</small></div>
          <span class="chevron">⌄</span>
        </div>
        <div class="profile">
          <div class="avatar avatar-coral">SA</div>
          <div class="profile-copy"><strong>Sam Admin</strong><small>Event administrator</small></div>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div class="breadcrumbs">
          <span>Campus Connect</span><span class="crumb-slash">/</span><strong>{{ route.meta.title }}</strong>
        </div>
        <div class="topbar-actions">
          <span class="today-label">Wednesday, October 14, 2026</span>
          <div class="avatar avatar-coral top-avatar">SA</div>
        </div>
      </header>

      <RouterView />
    </main>
  </div>
</template>