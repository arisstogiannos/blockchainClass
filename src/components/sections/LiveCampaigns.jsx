import React, { Component } from "react";
import Section from "../Section";
import contract from "../../contract";
import web3 from "../../web3";

class LiveCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
      isOwner: false,
    };
  }

  // Ανάκτηση των δεδομένων των καμπανιών που είναι σε εξέλιξη
  async componentDidMount() {
    await this.fetchOwner();
    await this.fetchData();
  }

  // Έλεγχος αν ο χρήστης είναι ο ιδιοκτήτης του συμβολαίου όταν αλλάζει λογαριασμός
  async componentDidUpdate(prevProps) {
    if (
      prevProps.sender !== this.props.sender 
    ) {
      await this.fetchOwner();
      await this.fetchData();
    }
  }

  // Έλεγχος αν ο χρήστης είναι ο ιδιοκτήτης του συμβολαίου ή ο χρήστης με την
  //  διεύθυνση 0x153dfef4355E823dCB0FCc76Efe942BefCa86477 που αναφέρεται στην εκφώνηση
  fetchOwner = async () => {
    const { sender } = this.props;
    if (!sender) return;

    try {
      const owner = await contract.methods.getOwnersAddress().call({ from: sender });
      this.setState({ isOwner: owner.toLowerCase() === sender.toLowerCase() || "0x153dfef4355E823dCB0FCc76Efe942BefCa86477".toLowerCase() === sender.toLowerCase() });
    } catch (error) {
      console.error("Error checking owner:", error);
    }
  };

  // Ανάκτηση των δεδομένων των καμπανιών που είναι σε εξέλιξη
  fetchData = async () => {
    const { sender } = this.props;
    if (!sender) return;

    try {
      const campaigns = await contract.methods.getActiveCampaigns().call({ from: sender });
      this.setState({ campaigns });
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  // Αγορά μίας μετοχής από τον χρήστη σε μία καμπάνια
  pledge = async (campaign) => {
    const { sender } = this.props;

    try {
      await contract.methods.fundCampaign(campaign.id, 1).send({
        from: sender,
        value: campaign.sharePrice,
      });
      alert("Pledge successful");
    } catch (error) {
      console.error(error);
      alert("Pledge failed");
    }
  };

  // Ακύρωση μίας καμπάνιας από τον ιδιοκτήτη της ή τον ιδιοκτήτη του συμβολαίου
  cancelCampaign = async (campaign) => {
    const { sender } = this.props;

    try {
      await contract.methods.cancelCampaign(campaign.id).send({ from: sender });
    } catch (error) {
      console.error("Error cancelling campaign:", error);
    }
  };

  // Ολοκλήρωση μίας καμπάνιας από τον ιδιοκτήτη της ή τον 
  // ιδιοκτήτη του συμβολαίου όταν έχουν ολοκληρωθεί οι απαιτουμενες μετοχές
  fulfillCampaign = async (campaign) => {
    const { sender } = this.props;

    try {
      await contract.methods.completeCampaign(campaign.id).send({ from: sender });
    } catch (error) {
      console.error("Error fulfilling campaign:", error);
    }
  };

  render() {
    const { sender } = this.props;
    const { campaigns, isOwner } = this.state;

    // Εμφάνιση μηνύματος όταν δεν υπάρχουν καμπάνιες που είναι σε εξέλιξη 
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
                <td>{campaign.title}</td>
                <td>{web3.utils.fromWei(campaign.sharePrice, "ether")}</td>
                <td>{campaign.noInvestors}</td>
                <td>{campaign.sharesLeft}</td>
                <td>{campaign.investorShares}</td>
                <td className="flex gap-4 items-center">
                  <button
                    onClick={() => this.pledge(campaign)}
                    className="rounded-md bg-green-500 py-1 my-2 px-2 text-sm hover:bg-green-700 transition-colors duration-200"
                  >
                    Pledge
                  </button>
                  {(sender.toLowerCase() === campaign.entrepreneur.toLowerCase() || isOwner) && (
                    <button
                      onClick={() => this.cancelCampaign(campaign)}
                      className="rounded-md bg-red-500 py-1 px-2 text-sm hover:bg-red-700 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  )}
                  {(sender.toLowerCase() === campaign.entrepreneur.toLowerCase() || isOwner) && (
                    <button
                      onClick={() => this.fulfillCampaign(campaign)}
                      disabled={campaign.sharesLeft > 0}
                      className={`rounded-md bg-blue-600 text-sm hover:bg-blue-800 ${
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
}

export default LiveCampaigns;
