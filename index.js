const getCapacity = (field) => {
	const capacity = field.map((coord, pos) => {
	const peakRight = getPeakRight(field, pos)
	const peakLeft = getPeakLeft(field, pos)
		const peakLow = Math.min(peakRight, peakLeft)
		return peakLow > coord ? peakLow - coord : 0
	})
	return capacity.reduce((total, liters) => total + liters, 0)
}

const getPeakLeft = (field, pos) => {
	return Math.max.apply(null, field.slice(0, pos))
}

const getPeakRight = (field, pos) => {
	return Math.max.apply(null, field.slice(pos +1))
}

const build = (field, bricks) => {
	let builds = []
	for(let i = 0; i < field.length; i++) {
		let newfield = field
			.slice(0, i)
			.concat(field[i] + 1)
			.concat(field.slice(i +1))
		if(bricks === 1) {
			builds = builds.concat([newfield])
		} else { 
			builds = builds.concat(build(newfield, bricks -1))
		}
	}
	return builds
}

let lines
let line = 0
let bricks
let field
process.stdin.on('data', function (data) {
	if(!lines) {
		lines = Number(data) * 2
	} else {
		line++
		if(line % 2 !== 0) {
			bricks = Number(String(data).split(' ')[1])
		} else {
			field = String(data).split(' ').map(Number)
			const builds = build(field, bricks)

			const capacities = builds.map(getCapacity)

			const maxCapacity = Math.max.apply(null, capacities)

			console.log(`Case#${line/2}: ${maxCapacity}`)
		}
		if(line === lines) process.exit(0)
	}		
});