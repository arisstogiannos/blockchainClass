import React, { useEffect, useState } from "react";
import Section from "./Section";
import contract from "../contract";
import web3 from "../web3";

function Fulfilled({sender,rerenderTrigger}) {
  const [campaigns, setCampaigns] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    if (!sender) return;
      try {
    const campaigns = await contract.methods.getCompletedCampaigns().call({from: sender});
    setCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching completed campaigns:", error);
      }

  }
  fetchData();
  }, [sender,rerenderTrigger]);
  
  if(campaigns.length === 0){
    return <Section title={"FulFilled Campaigns"}>No campaigns found</Section>
  }

  return (
    <Section title={"FulFilled Campaigns"}>
    <table className="w-3/4  ">
        <thead>
          <tr className="text-left">
            <th>Entepreneur</th>
            <th>Title</th>
            <th>Price</th>
            <th>Backers</th>
            <th>Pledges Left</th>
            <th>Your Pledges</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-b-2 border-gray-700  ">
              <td>{campaign.entrepreneur}</td>
              <td>{campaign.id}</td>
              <td>{web3.utils.fromWei(campaign.sharePrice,"ether")}</td>
              <td>{campaign.noInvestors}</td>
              <td>{campaign.sharesLeft}</td>
              <td>{campaign.investorShares}</td>
              <td><div className="py-5"></div></td>
              
            
            
            </tr>
          ))}
         
        </tbody>
      </table>
  </Section>
  )
}

export default Fulfilled