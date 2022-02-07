import { ethers } from "ethers";

const transformMemberData = (memberData) => {
  return {
    name: memberData.name,
    wokeUp: memberData.wokeUp.toNumber(),
    attempts: memberData.attempts.toNumber(),
    totalStaked: ethers.utils.formatEther(memberData.totalStaked),
    totalClaimed: ethers.utils.formatEther(memberData.totalClaimed),
    fiveAmTokens: memberData.fiveAmTokens.toNumber(),
  };
};

export default transformMemberData;
