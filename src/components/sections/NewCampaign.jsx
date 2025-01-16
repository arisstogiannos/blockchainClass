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
      pending: false,
      isOwner: false,
    };
  }

  // Αλλαγή τιμής σε state field από input
  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  // Δημιουργία νέας καμπάνιας
  createCampaign = async () => {
    const { title, pledgeCost, numberOfPledges } = this.state;
    const { sender } = this.props;

    // Κρατάμε το pending state σε true κατά την διάρκεια της διαδικασίας για να εμφανιστεί το Loader
    this.setState({ pending: true });

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
        // Καθαρισμός των πεδίων μετά την επιτυχή δημιουργία
        this.setState({ title: "", pledgeCost: "", numberOfPledges: "" });

      // Εμφάνιση μηνύματος επιτυχούς δημιουργίας
      alert("Campaign created successfully");
    } catch (error) {
      console.error(error);
      // Εμφάνιση μηνύματος αποτυχίας δημιουργίας
      alert("Campaign creation failed");
    }

    // Επαναφορά του pending state σε false μετά την ολοκλήρωση της διαδικασίας
    this.setState({ pending: false });
  };

  // Έλεγχος αν ο χρήστης είναι ο owner του συμβολαίου
  isOwner = async () => {
    const { sender } = this.props;
    if (!sender) return;

    try {
      const owner = await contract.methods.getOwnersAddress().call({ from: sender });
      this.setState({ isOwner: owner.toLowerCase() === sender.toLowerCase() });
    } catch (error) {
      console.error("Error checking owner:", error);
    }
  };

  // Έλεγχος αν ο χρήστης είναι ο owner του συμβολαίου
  componentDidMount() {
    this.isOwner()
  }
  // Έλεγχος αν ο χρήστης είναι ο owner του συμβολαίου
  //  κάθε φορά που αλλάζει ο χρήστης λογαριασμό
  componentDidUpdate(prevProps) {
    if (prevProps.sender !== this.props.sender || prevProps.rerenderTrigger !== this.props.rerenderTrigger) {
      this.isOwner();
    }
  }

  render() {
    const { isDestroyed } = this.props;
    const { title, pledgeCost, numberOfPledges, pending, isOwner } = this.state;

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
            step={"0.01"}
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
          disabled={isDestroyed || isOwner || pending}
          type="button"
          onClick={this.createCampaign}
          className={`bg-blue-600 rounded-md w-28 p-1 font-medium ${
            (isDestroyed || isOwner || pending) ? "opacity-50" : "hover:bg-blue-800"
          } transition-colors duration-200`}
        >
          {pending ? <Loader /> : "Create"}
        </button>
      </Section>
    );
  }
}

export default NewCampaign;
