import web3 from './web3';
const address = '0x6f30A472501cb385E08ABFD180E3e85922482D76';
// const address = '0xB37b91683E603eec86bd69D5324d5471D093C87D';
const abi =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "entrepreneur",
				"type": "address"
			}
		],
		"name": "banEntrepreneur",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			}
		],
		"name": "CampaignCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			}
		],
		"name": "CampaignCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "entrepreneur",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "CampaignCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			}
		],
		"name": "cancelCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			}
		],
		"name": "completeCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ContractDestroyed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "sharePrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sharesRequired",
				"type": "uint256"
			}
		],
		"name": "createCampaign",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "destroyContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FeesWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "fundCampaign",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "InvestorRefunded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnerChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "PledgeMade",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "refundInvestor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setIsDestroyedToFalse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "campaignCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "campaigns",
		"outputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "entrepreneur",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "sharePrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sharesRequired",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sharesSold",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isCompleted",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isCancelled",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "campaignTitlesCreated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getActiveCampaigns",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "entrepreneur",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "sharePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesSold",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "investorShares",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesLeft",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "noInvestors",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCompleted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCancelled",
						"type": "bool"
					}
				],
				"internalType": "struct Crowdfunding.CampaignReturnType[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBannedEnteprenuers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			}
		],
		"name": "getCampaignInvestors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "investor",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "shares",
						"type": "uint256"
					}
				],
				"internalType": "struct Crowdfunding.InvestorData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			}
		],
		"name": "getCampaignTitle",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCanceledCampaigns",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "entrepreneur",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "sharePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesSold",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "investorShares",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesLeft",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "noInvestors",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCompleted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCancelled",
						"type": "bool"
					}
				],
				"internalType": "struct Crowdfunding.CampaignReturnType[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCollectedFees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCompletedCampaigns",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "entrepreneur",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "sharePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesSold",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "investorShares",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sharesLeft",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "noInvestors",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCompleted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCancelled",
						"type": "bool"
					}
				],
				"internalType": "struct Crowdfunding.CampaignReturnType[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getInvestorsData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "campaignId",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "shares",
						"type": "uint256"
					}
				],
				"internalType": "struct Crowdfunding.Investments[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getIsDestroyed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwnersAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSender",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
// const abi = [
    
//         {
//             "inputs": [],
//             "stateMutability": "nonpayable",
//             "type": "constructor"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "CampaignCancelled",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "CampaignCompleted",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "entrepreneur",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "string",
//                     "name": "title",
//                     "type": "string"
//                 }
//             ],
//             "name": "CampaignCreated",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "investor",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "amount",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "InvestorRefunded",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "investor",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "shares",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "PledgeMade",
//             "type": "event"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "entrepreneur",
//                     "type": "address"
//                 }
//             ],
//             "name": "banEntrepreneur",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "campaignCount",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "campaigns",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "id",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "entrepreneur",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "title",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "sharePrice",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "sharesRequired",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "sharesSold",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "bool",
//                     "name": "isCompleted",
//                     "type": "bool"
//                 },
//                 {
//                     "internalType": "bool",
//                     "name": "isCancelled",
//                     "type": "bool"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "cancelCampaign",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "newOwner",
//                     "type": "address"
//                 }
//             ],
//             "name": "changeOwner",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "completeCampaign",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "title",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "sharePrice",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "sharesRequired",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "createCampaign",
//             "outputs": [],
//             "stateMutability": "payable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "destroyContract",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "shares",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "fundCampaign",
//             "outputs": [],
//             "stateMutability": "payable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "getActiveCampaigns",
//             "outputs": [
//                 {
//                     "internalType": "uint256[]",
//                     "name": "",
//                     "type": "uint256[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "getBannedEnteprenuers",
//             "outputs": [
//                 {
//                     "internalType": "address[]",
//                     "name": "",
//                     "type": "address[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "getCampaignInvestors",
//             "outputs": [
//                 {
//                     "components": [
//                         {
//                             "internalType": "address",
//                             "name": "investor",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "shares",
//                             "type": "uint256"
//                         }
//                     ],
//                     "internalType": "struct Crowdfunding.InvestorData[]",
//                     "name": "",
//                     "type": "tuple[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "campaignId",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "getCampaignTitle",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "",
//                     "type": "string"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "getCanceledCampaigns",
//             "outputs": [
//                 {
//                     "internalType": "uint256[]",
//                     "name": "",
//                     "type": "uint256[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "getCompletedCampaigns",
//             "outputs": [
//                 {
//                     "internalType": "uint256[]",
//                     "name": "",
//                     "type": "uint256[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "getInvestorsData",
//             "outputs": [
//                 {
//                     "components": [
//                         {
//                             "internalType": "uint256",
//                             "name": "campaignId",
//                             "type": "uint256"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "shares",
//                             "type": "uint256"
//                         }
//                     ],
//                     "internalType": "struct Crowdfunding.Investments[]",
//                     "name": "",
//                     "type": "tuple[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "refundInvestor",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "withdrawFees",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         }
//     ]
const contract = new web3.eth.Contract(abi, address);
export default contract;
