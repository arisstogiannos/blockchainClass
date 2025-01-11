import { useEffect, useState } from "react";
import "./App.css";
import CanceledCampaigns from "./components/CanceledCampaigns";
import ControlPanel from "./components/ControlPanel";
import Fulfilled from "./components/FulfilledCampaigns";
import Info from "./components/Info";
import LiveCampaigns from "./components/LiveCampaigns";
import NewCampaign from "./components/NewCampaign";
import web3 from "./web3";
import contract from "./contract";

function App() {
  const [sender, setSender] = useState("");
  const [isDestroyed, setIsDestroyed] = useState(false);

  const [triggerRerender, setTriggerRerender] = useState(new Date());


  useEffect(() => {
    const fetchAccount = async () => {
      // await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setSender(accounts[0]);
    };

    fetchAccount();

   

    window.ethereum.on("accountsChanged", (accounts) => {
      const currentAccount = accounts[0];
      setSender(currentAccount);
    });

    
    

    return () => {
      window.ethereum.removeListener("accountsChanged", fetchAccount);
    };
  }, []);

  useEffect(() => {
    const subscribeToAllEvents = () => {
      if (!contract || !contract.events) return;

      contract.events.allEvents().on('data', async (data) => {
        console.log('Event Emited: ',data.event);

        // Καλώντας την setSender οταν "ακούσουμε" κάποιο event ολα τα components που χρησιμοποιούν
        //  το sender θα κανουν rerender, δήλαδη όλα τα components. 
        // Με αυτο τον τρόπο τα δεδομένα μένουν συγχρονισμένα.

        setTriggerRerender(new Date());  
        });
      }
      
    subscribeToAllEvents();
  
    return () => {
      if (contract && contract.events) {
        contract.events.allEvents().removeAllListeners()
      }
    };
    
  }, []); 

  useEffect(() => {
    const getIsDestroyed = async () => {
      try {
        const isDestroyed = await contract.methods
          .getIsDestroyed()
          .call();
          setIsDestroyed(isDestroyed);

      } catch (error) {
        console.error(error);
      }
    };

    getIsDestroyed();

  }
  , [triggerRerender]);

 

  return (
    <div className="bg-gray-800 text-white p-5">
      <div className="container mx-auto flex flex-col gap-5">
        <Info sender={sender} rerenderTrigger={triggerRerender} />  
        <NewCampaign  sender={sender} isDestroyed={isDestroyed} rerenderTrigger={triggerRerender}/>
        <LiveCampaigns  sender={sender} rerenderTrigger={triggerRerender} />
        <Fulfilled  sender={sender} rerenderTrigger={triggerRerender} />
        <CanceledCampaigns  sender={sender} rerenderTrigger={triggerRerender} />
        <ControlPanel  sender={sender}  isDestroyed={isDestroyed} rerenderTrigger={triggerRerender} />
      </div>
    </div>
  );
}

export default App;
