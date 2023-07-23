new Vue({
	el: '#app',
	data() {
		return {
			title: 'Big quest',
			steps: [{
				id: '1',
				img: 'https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_760/MTc0MjI3NzYzMjA3NjExOTAw/how-to-draw-a-treasure-chest.webp',
				description: 'Le code se trouve sous la boite en bois.',
				validation: [{code: '12345', stepId: '2'}, {code: '23456', stepId: '3'}]
			}, {
				id: '2',
				img: '',
				description: 'Vous êtes mort.'
			}, {
				id: '3',
				img: '',
				description: 'Vous avez gagné.'
			}],
			journey: {
				steps: ['1'],
				currentIndex: 0
			},
			validationInput: ''
		}
	},
	computed: {
		step() {
			return this.steps.find(step => step.id === this.journey.steps[this.journey.currentIndex])
		}
	},
	methods: {
		validate() {
			let nextStep = this.step.validation?.find(v => v.code === this.validationInput)
			if (!nextStep) {
				// Screen shake
			} else {
				this.stepId = nextStep.stepId
				this.journey.steps.length = this.journey.currentIndex + 1
				this.journey.currentIndex = this.journey.steps.push(nextStep.stepId) - 1
				this.validationInput = ''
			}
		},
		journeyBack() {
			if (!this.journey.currentIndex) return
			this.journey.currentIndex--
		},
		journeyForward() {
			if (this.journey.currentIndex >= this.journey.steps.length - 1) return
			this.journey.currentIndex++
		}
	}
})
