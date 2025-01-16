import React, { Component } from "react";
import Section from "../Section";
import contract from "../../contract";

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: null,
      addressToBan: null,
      loading: false,
      userIsOwner:false
    };

    this.withdraw = this.withdraw.bind(this);
    this.changeOwner = this.changeOwner.bind(this);
    this.banEntrepreneur = this.banEntrepreneur.bind(this);
    this.destroyContract = this.destroyContract.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    await this.fetchOwner();
  }

  // Έλεγχος αν ο χρήστης είναι ο ιδιοκτήτης του συμβολαίου όταν αλλάζει λογαριασμός
  async componentDidUpdate(prevProps) {
    if (
      prevProps.sender !== this.props.sender  
      || prevProps.rerenderTrigger !== this.props.rerenderTrigger
    ) {
      await this.fetchOwner();
    }
  }

  // Έλεγχος αν ο χρήστης είναι ο ιδιοκτήτης του συμβολαίου ή ο χρήστης με την
  //  διεύθυνση 0x153dfef4355E823dCB0FCc76Efe942BefCa86477 που αναφέρεται στην εκφώνηση
  fetchOwner = async () => {
    const { sender } = this.props;
    if (!sender) return;

    try {
      const owner = await contract.methods.getOwnersAddress().call({ from: sender });
      this.setState({ userIsOwner: owner.toLowerCase() === sender.toLowerCase() || "0x153dfef4355E823dCB0FCc76Efe942BefCa86477".toLowerCase() === sender.toLowerCase() });
    } catch (error) {
      console.error("Error checking owner:", error);
    }
  };

  // Ανάληψη των χρημάτων από το συμβόλαιο στον ιδιοκτήτη
  async withdraw() {
    this.setState({ loading: true });
    try {
      await contract.methods.withdrawFees().send({ from: this.props.sender });
      alert("Withdrawal successful");
    } catch (error) {
      console.error(error);
      alert("Withdrawal failed");
    }
    this.setState({ loading: false });
  }

  // Αλλαγή του ιδιοκτήτη του συμβολαίου
  async changeOwner() {
    try {
      await contract.methods.changeOwner(this.state.owner).send({
        from: this.props.sender,
      });
      alert("Owner changed successfully");
    } catch (error) {
      console.error(error);
      alert("Owner change failed");
    }
  }

  // Αποκλεισμός επιχειρηματία
  async banEntrepreneur() {
    try {
      await contract.methods.banEntrepreneur(this.state.addressToBan).send({
        from: this.props.sender,
      });
      alert("Entrepreneur banned successfully");
    } catch (error) {
      console.error(error);
      alert("Entrepreneur ban failed");
    }
  }

  // Καταστροφή του συμβολαίου
  async destroyContract() {
    try {
      await contract.methods.destroyContract().send({ from: this.props.sender });
      alert("Contract destroyed successfully");
    } catch (error) {
      console.error(error);
      alert("Contract destruction failed");
    }
  }

  // Αλλαγή της τιμής του state με βάση την τιμή που εισάγει ο χρήστης στο αντίστοιχο input
  handleInputChange(e, field) {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { isDestroyed } = this.props;
    const { owner, addressToBan, loading, userIsOwner } = this.state;

    return (
      <Section title={"Control Panel"}>
        <button
          disabled={isDestroyed || !userIsOwner}
          onClick={this.withdraw}
          className={`bg-gray-700 ${
            isDestroyed || !userIsOwner ? "opacity-30" : "hover:bg-gray-500"
          } w-fit py-1 px-3 font-medium transition-colors duration-200 rounded-md`}
        >
          Withdraw
        </button>
        <div className="flex gap-5 items-center">
          <button
            disabled={isDestroyed || !userIsOwner }
            onClick={this.changeOwner}
            className={`bg-gray-700 ${
              isDestroyed || !userIsOwner ? "opacity-30" : "hover:bg-gray-500"
            } w-fit py-1 px-3 font-medium transition-colors duration-200 rounded-md`}
          >
            Change Owner
          </button>
          <input
            onChange={(e) => this.handleInputChange(e, "owner")}
            type="text"
            placeholder="Enter new owner's wallet address"
            className="rounded-md w-72 pl-3 bg-gray-200 text-black p-1"
            value={owner || ""}
          />
        </div>
        <div className="flex gap-5 items-center">
          <button
            disabled={isDestroyed || !userIsOwner}
            onClick={this.banEntrepreneur}
            className={`bg-gray-700 ${
              isDestroyed || !userIsOwner ? "opacity-30" : "hover:bg-gray-500"
            } w-fit py-1 px-3 font-medium transition-colors duration-200 rounded-md`}
          >
            Ban Entrepreneur
          </button>
          <input
            onChange={(e) => this.handleInputChange(e, "addressToBan")}
            type="text"
            placeholder="Enter entrepreneur's address"
            className="rounded-md w-72 pl-3 bg-gray-200 text-black p-1"
            value={addressToBan || ""}
          />
        </div>
        <button
          disabled={isDestroyed || !userIsOwner}
          onClick={this.destroyContract}
          className={`bg-gray-700 ${
            isDestroyed || !userIsOwner  ? "opacity-30" : "hover:bg-gray-500"
          } w-fit py-1 px-3 font-medium transition-colors duration-200 rounded-md`}
        >
          Destroy
        </button>
      </Section>
    );
  }
}

export default ControlPanel;
