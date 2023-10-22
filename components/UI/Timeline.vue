<template>
  <div class="flex relative">
    <div class="w-1 h-full bg-gray-300 block flex-shrink-0 absolute left-[6px] top-0"></div>
    <ul class="flex flex-col gap-10 z-10">
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

        <div class="flex flex-col border-2 border-gray-300 p-6 rounded-xl">
          <div class="flex items-center gap-1">
            <span>{{ event.date.from }}</span>
            <span>-</span>
            <span :class="{'italic': !event.date.to}">
              {{ event.date.to ? event.date.to : $t('Present')}}
            </span>
          </div>
          <h3 class="font-semibold text-2xl gradient-text">
            {{ event.title }}
          </h3>
          <p class="mt-4 text-xl text-gray-700 font-semibold">
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
      const eventsArr = [];
      for (const event of this.events) {
        eventsArr.push(
          {
            date: {
              from: this.getFormattedDate(event.date.from),
              to: this.getFormattedDate(event.date.to),
            },
            title: event.title,
            description: event.description,
          }
        )
      }
      return eventsArr;
    },
  },
  mixins: [ utilsMixin ],
}
</script>