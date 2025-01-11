import React, { useEffect, useState } from "react";
import Section from "./Section";
import web3 from "../web3";
import contract from "../contract";

export default function Info({sender, rerenderTrigger}) {

  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const [collectedFees, setCollectedFees] = useState(0);

  useEffect(() => {
    const fetchData = async () => {


      const owner = await contract.methods.getOwnersAddress().call();
      const balance = await web3.eth.getBalance(contract.options.address);
      const collectedFees = await contract.methods.getCollectedFees().call();

      setBalance(web3.utils.fromWei(balance, "ether"));
      setOwner(owner);
      setCollectedFees(web3.utils.fromWei(collectedFees, "ether"));

    };
    fetchData();
  }, [sender,rerenderTrigger]);

  // window.ethereum.on('accountsChanged', (accounts) => {
  //   // ... να γίνεται refresh η σελίδα
  //   const currentAccount = accounts[0];
  //   setAddress( currentAccount );
  //   });
    




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
