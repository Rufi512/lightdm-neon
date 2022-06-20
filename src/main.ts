import App from './App.svelte';
import './utils/Mock';
import { connectSignals } from './signals';
import { MyTheme } from './theme';
import { selectedSession } from './store/runtime';
import type { LightDMUser } from 'nody-greeter-types';

function initGreeter() {
	console.debug("the web greeter is ready, initializing...");
	console.debug("lightdm", window.lightdm);
	console.debug("greeter_config", window.greeter_config);
	window.theme = new MyTheme();
	connectSignals();
	new App({
		target: document.body,
		props: {}
	});

	/*window.theme_utils.dirlist("/usr/share/web-greeter/themes/svelte/images", true, (files) => {
		console.log(files);
	});

	window.theme_utils.dirlist(window.greeter_config.branding.background_images_dir, true, (files) => {
		console.log(files);
	});*/

	let default_user: LightDMUser = null;
	if (window.lightdm.users.length === 1) {
		default_user = window.lightdm.users[0];
	}

	let default_session: string = window.lightdm.default_session;
	if (!default_session) {
		if (default_user != null && default_user.session) {
			default_session = default_user.session;
		} else if (window.lightdm.sessions.length > 0) {
			default_session = window.lightdm.sessions[0].key;
		} else {
			console.warn("no session found to choose from?");
		}
	}

	console.debug(`default_session is '${default_session}'`);
	selectedSession.update(_ => default_session);

	if (default_user != null) {
		window.lightdm.authenticate(default_user.username)
	}	
};
  
window.addEventListener("GreeterReady", initGreeter);