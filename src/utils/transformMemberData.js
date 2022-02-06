const transformMemberData = (memberData) => {
  return {
    name: memberData.name,
    commitments: memberData.wokeUp.toNumber(),
    timeZone: memberData.timeZone.toNumber(),
  };
};

export default transformMemberData;
