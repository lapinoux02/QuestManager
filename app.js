new Vue({
	el: '#app',
	data() {
		if (/qid=(.{8})/.test(location.search)) {
			var route = 'quest'
		}
		return {
			route: route || 'home'
		}
	},
	methods: {
		handleNav(nav) {
			switch(nav.route) {
			case 'quest':
				var nextURL = `${location.origin}/?qid=${nav.qid}`
				break;
			case 'home':
			default:
				nextURL = `${location.origin}/`
			}

			window.history.replaceState({}, document.title, nextURL)
			this.route = nav.route
		}
	}
})
