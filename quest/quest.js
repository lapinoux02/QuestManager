Vue.component('quest', {
	template: `<div class="quest screen">
		<div class="title">{{title}}<div class="material-symbols-outlined home-button" @touchstart="goToHome">home</div></div>
		<div class="content">
			<img v-if="step.img" :src="step.img">
			<div>{{step.description}}</div>
		</div>
		<div class="quest-navigation">
			<div class="material-symbols-outlined nav nav-left" @touchstart="journeyBack">navigate_before</div>
			<div class="nav-validation">
				<input type="text" class="validation-inut" v-model="validationInput" maxlength="5">
				<div class="material-symbols-outlined validation-button" @touchstart="validate">check</div>
			</div>
			<div class="material-symbols-outlined nav nav-right" @touchstart="journeyForward">navigate_next</div>
		</div>
	</div>`,
	data() {
		return {
			questId: location.search.match(/qid=(.{8})/)[1],
			title: '',
			steps: [],
			journey: {
				steps: [],
				currentIndex: -1
			},
			validationInput: ''
		}
	},
	async created() {
		if (!this.questId || this.questId.length !== 8) return

		let quest = this.loadQuestFromStorage(this.questId)
		if (!quest) {
			const AXIOS = axios.create({baseURL: 'http://192.168.1.36:9000'})
			quest = (await AXIOS.get(`/quest/${this.questId}`)).data
		}
		this.title = quest.title
		this.steps = quest.steps
		this.journey = quest.journey
		this.storeQuestIntoStorage()
	},
	computed: {
		step() {
			return this.steps.find(step => step.id === this.journey.steps[this.journey.currentIndex]) || {}
		}
	},
	methods: {
		goToHome() {
			this.$emit('nav', {route: 'home'})
		},
		validate() {
			let nextStep = this.step.validation?.find(v => v.code === this.validationInput)
			if (!nextStep) {
				// Screen shake
				this.$el.animate([{transform: 'rotateZ(0deg)'}, {transform: 'rotateZ(2deg)', offset: 0.33}, {transform: 'rotateZ(-2deg)', offset: 0.66}, {transform: 'rotateZ(0deg)'}], {duration: 100, iterations: 3})
			} else {
				this.stepId = nextStep.stepId
				this.journey.steps.length = this.journey.currentIndex + 1 // Remove the next steps if there are
				this.journey.currentIndex = this.journey.steps.push(nextStep.stepId) - 1
				this.validationInput = ''
			}
			this.storeQuestIntoStorage()
		},
		journeyBack() {
			if (!this.journey.currentIndex) return
			this.journey.currentIndex--
		},
		journeyForward() {
			if (this.journey.currentIndex >= this.journey.steps.length - 1) return
			this.journey.currentIndex++
		},
		storeQuestIntoStorage() {
			localStorage.setItem(this.questId, JSON.stringify({title: this.title, steps: this.steps, journey: this.journey}))
		},
		loadQuestFromStorage() {
			return JSON.parse(localStorage.getItem(this.questId))
		}
	}
})