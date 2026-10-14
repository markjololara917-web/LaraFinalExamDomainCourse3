import { reactive } from 'vue'

const storageKey = 'campus-events-data-v1'

const starterData = {
  events: [
    { id: 1, title: 'Founders Week: Opening Day', date: '2026-10-22', time: '09:00', venue: 'University Oval', organizer: 'Student Affairs', category: 'Campus life', capacity: 500, status: 'Upcoming' },
    { id: 2, title: 'Design Thinking Workshop', date: '2026-10-24', time: '13:30', venue: 'Innovation Lab', organizer: 'Creative Society', category: 'Workshop', capacity: 80, status: 'Upcoming' },
    { id: 3, title: 'Acoustic Night', date: '2026-10-18', time: '18:00', venue: 'Main Auditorium', organizer: 'Arts Council', category: 'Performance', capacity: 220, status: 'Open' },
  ],
  venues: [
    { id: 1, name: 'Main Auditorium', location: 'North Campus · Building A', capacity: 300, type: 'Auditorium', status: 'Available' },
    { id: 2, name: 'Innovation Lab', location: 'Library Annex · 2F', capacity: 90, type: 'Classroom', status: 'Available' },
    { id: 3, name: 'University Oval', location: 'Central Campus', capacity: 800, type: 'Outdoor', status: 'Available' },
  ],
  registrations: [
    { id: 1, participant: 'Maya Santos', event: 'Acoustic Night', date: '2026-10-12', status: 'Confirmed', payment: 'No fee' },
    { id: 2, participant: 'Ethan Reyes', event: 'Founders Week: Opening Day', date: '2026-10-11', status: 'Confirmed', payment: 'No fee' },
    { id: 3, participant: 'Lia Navarro', event: 'Design Thinking Workshop', date: '2026-10-10', status: 'Waitlisted', payment: 'No fee' },
    { id: 4, participant: 'Noah Cruz', event: 'Acoustic Night', date: '2026-10-09', status: 'Confirmed', payment: 'Paid' },
  ],
  organizers: [
    { id: 1, name: 'Student Affairs', email: 'studentaffairs@campus.edu', department: 'Campus Life', phone: '+63 917 555 0101' },
    { id: 2, name: 'Creative Society', email: 'creative@campus.edu', department: 'Arts & Design', phone: '+63 917 555 0144' },
    { id: 3, name: 'Arts Council', email: 'artscouncil@campus.edu', department: 'Student Council', phone: '+63 917 555 0182' },
  ],
  participants: [
    { id: 1, name: 'Maya Santos', email: 'maya.santos@campus.edu', course: 'Communication', year: '3rd year' },
    { id: 2, name: 'Ethan Reyes', email: 'ethan.reyes@campus.edu', course: 'Computer Science', year: '2nd year' },
    { id: 3, name: 'Lia Navarro', email: 'lia.navarro@campus.edu', course: 'Industrial Design', year: '1st year' },
    { id: 4, name: 'Noah Cruz', email: 'noah.cruz@campus.edu', course: 'Music', year: '4th year' },
  ],
}

function loadData() {
  const savedData = localStorage.getItem(storageKey)

  if (savedData) {
    try {
      return { ...JSON.parse(JSON.stringify(starterData)), ...JSON.parse(savedData) }
    } catch {
      return JSON.parse(JSON.stringify(starterData))
    }
  }

  return JSON.parse(JSON.stringify(starterData))
}

export const data = reactive(loadData())

export function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(data))
}