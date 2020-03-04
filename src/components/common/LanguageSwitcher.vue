<template>
  <v-btn-toggle v-model="$root.$i18n.locale" mandatory>
    <v-btn value="ua">UA</v-btn>
    <v-btn value="ru">RU</v-btn>
    <v-btn value="en">EN</v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
   name: 'language-switcher',

   data() {
      return {
          langs: ['ua', 'en', 'ru'],
      }
   },
}
</script>

<style>

</style>