<template>
  <div class="grid grid-cols-4">
    <div class="flex relative col-span-4 lg:col-span-3">
      <div class="w-1 h-full bg-gray-300 block flex-shrink-0 absolute left-[6px] top-0"></div>
      <ul class="flex flex-col gap-10 z-10">
        <li
          v-if="formattedEvents && formattedEvents.length"
          v-for="(event, index) in formattedEvents"
          :key="index"
          class="flex items-start"
        >
          <div class="flex items-center mt-8">
            <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
            <div class="w-5 md:w-10 h-1 bg-gray-300"></div>
          </div>

          <div class="flex">
            <div class="flex flex-col border-2 border-gray-300 bg-gray-100 p-4 md:p-6 rounded-xl">
              <h3 class="section-pharagraph font-semibold" v-if="event.title">
                {{ event.title }}
              </h3>
              <div class="flex flex-col md:flex-row md:items-center md:gap-2 section-pharagraph-small">
                <div class="flex flex-col sm:flex-row sm:gap-2 font-medium">
                  <span class="font-semibold gradient-text">{{ event.workplace }}</span>
                  <span class="hidden md:block font-semibold">|</span>
                  <span>{{ event.location }}</span>
                </div>
                <span class="hidden md:block">|</span>
                <div class="flex items-center gap-1 italic font-medium" v-if="event.date.from">
                  <span>{{ getFormattedDate(event.date.from) }}</span>
                  <span>-</span>
                  <span>
                    {{ event.date.to ? getFormattedDate(event.date.to) : $t('Present')}}
                  </span>
                </div>
              </div>
              <p
                v-if="event.description"
                class="mt-4 section-pharagraph-small"
                v-html="event.description"
              ></p>
            </div>

            <div class="min-h-full flex flex-col justify-between w-0 invisible overflow-hidden">
              <div
                v-for="(date, index) in calculateEventDates(event.date)"
                :key="index"
                class="event-date-mark"
              >
                {{ date }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="hidden lg:block h-full relative ml-10">
      <div class="sticky top-1/2">
        <span class="font-semibold text-4xl text-gray-400 whitespace-nowrap italic displayDate">
          {{ focusedDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const { getFormattedDate } = useUtils();


const props = defineProps({
  events: {
    type: Array,
    required: true
  }
});

const focusedDate = ref();

const formattedEvents = props.events.map(event => ({
  date: {
    from: event.date.from,
    to: event.date.to || null
  },
  title: event.title,
  description: event.description,
  workplace: event.workplace,
  location: event.location
}));

const requestedScroll = () => {
  window.requestAnimationFrame(changeFocusedDate);
};

onMounted(() => {
  changeFocusedDate();
  window.addEventListener('scroll', requestedScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', requestedScroll);
});

function changeFocusedDate() {
  let currentDate;
  const displayDate = document.querySelector('.displayDate');
  if (displayDate) {
    const displayRect = displayDate.getBoundingClientRect();
    if (displayRect.top > window.innerHeight) {
      return;
    }
    const dateElements = document.querySelectorAll('.event-date-mark');
    dateElements.forEach((elem) => {
      const dateRect = elem.getBoundingClientRect();
      if (dateRect.top <= displayRect.top) {
        currentDate = elem.textContent;
      }
    });
    if (!currentDate && dateElements.length) {
      currentDate = dateElements[0].textContent;
    }
    focusedDate.value = currentDate;
  }
}
function calculateEventDates(dates) {
  let start = new Date(dates.from);
  let end = dates.to ? new Date(dates.to) : new Date();
  let middle = new Date((start.getTime() + end.getTime()) / 2);

  start = getFormattedDate(start);
  end = getFormattedDate(end);
  middle = getFormattedDate(middle);

  return [
    end,
    middle,
    start,
  ];
}
</script>
