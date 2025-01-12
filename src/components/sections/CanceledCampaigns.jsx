import React, { useEffect, useState } from "react";
import Section from "../Section";
import contract from "../../contract";
import Loader from "../Loader";
import web3 from "../../web3";
import  { Component } from 'react';

class CanceledCampaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: [],
      pending: false,
      hasCampaignsToClaim: false,
    };

    this.refund = this.refund.bind(this);
    this.checkCampaignsToClaim = this.checkCampaignsToClaim.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  // Επιστροφή των χρημάτων στον επενδυτή όταν πατηθεί το κουμπί claim
  async refund() {
    // Κρατάμε το pending state σε true κατά την διάρκεια της διαδικασίας για να εμφανιστεί το Loader
    this.setState({ pending: true });

    try {
      await contract.methods.refundInvestor().send({
        from: this.props.sender,
      });
      alert("Refund successful");
    } catch (error) {
      console.error(error);
      alert("Refund failed");
    }

    // Επαναφορά του pending state σε false μετά την ολοκλήρωση της διαδικασίας
    this.setState({ pending: false });
  }

  // Έλεγχος αν ο επενδυτής έχει επενδύσει σε κάποια/ες από τις ακυρωμένες καμπάνιες
  async checkCampaignsToClaim(campaigns) {
    try {
      const userCampaigns = await contract.methods.getInvestorsData().call({
        from: this.props.sender,
      });

      let hasSharesInCancelledCampaigns = false;
      userCampaigns.forEach((userCampaign) => {
        campaigns.forEach((canceledCampaign) => {
          if (userCampaign.campaignId === canceledCampaign.id) {
            hasSharesInCancelledCampaigns = true;
          }
        });
      });

      this.setState({ hasCampaignsToClaim: hasSharesInCancelledCampaigns });
    } catch (error) {
      console.error("Error fetching sender campaigns:", error);
    }
  }

  // Ανάκτηση των ακυρωμένων καμπανιών
  async fetchData() {
    const { sender } = this.props;
    if (!sender) return;

    try {
      const campaigns = await contract.methods.getCanceledCampaigns().call({
        from: sender,
      });

      this.setState({ campaigns });
      this.checkCampaignsToClaim(campaigns);
    } catch (error) {
      console.error("Error fetching canceled campaigns:", error);
    }
  }

  // Καλείται κατα την αρχικοποίηση του component
  componentDidMount() {
    this.fetchData();
  }

  // Καλείται κάθε φορά που αλλάζει ο sender ή το rerenderTrigger
  componentDidUpdate(prevProps) {
    const { sender, rerenderTrigger } = this.props;

    if (
      prevProps.sender !== sender ||
      prevProps.rerenderTrigger !== rerenderTrigger
    ) {
      this.fetchData();
    }
  }

  render() {
    const { campaigns, pending, hasCampaignsToClaim } = this.state;

    // Εμφάνιση μηνύματος όταν δεν υπάρχουν ακυρωμένες καμπάνιες
    if (campaigns.length === 0) {
      return <Section title={"Canceled Campaigns"}>No campaigns found</Section>;
    }

    return (
      <Section title={"Canceled Campaigns"}>
        <table className="w-3/4">
          <thead>
            <tr className="text-left">
              <th>Entrepreneur</th>
              <th>Title</th>
              <th>Price</th>
              <th>Backers</th>
              <th>Pledges Left</th>
              <th>Your Pledges</th>
            </tr>
          </thead>
          <tbody className="border-separate border-spacing-y-4">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b-2 border-b-gray-700">
                <td>{campaign.entrepreneur}</td>
                <td>{campaign.title}</td>
                <td>{web3.utils.fromWei(campaign.sharePrice, "ether")}</td>
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
            onClick={this.refund}
            disabled={!hasCampaignsToClaim}
            className={`${
              !hasCampaignsToClaim ? "opacity-30" : "hover:bg-blue-800"
            } bg-blue-600 rounded-md w-28 p-1 font-medium transition-colors duration-200`}
          >
            {pending ? <Loader /> : "Claim"}
          </button>
          {!hasCampaignsToClaim && (
            <div className="absolute left-full transform translate-x-5 top-1/2 -translate-y-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md p-2 whitespace-nowrap">
              No campaigns available to claim
            </div>
          )}
        </div>
      </Section>
    );
  }
}

export default CanceledCampaigns;
