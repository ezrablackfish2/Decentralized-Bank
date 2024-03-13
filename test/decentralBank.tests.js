const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");


require("chai")
.use(require("chai-as-promised"))
.should()

contract('DecentralBank', ([owner, customer]) => {
	let tether, rwd, decentralBank


	function tokens(number) {
		return web3.utils.toWei(number, 'ether')
	}

	before(async () => {

		tether = await Tether.new()
		rwd = await RWD.new()
		decentralBank = await DecentralBank.new(rwd.address, tether.address)

		await rwd.transfer(decentralBank.address, tokens('1000000'))
		await tether.transfer(customer, tokens('100'), {from: owner})

	})


	describe('ezraCoin Deployment', async () => {
		it('matches name succesfully', async () => {
			const name = await tether.name()
			assert.equal(name, 'ezraCoin')
		})
	})
	describe('Reward Token Deployment', async () => {
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
	describe('Decentral Bank Deployment', async () => {
		it('matches name succesfully', async () => {
			const name = await decentralBank.name()
			assert.equal(name, 'Decentral Bank')
		})
		it('contract has tokens', async () => {
			let balance = await rwd.balanceOf(decentralBank.address)
			assert.equal(balance, tokens('1000000'))
		})

	describe('Yield Farming', async () => {
		it('reward tokens for staking', async () => {
			let result

			result = await tether.balanceOf(customer)
			assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance')
		})
	})


	})
	
})
