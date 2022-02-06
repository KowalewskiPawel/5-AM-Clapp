// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./libraries/Base64.sol";
import "./libraries/CheckTime.sol";
import "./libraries/IterableMapping.sol";

contract FiveAmClub is ERC721 {
    struct MemberAttributes {
        string name;
        uint8 timeZone;
        uint256 wokeUp;
    }

    uint256 constant SECONDS_IN_HOUR = 3600;

    using SafeMath for uint256;
    using SafeMath for uint8;
    using SafeMath for uint256;

    using CheckTime for uint;

    using IterableMapping for IterableMapping.Map;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    mapping(uint256 => MemberAttributes) public nftHolderAttributes;
    mapping(address => uint256) public nftHolders;
    IterableMapping.Map private stakes;
    IterableMapping.Map private stakedTime;
    IterableMapping.Map private tokensToSpend;

    event MembershipNFTMinted(address sender, uint256 tokenId);

    uint256 public rewardsPool;

    constructor() payable ERC721("5AM Club Membership NFT", "5AMFT") {
        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        MemberAttributes memory memberAttributes = nftHolderAttributes[
            _tokenId
        ];

        string memory wokeUp = Strings.toString(memberAttributes.wokeUp);
        string memory timeZone = Strings.toString(memberAttributes.timeZone);
        string memory logo = "ipfs://Qmei6uCXEWdBJhnfC1QbxGcdSo2TcQGfgCvEMWksMbQZnu";

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        memberAttributes.name,
                        " -- NFT #: ",
                        Strings.toString(_tokenId),
                        '", "image": "',
                        logo,
                        '", "wokeUp": "',
                        wokeUp,
                        '", "timeZone": "',
                        timeZone,
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

    function checkIfUserHasNFT() public view returns (MemberAttributes memory) {
        uint256 userNftTokenId = nftHolders[msg.sender];
        if (userNftTokenId > 0) {
            return nftHolderAttributes[userNftTokenId];
        } else {
            MemberAttributes memory emptyStruct;
            return emptyStruct;
        }
    }

    function mintMembershipNFT(string memory _name, uint8 _timeZone) external {
        require(
            nftHolders[msg.sender] == 0,
            "Only one membership per address allowed"
        );
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
        uint256 idOfMemberNft = nftHolders[msg.sender];
        MemberAttributes storage member = nftHolderAttributes[idOfMemberNft];
        uint256 membersTimeZone = member.timeZone;

        if (membersTimeZone < 13) {
            require(
                CheckTime.getHour(
                    block.timestamp.add(membersTimeZone.mul(SECONDS_IN_HOUR))
                ) >= 6,
                "Too early"
            );
        }

        if (membersTimeZone >= 13) {
            uint256 timeToDecrease = membersTimeZone.sub(12);
            require(
                CheckTime.getHour(
                    block.timestamp.sub(timeToDecrease.mul(SECONDS_IN_HOUR))
                ) >= 6,
                "Too early"
            );
        }

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
        require(
            block.timestamp <
                (stakedTime.get(msg.sender).add(SECONDS_IN_HOUR.mul(24))),
            "Too late"
        );
        _;
    }

    modifier isMember() {
        require(nftHolders[msg.sender] > 0, "You need membership to stake");
        _;
    }

    function withdrawCommitment() external isMember {
        require(stakes.get(msg.sender) > 0, "You haven't staked anything");

        uint256 idOfMemberNft = nftHolders[msg.sender];
        MemberAttributes storage member = nftHolderAttributes[idOfMemberNft];

        uint256 membersTimeZone = member.timeZone;

        if (membersTimeZone < 13) {
            require(
                CheckTime.getHour(
                    block.timestamp.add(membersTimeZone.mul(SECONDS_IN_HOUR))
                ) == 5,
                "Too early or late"
            );
        }

        if (membersTimeZone >= 13) {
            uint256 timeToDecrease = membersTimeZone.sub(12);
            require(
                CheckTime.getHour(
                    block.timestamp.sub(timeToDecrease.mul(SECONDS_IN_HOUR))
                ) == 5,
                "Too early or late"
            );
        }

        uint256 amountToSendBack = stakes.get(msg.sender);

        stakes.set(msg.sender, 0);

        member.wokeUp = member.wokeUp.add(1);

        uint256 currentTokens = tokensToSpend.get(msg.sender).add(1);

        tokensToSpend.set(msg.sender, currentTokens);

        (bool sent, ) = msg.sender.call{value: amountToSendBack}("");
        require(sent, "Failed to send Matic");
    }

    function claimReward() external isMember {
        require(
            tokensToSpend.get(msg.sender) >= 30,
            "Not enough tokens to claim reward"
        );

        uint256 membersEligibleForReward = 0;

        for (uint256 i = 0; i < stakedTime.size(); i++) {
            address key = stakedTime.getKeyAtIndex(i);

            if (
                block.timestamp >
                (stakedTime.get(key).add(SECONDS_IN_HOUR.mul(24)))
            ) {
                rewardsPool = rewardsPool.add(stakes.get(key));
                stakes.set(key, 0);
            }
        }

        require(rewardsPool > 0, "Rewards Pool empty :(");

        for (uint256 i = 0; i < stakes.size(); i++) {
            address key = tokensToSpend.getKeyAtIndex(i);

            if (tokensToSpend.get(key) >= 30) {
                membersEligibleForReward++;
            }
        }

        uint256 reward = rewardsPool.div(membersEligibleForReward);

        rewardsPool = rewardsPool.sub(reward);

        uint256 currentTokens = tokensToSpend.get(msg.sender).sub(1);

        tokensToSpend.set(msg.sender, currentTokens);

        (bool sent, ) = msg.sender.call{value: reward}("");
        require(sent, "Failed to send Matic");
    }
}
