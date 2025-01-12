import React, { Component } from "react";
import Section from "../Section";
import contract from "../../contract";
import web3 from "../../web3";

class Fulfilled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
    };
  }
  // Ανάκτηση των δεδομένων των καμπανιών που έχουν ολοκληρωθεί
  componentDidMount() {
    this.fetchData();
  }

  // Ενημέρωση των δεδομένων των καμπανιών που έχουν ολοκληρωθεί 
  // όταν αλλάζει ο λογαριασμός του χρήστη ή όταν εκπέμπεται κάποιο γεγονός
  componentDidUpdate(prevProps) {
    if (
      prevProps.sender !== this.props.sender ||
      prevProps.rerenderTrigger !== this.props.rerenderTrigger
    ) {
      this.fetchData();
    }
  }

  // Ανάκτηση των δεδομένων των καμπανιών που έχουν ολοκληρωθεί
  async fetchData() {
    const { sender } = this.props;

    if (!sender) return;

    try {
      const campaigns = await contract.methods
        .getCompletedCampaigns()
        .call({ from: sender });
      this.setState({ campaigns });
    } catch (error) {
      console.error("Error fetching completed campaigns:", error);
    }
  }

  render() {
    const { campaigns } = this.state;

    // Εμφάνιση μηνύματος όταν δεν υπάρχουν καμπάνιες που έχουν ολοκληρωθεί 
    if (campaigns.length === 0) {
      return <Section title={"Fulfilled Campaigns"}>No campaigns found</Section>;
    }

    return (
      <Section title={"Fulfilled Campaigns"}>
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
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b-2 border-gray-700">
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
      </Section>
    );
  }
}

export default Fulfilled;
