import React, { useEffect, useState } from "react";
import Section from "./Section";
import contract from "../contract";
import web3 from "../web3";

function LiveCampaigns({ sender,rerenderTrigger }) {
  const [campaigns, setCampaigns] = useState([]);

  const [isOwner, setIsOwner] = useState(false); // Track ownership state

  useEffect(() => {
    const fetchOwner = async () => {
      if (!sender) return;
      try {
        const owner = await contract.methods
          .getOwnersAddress()
          .call({ from: sender });
        setIsOwner(owner.toLowerCase() === sender.toLowerCase());
      } catch (error) {
        console.error("Error checking owner:", error);
      }
    };

    fetchOwner();

    const fetchData = async () => {
      if (!sender) return;
      try {
        const campaigns = await contract.methods
          .getActiveCampaigns()
          .call({ from: sender });

        setCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchData();
  }, [sender, rerenderTrigger]);

  const pledge = async (campaign) => {
    try {
      console.log(campaign.sharePrice);
      await contract.methods
        .fundCampaign(campaign.id, 1)
        .send({
          from: sender,
          value: campaign.sharePrice,
        });
      alert("Pledge successful");
    } catch (error) {
      console.error(error);
      alert("Pledge failed");
    }
  };
  const cancelCampaign = async (campaign) => {
    await contract.methods.cancelCampaign(campaign.id).send({
      from: sender,
    });
  };

  const fulfillCampaign = async (campaign) => {
    await contract.methods.completeCampaign(campaign.id).send({
      from: sender,
    });
  };

  if (campaigns.length === 0) {
    return <Section title={"Live Campaigns"}>No campaigns found</Section>;
  }

  return (
    <Section title={"Live Campaigns"}>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Entepreneur</th>
            <th>Title</th>
            <th>Price</th>
            <th>Backers</th>
            <th>Pledges Left</th>
            <th>Your Pledges</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-b-2 border-gray-700">
              <td>{campaign.entrepreneur}</td>
              <td>{campaign.id}</td>
              <td>{web3.utils.fromWei(campaign.sharePrice,"ether")}</td>
              <td>{campaign.noInvestors}</td>
              <td>{campaign.sharesLeft}</td>
              <td>{campaign.investorShares}</td>
              <td className=" flex gap-4 items-center ">
                <button
                  onClick={() => pledge(campaign)}
                  className="rounded-md bg-green-500 py-1 my-2 px-2 text-sm hover:bg-green-700 transition-colors duration-200"
                >
                  Pledge
                </button>
                {(sender.toLowerCase() ===
                  campaign.entrepreneur.toLowerCase() ||
                  isOwner) && (
                  <button
                    onClick={() => cancelCampaign(campaign)}
                    className="rounded-md bg-red-500 py-1 px-2 text-sm hover:bg-red-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
                {(sender.toLowerCase() ===
                  campaign.entrepreneur.toLowerCase() ||
                  isOwner) && (
                  <button
                    onClick={() => fulfillCampaign(campaign)}
                    disabled={campaign.sharesLeft > 0}
                    className={`rounded-md bg-blue-600  text-sm hover:bg-blue-800 ${
                      campaign.sharesLeft > 0 ? "opacity-20" : "opacity-100"
                    } py-1 px-2 transition-colors duration-200`}
                  >
                    Fulfill
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

export default LiveCampaigns;
