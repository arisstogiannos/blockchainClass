import React, { Component } from "react";
import Section from "../Section";
import web3 from "../../web3";
import contract from "../../contract";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      balance: 0,
      collectedFees: 0,
    };
  }

  // Ανάκτηση δεδομένων του συμβολαίου με την αρχικοποίηση του component
  componentDidMount() {
    this.fetchData();
  }

  // Έλεγχος αν έχει αλλάξει ο αποστολέας ή το triggerRerender για να ενημερωθούν τα δεδομένα
  componentDidUpdate(prevProps) {
    if (
      prevProps.sender !== this.props.sender ||
      prevProps.rerenderTrigger !== this.props.rerenderTrigger
    ) {
      this.fetchData();
    }
  }

  // Ανάκτηση δεδομένων του συμβολαίου
  async fetchData() {
    try {
      const owner = await contract.methods.getOwnersAddress().call();
      const balance = await web3.eth.getBalance(contract.options.address);
      const collectedFees = await contract.methods.getCollectedFees().call();

      this.setState({
        owner,
        balance: web3.utils.fromWei(balance, "ether"),
        collectedFees: web3.utils.fromWei(collectedFees, "ether"),
      });
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  }

  render() {
    const { sender } = this.props;
    const { owner, balance, collectedFees } = this.state;

    return (
      <Section title={"Crowdfunding DApp"}>
        <div className="flex gap-5">
          <p>Current Address</p>
          <p className="text-gray-400">{sender}</p>
        </div>
        <div className="flex gap-5">
          <p>Owners Address</p>
          <p className="text-gray-400">{owner}</p>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-5">
            <p>Balance</p>
            <p className="text-gray-400">{balance}</p>
          </div>
          <div className="flex gap-5">
            <p>Collected Fees</p>
            <p className="text-gray-400">{collectedFees}</p>
          </div>
        </div>
      </Section>
    );
  }
}

export default Info;
