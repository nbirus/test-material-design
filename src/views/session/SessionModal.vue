<template>
  <v-dialog v-model="visible" width="500" persistent>
    <v-card v-if="warning">
      <v-card-title class="headline">Session about to expire!</v-card-title>
      <v-card-text>You will be signed out in {{seconds}} seconds</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="clearWarning">Stay singed in</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title class="headline">Session has expired!</v-card-title>
      <v-card-text>Please log back in to continue using website</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$auth.loginRedirect('/')">Log back in</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { initSession, destroySession, clearWarning } from '@/services/SessionService'
let countDownInterval

export default {
  name: 'session-modal',
  created() {
    initSession(this.onWarning, this.onExpiration)
  },
  data() {
    return {
      visible: false,
      warning: false,
      expiration: false,
      seconds: 120,
    }
  },
  methods: {
    onWarning() {
      this.seconds = 120
      this.visible = true
      this.warning = true
      this.startCountDown()
    },
    onExpiration() {
      this.visible = true
      this.warning = false
      this.expiration = true
      this.$auth.logout()
    },
    clearWarning() {
      this.visible = false
      this.warning = false
      clearWarning()
    },
    startCountDown() {
      if (countDownInterval !== null) {
        clearInterval(countDownInterval)
      }
      countDownInterval = setInterval(() => {
        this.seconds--
        if (this.seconds === 0) {
          clearInterval(countDownInterval)
        }
      }, 1000)
    },
  },
  beforeDestroy() {
    destroySession()
  },
}
</script>

<style>
.session-modal {
  position: absolute;
}
</style>
