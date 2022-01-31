<template>
  <div class="event">
    <router-link
      class=""
      :to="{ name: 'Event', params: { id: towerEvents.id } }"
    >
      <div
        class="card cardsHome elevation-3 border m-2 d-flex justify-content-end"
      >
        <div class="card blurryCards m-0 rounded-0">
          <div>
            <p class="pt-1 ps-2 m-0 text-uppercase">
              {{ towerEvents.name }}
            </p>
            <p class="ps-2 m-0 ">
              {{ towerEvents.location }}
            </p>
            <div class="d-flex">
              <p class="m-0 ps-2 ">Event Date:</p>
              <p class="ps-2 m-0 ">
                {{
                  new Date(towerEvents.startDate).toISOString().substring(0, 10)
                }}
              </p>
            </div>
            <div
              class="atCapacity mt-1 text-center"
              v-if="towerEvents.capacity === 0"
            >
              AT CAPACITY
            </div>
            <div
              v-else-if="towerEvents.isCanceled === false"
              class="d-flex justify-content-end pe-2 pt-1 align-items-center"
            >
              <p class="pe-2 text-primary">{{ towerEvents.capacity }}</p>
              <p class="">spots available</p>
            </div>
            <div
              class="canceledEvent mt-1 text-center"
              v-else-if="towerEvents.isCanceled === true"
            >
              EVENT CANCELED
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
export default {
  props: {
    towerEvents: { type: Object },
    attending: { type: Object }
  },

  setup(props) {
    return {
      coverImg: computed(() => `url(${props.towerEvents?.coverImg})`)
    }
  }
}
</script>


<style lang="scss" scoped>
.active {
  pointer-events: none;
}
.blurryCards {
  height: 45% !important;
  color: white;
  background-color: #4747479f;
  border: 0;
  width: 100%;
}
.cardsHome {
  height: 33vh;
  min-width: 30vh;
  border-width: 6px !important;
  border-color: #474c61 !important;
  background-image: v-bind(coverImg);
  background-size: cover;
}
.canceledEvent {
  background: rgb(224, 55, 55);
  background: linear-gradient(
    90deg,
    rgba(224, 55, 55, 0) 0%,
    rgb(224, 55, 55) 25%,
    rgba(224, 55, 55, 1) 75%,
    rgba(42, 45, 58, 0) 100%
  );
  color: #e4e4e4;
}
.atCapacity {
  background: rgb(224, 55, 55);
  background: linear-gradient(
    90deg,
    rgba(224, 55, 55, 0) 0%,
    rgb(255, 90, 25) 25%,
    rgba(225, 90, 25, 1) 75%,
    rgba(42, 45, 58, 0) 100%
  );
  color: #e4e4e4;
}
</style>