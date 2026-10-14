<script setup>
defineProps({
  record: { type: Object, required: true },
})

defineEmits(['update', 'delete'])
</script>

<template>
  <button class="action-button" :aria-label="`Edit ${record.title || record.name || record.participant}`" @click="$emit('update', record)">✎</button>
  <button class="action-button delete-action" :aria-label="`Delete ${record.title || record.name || record.participant}`" @click="$emit('delete', record.id)">×</button>
</template>