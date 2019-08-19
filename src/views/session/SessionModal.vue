<template>
  <v-dialog v-model="visible" width="500" persistent>

    <!-- warning message -->
    <v-card v-if="warning">
      <v-card-title class="headline">Session about to expire!</v-card-title>
      <v-card-text>You will be signed out in {{timeRemaining}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="clearWarning">Stay singed in</v-btn>
      </v-card-actions>
    </v-card>

    <!-- expiration message -->
    <div v-else-if="expiration || outsideExpiration">
      <v-card v-if="expiration">
        <v-card-title class="headline">Session has expired!</v-card-title>
        <v-card-text>Please log back in to continue using website</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$auth.loginRedirect('/')">Log back in</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="outsideExpiration">
        <v-card-title class="headline">You've logged out</v-card-title>
        <v-card-text>Please log back in to continue using website (logged out in another tab)</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$auth.loginRedirect('/')">Log back in</v-btn>
        </v-card-actions>
      </v-card>

    </div>

  </v-dialog>
</template>

<script>
import { createSession, resetSession, destroySession } from '@/services/SessionService'
import moment from 'moment'

let countDownInterval = null
let countDownTime = 120

export default {
  name: 'session-modal',
  created() {
    createSession(this.onIdle, this.onExpiration, this.onOutsideExpired)
  },
  data() {
    return {
      visible: false,
      warning: false,
      expiration: false,
      outsideExpiration: false,
      seconds: countDownTime,
    }
  },
  computed: {
    timeRemaining() {
      return moment.utc(this.seconds * 1000).format('mm:ss')
    },
  },
  methods: {
    onIdle() {
      this.seconds = countDownTime
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
    onOutsideExpired() {
      if (!this.expiration) {
        this.visible = true
        this.warning = false
        this.outsideExpiration = true
      }
    },
    clearWarning() {
      this.visible = false
      this.warning = false
      resetSession()
    },
    startCountDown() {
      if (countDownInterval !== null) {
        clearInterval(countDownInterval)
      }
      countDownInterval = setInterval(() => {
        this.seconds--
        if (this.seconds === 0) {
          this.onExpiration()
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