<template>
  <div class="flex">
    <div class="w-1 bg-gray-300 block flex-shrink-0"></div>
    <ul class="flex flex-col gap-10">
      <li
        v-if="events && events.length"
        v-for="(event, index) in events"
        :key="index"
        class="flex"
      >
        <div class="flex items-center relative -left-[10px]">
          <div class="w-4 h-4 bg-gray-500 rounded-full"></div>
          <div class="w-5 md:w-10 h-1 bg-gray-300"></div>
        </div>

        <div class="flex flex-col border-2 p-6 rounded-xl relative -left-[10px]">
          <span class="text-gray-700 text-xl">
            {{ event.date }}
          </span>
          <h3 class="font-semibold text-2xl gradient-text">
            {{ event.title }}
          </h3>
          <p class="mt-2 text-xl text-gray-700 font-semibold">
            {{ event.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      // array of objects
      // {
      //   date: date,
      //   title: title,
      //   description: description,
      // }
      events: {
        type: Array,
        required: true,
      }
    }
  }
</script>