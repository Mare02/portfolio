<template>
  <div class="flex relative">
    <div class="w-1 h-full bg-gray-300 block flex-shrink-0 absolute left-[6px] top-0"></div>
    <ul class="flex flex-col gap-10 z-10 max-w-4xl">
      <li
        v-if="computedEvents && computedEvents.length"
        v-for="(event, index) in computedEvents"
        :key="index"
        class="flex items-start"
      >
        <div class="flex items-center mt-8">
          <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
          <div class="w-5 md:w-10 h-1 bg-gray-300"></div>
        </div>

        <div class="flex flex-col border-2 border-gray-300 p-4 md:p-6 rounded-xl">
          <h3 class="section-pharagraph underline" v-if="event.title">
            {{ event.title }}
          </h3>
          <div class="flex flex-col md:flex-row md:items-center md:gap-2">
            <div class="flex flex-col md:flex-row md:gap-1 text-lg">
              <span class="font-semibold">{{ event.workplace }}</span>
              <span class="text-gray-600">{{ event.location }}</span>
            </div>
            <span class="hidden md:block">•</span>
            <div class="flex items-center gap-1 text-lg text-gray-600" v-if="event.date.from">
              <span>{{ event.date.from }}</span>
              <span>-</span>
              <span :class="{'italic': !event.date.to}">
                {{ event.date.to ? event.date.to : $t('Present')}}
              </span>
            </div>
          </div>
          <div>
          </div>
          <p class="mt-4 section-pharagraph-small" v-if="event.description">
            {{ event.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { utilsMixin } from '@/utils/mixins/utilsMixin.js';

export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  computed: {
    computedEvents() {
      return this.events.map(event => ({
        date: {
          from: this.getFormattedDate(event.date.from),
          to: this.getFormattedDate(event.date.to),
        },
        title: event.title,
        description: event.description,
        workplace: event.workplace,
        location: event.location,
      }));
    },
  },
  mixins: [ utilsMixin ],
}
</script>