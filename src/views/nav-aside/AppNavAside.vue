<template>
  <v-navigation-drawer 
    v-model="open"
    expand-on-hover
    permanent
    app
  >
    
    <template v-slot:prepend>
      <v-list>

        <v-list-item v-if="false">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item two-line v-else>
          <v-list-item-content>
            <v-list-item-title class="title">PedMatch</v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>

      </v-list>
    </template>

    <v-divider></v-divider>

    <v-list>
      <v-list-item link v-for="page in pages" :key="page.path">
        <v-list-item-icon>
          <v-icon v-html="page.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-title v-html="page.label"></v-list-item-title>
      </v-list-item>
    </v-list>
      
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'app-nav-aside',
  data() {
    return {
      open: false,
      pages: [
        {
          label: 'Actionboard',
          path: '/',
          icon: 'fas fa-check-circle',
        },
        {
          label: 'Patients',
          path: 'patients',
          icon: 'fas fa-users',
        },
        {
          label: 'Laboratories',
          path: 'patients',
          icon: 'fas fa-hospital',
        },
        {
          label: 'Treatment Arms',
          path: 'patients',
          icon: 'fas fa-book',
        },
        {
          label: 'Analytics',
          path: 'patients',
          icon: 'fas fa-chart-pie',
        },
        {
          label: 'Help',
          path: 'patients',
          icon: 'fas fa-question-circle',
        },
      ],
    }
  }
}
</script>

<style>

</style>
