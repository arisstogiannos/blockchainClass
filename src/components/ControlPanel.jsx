import React, { useState } from "react";
import Section from "./Section";
import contract from "../contract";

function ControlPanel({sender,  isDestroyed,rerenderTrigger}) {
  // const [error, setError] = useState(null);
  const [owner, setOwner] = useState(null);
  const [addressToBan, setAddressToBan] = useState(null);


  const [loading, setLoading] = useState(false);
  

  const withdraw = async () => {
    setLoading(true); 
    try {
      await contract.methods.withdrawFees().send({ from: sender });
      alert("Withdrawal successful");
    } catch (error) {
      console.error(error);
      alert("Withdrawal failed");
     
    }
    setLoading(false);
  };

  const changeOwner = async () => {
    try {
      await contract.methods.changeOwner(owner).send({ from: sender });
      alert("Owner changed successfully");
    } catch (error) {
      console.error(error);
      alert("Owner change failed");
    }
  };

  const banEnteprenuer = async () => {
    try {
      await contract.methods.banEntrepreneur(addressToBan).send({ from: sender });
      alert("Enteprenuer banned successfully");
    } catch (error) {
      console.error(error);
      alert("Enteprenuer ban failed");
    }
  };

  const destroyContract = async () => {
    try {
      await contract.methods.destroyContract().send({ from: sender });
      alert("Contract destroyed successfully");
    } catch (error) {
      console.error(error);
      alert("Contract destruction failed");
    }
  }

  return (
    <Section title={"Control Panel"}>
      <button disabled={isDestroyed} onClick={()=> withdraw()} className={`bg-gray-700 ${isDestroyed ? "opacity-20":"hover:bg-gray-500"} w-fit  py-1 px-3 font-medium  transition-colors duration-200 rounded-md`}>
        Withdraw
      </button>
      <div className="flex gap-5 items-center">
        <button disabled={isDestroyed} onClick={()=> changeOwner()} className={`bg-gray-700 ${isDestroyed ? "opacity-20":"hover:bg-gray-500"} w-fit  py-1 px-3 font-medium  transition-colors duration-200 rounded-md`}>
          Change Owner 
        </button>
        <input
          onChange={(e) => setOwner(e.target.value)}
          type="text"
          placeholder="Enter new owner's wallet address"
          className="rounded-md w-72 pl-3 bg-gray-200 text-black p-1 "
        />
      </div>
      <div className="flex gap-5 items-center">
        <button disabled={isDestroyed} onClick={()=> banEnteprenuer()} className={`bg-gray-700 ${isDestroyed ? "opacity-20":"hover:bg-gray-500"} w-fit  py-1 px-3 font-medium  transition-colors duration-200 rounded-md`}>
          Ban Enteprenuer
        </button>
        <input
        onChange={(e) => setAddressToBan(e.target.value)}
          type="text"
          placeholder="Enter entepreneur's address"
          className="rounded-md w-72 pl-3 bg-gray-200 text-black p-1 "
        />
      </div>
      <button disabled={isDestroyed} onClick={()=> destroyContract()} className={`bg-gray-700 ${isDestroyed ? "opacity-20":"hover:bg-gray-500"} w-fit  py-1 px-3 font-medium  transition-colors duration-200 rounded-md`}>
        Destroy
      </button>
    </Section>
  );
}

export default ControlPanel;
