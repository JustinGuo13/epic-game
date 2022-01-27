const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
	const gameContract = await gameContractFactory.deploy(
		['All Might', 'Saitama', 'Goku'], // Names
		[
			'https://i.pinimg.com/originals/3c/19/76/3c19761ad232a6b6c799bf8a40aafa47.jpg', // Images
			'https://preview.redd.it/809iou27pob71.jpg?auto=webp&s=7a345ac4aac0964a74788bbef71597dd6e6e7f71',
			'https://i.pinimg.com/originals/f7/de/cd/f7decda28c103d54294920aa9eb095a7.jpg',
		],
		[13000, 15000, 14000], // HP values
		[100000, 80000, 90000], // Attack damage values
		'Beerus', // Boss name
		'https://qph.fs.quoracdn.net/main-qimg-75d1ecf38c3dd5a96dc248a6181be21c', // Boss image
		100000000, // Boss hp
		1000 // Boss attack damage
	);
	await gameContract.deployed();
	console.log('Contract deployed to:', gameContract.address);

	let txn;
	// We only have three characters.
	// an NFT w/ the character at index 2 of our array.
	txn = await gameContract.mintCharacterNFT(2);
	await txn.wait();

	txn = await gameContract.attackBoss();
	await txn.wait();

	txn = await gameContract.attackBoss();
	await txn.wait();

	console.log('Done!');
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
