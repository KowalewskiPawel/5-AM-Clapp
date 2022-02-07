(async () => {
  try {
    const FiveAmClapp = await ethers.getContractFactory("FiveAmClapp", {
      libraries: {
        IterableMapping: "0x50a24F1eDF3Db610b70eebeD7CAf0a0aca9ef3A6",
        CheckTime: "0x477Ca12478Cc2Cc4b57e7A62dE451974c35345A3",
      },
    });

    const deployedToken = await FiveAmClapp.deploy();

    console.log("Contract deployed to address:", deployedToken.address);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
