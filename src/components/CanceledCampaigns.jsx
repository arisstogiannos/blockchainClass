import React, { useEffect, useState } from "react";
import Section from "./Section";
import contract from "../contract";
import Loader from "./Loader";
import web3 from "../web3";

function CanceledCampaigns({ sender, rerenderTrigger }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [campaignsToClaim, setCampaignsToClaim] = useState(false);

  const refund = async () => {
    setLoading(true);
    try {
      await contract.methods.refundInvestor().send({
        from: sender,
      });
      alert("Refund successful");
    } catch (error) {
      console.error(error);
      alert("Refund failed");
    }
    setLoading(false);
  };

  const checkCampaignsToClaim = async (campaigns) => {
    try {
      const senderCampaigns = await contract.methods.getInvestorsData().call({
        from: sender,
      });

      var hasSharesInCancelledCampaigns = false;
      senderCampaigns.forEach((senderCampaign) => {
        campaigns.forEach((canceledCampaign) => {
          if (senderCampaign.campaignId === canceledCampaign.id) {
            hasSharesInCancelledCampaigns = true;
          }
        });
      });

      setCampaignsToClaim(hasSharesInCancelledCampaigns);
    } catch (error) {
      console.error("Error fetching sender campaigns:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!sender) return;

      try {
        const campaigns = await contract.methods
          .getCanceledCampaigns()
          .call({ from: sender });

        setCampaigns(campaigns);

        checkCampaignsToClaim(campaigns);
      } catch (error) {
        console.error("Error fetching canceled campaigns:", error);
      }
    };

    fetchData();
  }, [sender, rerenderTrigger]);

  if (campaigns.length === 0) {
    return <Section title={"Canceled Campaigns"}>No campaigns found</Section>;
  }

  return (
    <Section title={"Canceled Campaigns"}>
      <table className="w-3/4    ">
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
        <tbody className="border-separate border-spacing-y-4">
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-b-2 border-b-gray-700 ">
              <td>{campaign.entrepreneur}</td>
              <td>{campaign.id}</td>
              <td>{web3.utils.fromWei(campaign.sharePrice,"ether")}</td>
              <td>{campaign.noInvestors}</td>
              <td>{campaign.sharesLeft}</td>
              <td>{campaign.investorShares}</td>
              <td>
                <div className="py-5"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="relative group h-fit w-fit">
        <button
          onClick={() => refund()}
          disabled={!campaignsToClaim}
          className={`${
            !campaignsToClaim ? "opacity-20" : "hover:bg-blue-800"
          } bg-blue-600 rounded-md w-28 p-1 font-medium transition-colors duration-200`}
        >
          {loading ? <Loader /> : "Claim"}
        </button>
        {!campaignsToClaim && (
          <div className="absolute left-full transform translate-x-5 top-1/2 -translate-y-1/2  hidden group-hover:block bg-gray-800 text-white text-xs rounded-md p-2 whitespace-nowrap">
            No campaigns available to claim
          </div>
        )}
      </div>
    </Section>
  );
}

export default CanceledCampaigns;
