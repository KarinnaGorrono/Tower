
<template >
  <main class="d-flex background">
    <div class="col-12 col-md-11">
      <router-view :account="account" />
    </div>
    <div class="col-1 mobieview">
      <Navigation :account="account" />
    </div>
  </main>
  <footer></footer>
  <CreateEvent />
  <OffCanvasProfile />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      AppState: computed(() => AppState),
      account: computed(() => AppState.account)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
.background {
  background-color: #2a2d3a;
}
p {
  font-family: "Nunito", sans-serif;
}
@media only screen and (max-width: 600px) {
  .mobieview {
    display: none;
  }
}
</style>