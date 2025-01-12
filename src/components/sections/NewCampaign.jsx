import React, { Component } from "react";
import Section from "../Section";
import contract from "../../contract";
import Loader from "../Loader";
import web3 from "../../web3";

class NewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      pledgeCost: "",
      numberOfPledges: "",
      loading: false,
    };
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  createCampaign = async () => {
    const { title, pledgeCost, numberOfPledges } = this.state;
    const { sender } = this.props;

    this.setState({ loading: true });

    try {
      await contract.methods
        .createCampaign(
          title,
          web3.utils.toWei(pledgeCost, "ether"),
          numberOfPledges
        )
        .send({
          from: sender,
          value: web3.utils.toWei("0.2", "ether"),
        });
      alert("Campaign created successfully");
    } catch (error) {
      console.error(error);
      alert("Campaign creation failed");
    }

    this.setState({ loading: false });
  };

  render() {
    const { isDestroyed } = this.props;
    const { title, pledgeCost, numberOfPledges, loading } = this.state;

    return (
      <Section title={"New Campaign"}>
        <div className="flex gap-5 items-center">
          <p>Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => this.handleChange("title", e.target.value)}
            className="rounded-md bg-gray-200 text-black p-1"
          />
        </div>
        <div className="flex gap-5 items-center">
          <p>Pledge Cost</p>
          <input
            type="number"
            value={pledgeCost}
            onChange={(e) => this.handleChange("pledgeCost", e.target.value)}
            className="rounded-md w-20 bg-gray-200 text-black p-1"
          />
        </div>
        <div className="flex gap-5 items-center">
          <p>Number Of Pledges</p>
          <input
            type="number"
            value={numberOfPledges}
            onChange={(e) =>
              this.handleChange("numberOfPledges", e.target.value)
            }
            className="rounded-md w-20 bg-gray-200 text-black p-1"
          />
        </div>
        <button
          disabled={isDestroyed}
          type="button"
          onClick={this.createCampaign}
          className={`bg-blue-600 rounded-md w-28 p-1 font-medium ${
            isDestroyed ? "opacity-20" : "hover:bg-blue-800"
          } transition-colors duration-200`}
        >
          {loading ? <Loader /> : "Create"}
        </button>
      </Section>
    );
  }
}

export default NewCampaign;
