// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./libraries/Base64.sol";
import "./libraries/CheckTime.sol";
import "./libraries/IterableMapping.sol";

contract FiveAMClub is CheckTime, ERC721 {

   struct MemberAttributes {
    string name;
    string timeZone;
    uint256 wokeUp;
   }

    using IterableMapping for IterableMapping.Map;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    mapping(uint256 => MemberAttributes) public nftHolderAttributes;
    mapping(address => uint256) public nftHolders;
    IterableMapping.Map private stakes;
    IterableMapping.Map private stakedTime;
    IterableMapping.Map private tokensToSpend;

  event MembershipNFTMinted(
    address sender,
    uint256 tokenId
  );

  uint public rewardsPool;

  constructor() ERC721("5AM Club Membership NFT", "5AMFT") payable {
      _tokenIds.increment();
  }
// non-transferable
  function tokenURI(uint256 _tokenId)
    public
    view
    override
    returns (string memory)
  {
    MemberAttributes memory memberAttributes = nftHolderAttributes[_tokenId];

    string memory wokeUp = Strings.toString(memberAttributes.wokeUp);

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
'{"name": "',
      memberAttributes.name,
      ' -- NFT #: ',
      Strings.toString(_tokenId),
      '", "image": "',
      memberAttributes.name,
      '", "wokeUp": "',
      wokeUp,
      '", "timeZone": "',
      memberAttributes.timeZone,
      '", }'
          )
        )
      )
    );

    string memory output = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    return output;
  }

    function checkIfUserHasNFT()
    public
    view
    returns (MemberAttributes memory)
  {
    uint256 userNftTokenId = nftHolders[msg.sender];
    if (userNftTokenId > 0) {
      return nftHolderAttributes[userNftTokenId];
    } else {
      MemberAttributes memory emptyStruct;
      return emptyStruct;
    }
  }

    function mintMembershipNFT(
    string memory _name,
    string memory _timeZone
  ) external {
    require(nftHolders[msg.sender] == 0, "Only one membership per address allowed");
    uint256 newItemId = _tokenIds.current();

    _safeMint(msg.sender, newItemId);

    nftHolderAttributes[newItemId] = MemberAttributes({
      name: _name,
      timeZone: _timeZone,
      wokeUp: 0
    });

    nftHolders[msg.sender] = newItemId;

    _tokenIds.increment();

    emit MembershipNFTMinted(msg.sender, newItemId);
  }

  modifier areAllConditionsMet() {
      require(getHour(block.timestamp + 3600) >= 6, "Too early");
      require(nftHolders[msg.sender] > 0, "You need membership to stake");
      require(msg.value >= 0.0001 ether, "Please stake more");
      require(stakes.get(msg.sender) == 0, "You have already staked");
      _;
  }

  function stakeCommitment() public payable areAllConditionsMet {
      stakes.set(msg.sender, msg.value);
      stakedTime.set(msg.sender, block.timestamp);
  }

    modifier isExpired() {
      require(block.timestamp < (stakedTime.get(msg.sender) + (24 * 3600)), "Too late");
      _;
  }

  function withdrawCommitment() external {
      require(stakes.get(msg.sender) > 0, "You haven't staked anything");
      require(getHour(block.timestamp + 3600) == 5, "Too early or late");
      require(nftHolders[msg.sender] > 0, "You need membership to stake");
      uint amountToSendBack = stakes.get(msg.sender);
      
      stakes.set(msg.sender, 0);

      uint256 idOfMemberNft = nftHolders[msg.sender];
      MemberAttributes storage member = nftHolderAttributes[idOfMemberNft];

      member.wokeUp = member.wokeUp + 1;

      uint currentTokens = tokensToSpend.get(msg.sender) + 1;

      tokensToSpend.set(msg.sender, currentTokens);

      (bool sent, ) = msg.sender.call{value: amountToSendBack}("");
      require(sent, "Failed to send Matic");
  }

  function claimReward() external {
    require(tokensToSpend.get(msg.sender) >= 1, "Not enough tokens to claim reward");

    uint membersEligibleForReward = 0;

    for (uint i = 0; i < stakedTime.size(); i++) {
      address key = stakedTime.getKeyAtIndex(i);

      if (block.timestamp > (stakedTime.get(key) + 24 * 3600)) {
        rewardsPool += stakes.get(key);
        stakes.set(key, 0);
      }
    }

    for (uint i = 0; i < stakes.size(); i++) {
      address key = tokensToSpend.getKeyAtIndex(i);

      if (tokensToSpend.get(key) >= 30) {
        membersEligibleForReward++;
      }
    }

    uint reward = rewardsPool / membersEligibleForReward;

    rewardsPool -= reward;

     uint currentTokens = tokensToSpend.get(msg.sender) - 1;

     tokensToSpend.set(msg.sender, currentTokens);

    (bool sent, ) = msg.sender.call{value: reward}("");
    require(sent, "Failed to send Matic");

  }

}