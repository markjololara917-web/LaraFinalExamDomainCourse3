import { reactive } from 'vue'

const storageKey = 'campus-events-data-v1'
const oldParticipantNames = {
  'Maya Santos': { name: 'Markjolo Lara', email: 'markjolo.lara@campus.edu' },
  'Ethan Reyes': { name: 'Jeboy Asur', email: 'jeboy.asur@campus.edu' },
  'Lia Navarro': { name: 'Lenin Geronimo', email: 'lenin.geronimo@campus.edu' },
  'Noah Cruz': { name: 'Rian Ricafort', email: 'rian.ricafort@campus.edu' },
}

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
    { id: 1, participant: 'Markjolo Lara', event: 'Acoustic Night', date: '2026-10-12', status: 'Confirmed', payment: 'No fee' },
    { id: 2, participant: 'Jeboy Asur', event: 'Founders Week: Opening Day', date: '2026-10-11', status: 'Confirmed', payment: 'No fee' },
    { id: 3, participant: 'Lenin Geronimo', event: 'Design Thinking Workshop', date: '2026-10-10', status: 'Waitlisted', payment: 'No fee' },
    { id: 4, participant: 'Rian Ricafort', event: 'Acoustic Night', date: '2026-10-09', status: 'Confirmed', payment: 'Paid' },
  ],
  organizers: [
    { id: 1, name: 'Student Affairs', email: 'studentaffairs@campus.edu', department: 'Campus Life', phone: '+63 917 555 0101' },
    { id: 2, name: 'Creative Society', email: 'creative@campus.edu', department: 'Arts & Design', phone: '+63 917 555 0144' },
    { id: 3, name: 'Arts Council', email: 'artscouncil@campus.edu', department: 'Student Council', phone: '+63 917 555 0182' },
  ],
  participants: [
    { id: 1, name: 'Markjolo Lara', email: 'markjolo.lara@campus.edu', course: 'Communication', year: '3rd year' },
    { id: 2, name: 'Jeboy Asur', email: 'jeboy.asur@campus.edu', course: 'Computer Science', year: '2nd year' },
    { id: 3, name: 'Lenin Geronimo', email: 'lenin.geronimo@campus.edu', course: 'Industrial Design', year: '1st year' },
    { id: 4, name: 'Rian Ricafort', email: 'rian.ricafort@campus.edu', course: 'Music', year: '4th year' },
    { id: 5, name: 'Gerald Orcullo', email: 'gerald.orcullo@campus.edu', course: 'Information Technology', year: '2nd year' },
  ],
}

function loadData() {
  const savedData = localStorage.getItem(storageKey)

  if (savedData) {
    try {
      const saved = { ...JSON.parse(JSON.stringify(starterData)), ...JSON.parse(savedData) }
      const hasOldSampleNames = saved.participants.some((participant) => oldParticipantNames[participant.name])

      saved.participants = saved.participants.map((participant) => {
        const replacement = oldParticipantNames[participant.name]
        return replacement ? { ...participant, ...replacement } : participant
      })

      if (hasOldSampleNames && !saved.participants.some((participant) => participant.name === 'Gerald Orcullo')) {
        saved.participants.push(starterData.participants[4])
      }

      saved.registrations = saved.registrations.map((registration) => ({
        ...registration,
        participant: oldParticipantNames[registration.participant]?.name || registration.participant,
      }))

      return saved
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