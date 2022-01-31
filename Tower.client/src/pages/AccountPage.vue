<template>
  <div class="account container-fluid scrollbar">
    <div class="row">
      <div class="col-12 mt-2">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/img/Logo.png" width="250" class="m-3" alt="" />
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div>
          <p class="green f-16 m-0">My Events</p>
        </div>
        <div
          class="d-flex flex-wrap"
          v-if="towerEvents.length > 0"
        >
          <div class="col-md-3" v-for="e in towerEvents" :key="e.id">
            <Event :towerEvents="e" />
          </div>
        </div>
        <div v-else>
          <p class="fst-italic my-5 fontcolor">"No events created"</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div>
          <p class="green f-16 mt-3 m-0">Upcoming Events</p>
        </div>
        <div class="d-flex flex-wrap ">
          <div class="col-md-12" v-if="attending.length > 0">
            <div class="d-md-flex" v-for="e in attending" :key="e.id">
              <div class="col-12 col-md-11">
                <Event :towerEvents="e.event" />
              </div>
              <div class="col-12 col-md-1 d-md-flex justify-self-center">
                <div class="">
                  <button
                    @click="notAttend(e.eventId, e.id)"
                    class="
                      ms-md-2
                      w-100
                      btn
                      btnattending
                      ps-2
                      mt-2
                      elevation-3
                      border-0
                      mb-3
                    "
                  >
                    Not Attend <i class="ms-2 mdi mdi-18px mdi-human pe-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="fst-italic my-5 fontcolor">
              "Currently not attending any events"
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { attendeesService } from "../services/AttendeesService"
import { eventsService } from "../services/EventsService"
import { AuthService } from "../services/AuthService"
export default {
  props: {
    account: { type: Object, required: true }
  },
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await attendeesService.getMyAttending()
      } catch (error) {
        logger.error
        Pop.toast(error.message, 'error')
      }
    })
    onMounted(async () => {
      try {
        await eventsService.getCreatedEvents(AuthService.userInfo.id)
      } catch (error) {
        logger.error
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      attending: computed(() => AppState.attending),
      towerEvents: computed(() => AppState.towerEvents),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async notAttending(eventId, id) {
        try {
          await attendeesService.notAttendingAccount(eventId, id)
          await eventsService.getCreatedEvents(AuthService.userInfo.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.btnattending {
  font-weight: 500;
  font-size: 15px;
  background-color: #ff8929;
}
.fontcolor {
  color: #a0a2ad;
}
.green {
  color: #72d8a2;
}
.scrollbar {
  overflow-y: scroll;
  height: 100vh;
}
.scrollbar::-webkit-scrollbar {
  width: 0px;
}

.scrollbar::-webkit-scrollbar-track {
  background: #2e2e2e;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #adadad;
  border-radius: 10px;
}
.widmax {
  width: 100vh;
}

.buttonanim {
  border-radius: 4px;
  border: none;
  color: #96d4f1;
  text-align: center;
  font-size: 17px;

  cursor: pointer;
}
.picuser {
  object-fit: cover;
}
.postbtn {
  font-weight: 600;
}
.bggreen {
  background-color: #72d8a2;
}
.bgtransparent {
  background-color: #72d8a200;
  border-color: #72d8a2 !important;
  color: #a5f3c9;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}

</style>
