import Vue from 'vue';
import VuetifyToast from 'vuetify-toast-snackbar';
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
});

Vue.use(VuetifyToast, {
	x: 'center', // default
	y: 'top', // default
	color: 'info', // default
	classes: [
		'body-2'
	],
	timeout: 3000, // default
	dismissable: true, // default
	autoHeight: false, // default
	multiLine: false, // default
	vertical: false, // default
	queueable: true, // default
	showClose: false, // default
	shorts: {
		custom: {
			color: 'purple'
		}
	},
	property: '$toast' // default
});

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
	iconfont: 'mdi',
  },
});
