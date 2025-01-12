import "./App.css";
import CanceledCampaigns from "./components/sections/CanceledCampaigns";
import ControlPanel from "./components/sections/ControlPanel";
import Fulfilled from "./components/sections/FulfilledCampaigns";
import Info from "./components/sections/Info";
import LiveCampaigns from "./components/sections/LiveCampaigns";
import NewCampaign from "./components/sections/NewCampaign";
import contract from "./contract";
import  { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: "",
      isDestroyed: false,
      triggerRerender: new Date(),
    };

    this.fetchAccount = this.fetchAccount.bind(this);
    this.listenToAllEvents = this.listenToAllEvents.bind(this);
    this.getIsDestroyed = this.getIsDestroyed.bind(this);
  }

  // Ανάκτηση του τρέχοντος λογαριασμού του χρήστη	
  async fetchAccount() {
    const currentAccount = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
    this.setState({ sender: currentAccount });

    window.ethereum.on("accountsChanged", (accounts) => {
      const currentAccount = accounts[0];
      this.setState({ sender: currentAccount });
    });
  }

  // Προσθήκη listener σε όλα τα γεγονότα του συμβολαίου
  listenToAllEvents() {
    // Έλεγχος αν το συμβόλαιο έχει δημιουργηθεί
    if (!contract || !contract.events) return;

    contract.events.allEvents().on('data', async (data) => {
      console.log('Event Emitted: ', data.event);
      // Κάθε φορά που εκπέμπεται ένα γεγονός, αλλάζουμε την τιμή του triggerRerender
      //  ώστε να κανει rerender ολα τα components παιδία που το χρησιμοποιούν.
      //  Χρησιμοποιείται η Date() για να είναι διαφορετική κάθε φορά
      this.setState({ triggerRerender: new Date() });
    });
  }

  // Έλεγχος αν το συμβόλαιο έχει καταστραφεί
  async getIsDestroyed() {
    try {
      const isDestroyed = await contract.methods.getIsDestroyed().call();
      this.setState({ isDestroyed });
    } catch (error) {
      console.error(error);
    }
  }


  componentDidMount() {

    this.fetchAccount();
    this.listenToAllEvents();
    this.getIsDestroyed();
  }

  // Κάθε φορά που ακούμς αλλαγές στο triggerRerender, κάνει ελέγχο αν το συμβόλαιο έχει καταστραφεί
  componentDidUpdate(prevProps, prevState) {
    if (prevState.triggerRerender !== this.state.triggerRerender) {
      this.getIsDestroyed();
    }
  }

  // Αφαίρεση των listeners πριν το unmount του component
  componentWillUnmount() {
    if (contract && contract.events) {
      contract.events.allEvents().removeAllListeners();
    }

    window.ethereum.removeListener("accountsChanged", this.fetchAccount);
  }

  render() {
    const { sender, isDestroyed, triggerRerender } = this.state;

    return (
      <div className="bg-gray-800 text-white p-5">
        <div className="container mx-auto flex flex-col gap-5">
          <Info sender={sender} rerenderTrigger={triggerRerender} />
          <NewCampaign sender={sender} isDestroyed={isDestroyed} rerenderTrigger={triggerRerender} />
          <LiveCampaigns sender={sender} rerenderTrigger={triggerRerender} />
          <Fulfilled sender={sender} rerenderTrigger={triggerRerender} />
          <CanceledCampaigns sender={sender} rerenderTrigger={triggerRerender} />
          <ControlPanel sender={sender} isDestroyed={isDestroyed} rerenderTrigger={triggerRerender} />
        </div>
      </div>
    );
  }
}

export default App;