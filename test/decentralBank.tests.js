const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");


require("chai")
.use(require("chai-as-promised"))
.should()

contract('DecentralBank', (accounts) => {
	let tether, rwd


	before(async () => {
		tether = await Tether.new()
		rwd = await RWD.new()

	})


	describe('ezraCoin', async () => {
		it('matches name succesfully', async () => {
			const name = await tether.name()
			assert.equal(name, 'ezraCoin')
		})
	})
	describe('Reward Token', async () => {
		it('matches name succesfully', async () => {
			const name = await rwd.name()
			assert.equal(name, 'Reward Token')
		})
		it('matches symbol succesfully', async () => {
			let rwd = await RWD.new()
			const symbol = await rwd.symbol()
			assert.equal(symbol, 'RWD')
		})
	})
	
})
