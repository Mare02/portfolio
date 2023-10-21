<template>
  <NuxtLayout name="full-screen-section" title="My experience">
    <Timeline :events="events"></Timeline>
  </NuxtLayout>
</template>

<script>
import Timeline from '../UI/Timeline.vue';
export default {
  components: { Timeline },
  data() {
    return {
      events: [
        {
          "date": "Nov 5, 2023 - Dec 10, 2023",
          "title": "Project Kickoff",
          "description": "Our team gathered to kick off an exciting new project."
        },
        {
          "date": "Nov 5, 2023 - Dec 15, 2023",
          "title": "Milestone Achieved",
          "description": "We reached a significant milestone in the development process, demonstrating remarkable progress and teamwork. This achievement has put us on the right track to deliver an outstanding product to our clients."
        },
        {
          "date": "Nov 5, 2023 - Dec 10, 2023",
          "title": "Team Building Workshop",
          "description": "Engaging team-building workshop."
        },
        {
          "date": "Nov 5, 2023 - Dec 10, 2023",
          "title": "Product Launch",
          "description": "A spectacular product launch event that showcased our innovative product to a wide audience."
        },
        {
          "date": "Nov 5, 2023 - Dec 15, 2023",
          "title": "Customer Feedback Session",
          "description": "Interactive session with customers to gather valuable feedback and insights. The feedback will be used to enhance our product and services, ensuring customer satisfaction and loyalty."
        }
      ],
    }
  }
}
</script>