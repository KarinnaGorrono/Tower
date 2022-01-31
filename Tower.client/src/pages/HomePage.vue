<template>
  <div class="homeHeight container-fluid scrollbar">
    <div class="row">
      <div class="col-12 mt-2">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/img/Logo.png" width="250" class="m-3" alt="" />
        </router-link>
      </div>
    </div>
<div class="row"></div>
    <div class="row justify-content-center">
      <div class="col-md-11 backgroundBanner rounded d-flex elevation-5 border my-2 align-items-center">
        <div class="text-light mx-5 mt-5">
          <h1>Reserve your seat now with</h1>
          <h1>real events for real people.</h1>
        </div>
      </div>
    </div>
<div class="row justify-content-center">
      <div class="col-md-11 d-flex justify-content-between align-items-center sort rounded my-2">
        <div>
          <button @click="getAll" title="All" class="btn text-light px-3 ">
            All
          </button>
        </div>
       <div>
          <button @click="sortConventions" title="Conventions" class="btn text-light px-3 ">
            Conventions
          </button>
        </div>
       <div>
          <button @click="sortSports" title="Sports" class="btn text-light px-3 ">
            Sports
          </button>
        </div>
        <div>
          <button @click="sortDigital" title="Digital" class="btn text-light px-3 ">
            Digital
          </button>
        </div>
        <div>
          <button @click="sortConcerts" title="Concerts" class="btn text-light px-3 ">
            Concerts
          </button>
        </div>
      </div>
    </div>
   <div class="row justify-content-center mt-2">
      <div class="col-12 pe-5 ps-5">
        <div class="d-flex flex-wrap">
          <div class="col-md-3" v-for="e in towerEvents" :key="e.id">
            <Event :towerEvents="e" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import { AuthService } from "../services/AuthService"
export default {
  name: 'Home',
  props: {
    account: { type: Object, required: true }
  },
  setup() {
    watchEffect(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      towerEvents: computed(() => AppState.towerEvents),
      sortSports() {
        eventsService.sortSports()
      },
      sortDigital() {
        eventsService.sortDigital()
      },
      sortAll() {
        eventsService.sortAll()
      },
      sortConcerts() {
        eventsService.sortConcerts()
      },
      sortConventions() {
        eventsService.sortConventions()
      },
      async getAll() {
        try {
          eventsService.getAll()
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped lang="scss">

.homeHeight {
  height: 100vh;
}

.sort {
  height: 7vh;
  background-color: #474c61 !important;
}
.scrollbar {
  overflow-y: scroll;
}
.scrollbar::-webkit-scrollbar {
  width: 7px;
}
.scrollbar::-webkit-scrollbar-track {
  background: #2e2e2e;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #adadad;
  border-radius: 10px;
}
.backgroundBanner {
  background-image: url(../assets/img/ConcertBanner.jpeg);
  background-size: cover;
  border: 5px;
  border-color: #1dbee6 !important;
  height: 50vh
}
</style>
