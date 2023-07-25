Vue.component('home', {
	template: `<div class="home">
		<div class="title">Home</div>
		<div class="content">
			<div class="list">
				<div class="list-title">My quests</div>
				<div class="list-item quest-line" v-for="quest in quests">
					<div>{{quest.title}}</div>
					<div class="quest-actions">
						<div class="material-symbols-outlined" @click="goToQuest(quest.id)">resume</div>
						<div class="material-symbols-outlined" @click="removeQuest(quest.id)">close</div>
					</div>
				</div>
			</div>
		</div>
	</div>`,
	data() {
		return {
			quests: this.getQuetsFromLocalStorage()
		}
	},
	methods: {
		goToQuest(questId) {
			this.$emit('nav', {route: 'quest', qid: questId})
		},
		removeQuest(questId) {
			if (confirm('Do you really want to delete this quest ? Its progress will be lost forever !')) {
				localStorage.removeItem(questId)
				this.quests = this.getQuetsFromLocalStorage()
			}
		},
		getQuetsFromLocalStorage() {
			return Object.keys(localStorage).map(key => ({...JSON.parse(localStorage.getItem(key)), id: key})).filter(object => object.title && object.journey && object.steps)
		}
	}
})