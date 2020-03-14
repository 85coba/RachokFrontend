<template>
  <div fluid>
    <section>
      <v-parallax src="../assets/background2.jpg" height="500">
        <v-layout column align-center justify-center class="white--text">
          <h1
            class="white--text mb-2 display-1 text-xs-center"
            style="font-weight: 900; text-shadow: 3px 2px #000000"
          >{{ $t('home.intro.header_1') }}</h1>
          <div
            class="white--text subheading mb-3 text-xs-center"
            style="font-weight: 900; text-shadow: 2px 2px #000000"
          >{{ $t('home.intro.header_2') }}</div>
          <v-btn
            class="yellow"
            large
            href="/pre-made-themes"
          >{{ $t('home.btn.find') }}</v-btn>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center class="mt-5">
            <div class="headline">Are you amazed? Stay tuned!</div>
            <br />
            <div>We are lunching the beta in a few time. If you want to be one of the first Endorfine users we will email you as soon as we're ready. In the beginning only few people will test before the launch. Let us know how Endorfine will help you!</div>
          </v-flex>
          <v-flex xs8 offset-xs2>
            <v-card class="elevation-0 transparent"></v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    
    <section>
      <v-row>
        <v-col cols="8">
          <RequestForm></RequestForm>
        </v-col>
        <v-col>
        </v-col>
      </v-row>  
    </section>

    <section>
      <v-parallax src="../assets/background.jpg" height="380">
        <v-layout column align-center justify-center>
          <div
            class="headline white--text mb-3 text-xs-center"
          >We are dropping cool news and opportunities on socials</div>
        </v-layout>
      <v-layout justify-center>
              <v-icon x-large dark>mdi-facebook</v-icon>
              <v-icon x-large dark>mdi-telegram</v-icon>
              <v-icon x-large dark>mdi-email</v-icon>
            </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Company info</div>
              </v-card-title>
              <v-card-text>We are not a company. We hate companies. Just imagine us like the guys from the Silicon Valley series.</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">We are hiring</div>
              </v-card-title>
              <v-card-text>Are you a creative person? Do you like techy stuff? Complete the email form by writing your skills and interests</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section>
      <v-container>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <v-footer class="blue darken-2">
      <v-layout row wrap align-center>
        <v-flex xs12 class="text-xs-center">
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">mdi-heart</v-icon>using
            <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
import RequestForm from '../components/home/RequestForm';
export default {
  name: "HomeLending",
  components: {
    RequestForm
  },

  data: function() {
    return {

    };
  },
  methods: {
    subscribe: function() {
      this.subscribed = !this.subscribed;
    }
  },

  computed: {
    imgHeight: function() {
      var offset = 320;
      return this.pageHeight - offset;
    }
  }
};
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
