import React, { useState } from "react";
import Section from "./Section";
import contract from "../contract";
import Loader from "./Loader";
import web3 from "../web3";


function NewCampaign({sender, isDestroyed,rerenderTrigger}) {
 const [title, setTitle] = useState("");
  const [pledgeCost, setPledgeCost] = useState("");
  const [numberOfPledges, setNumberOfPledges] = useState("");

  const [loading, setLoading] = useState(false);

 

  const createCampaign = async ()=>{
    setLoading(true);
    try{
      await contract.methods.createCampaign(title, web3.utils.toWei( pledgeCost,"ether") , numberOfPledges).send({
        from: sender,
        value: web3.utils.toWei( 0.2,"ether") 
      });
      alert("Campaign created successfully");
    } catch (error) {
      console.error(error);
      alert("Campaign creation failed");
      
    }
    setLoading(false);

  }


   


  return (
    <Section title={"New Campaign"}>
      <div className="flex gap-5 items-center">
        <p>Title</p>
        <input type="text" onChange={(e)=>setTitle(e.target.value)}  className="rounded-md bg-gray-200 text-black p-1 "/>
      </div>
      <div className="flex gap-5 items-center">
        <p>Pledge Cost</p>
        <input type="number" onChange={(e)=>setPledgeCost(e.target.value)} className="rounded-md w-20 bg-gray-200 text-black p-1 " />
      </div>
      <div className="flex gap-5 items-center">
        <p>Number Of Pledges</p>
        <input type="number" onChange={(e)=>setNumberOfPledges(e.target.value)} className="rounded-md w-20 bg-gray-200 text-black p-1 " />
      </div>
      <button disabled={isDestroyed} type="button" onClick={()=>createCampaign()} className={` bg-blue-600 rounded-md w-28 p-1 font-medium ${isDestroyed?"opacity-20":"hover:bg-blue-800"}  transition-colors duration-200"`}>{loading? <Loader/> :"Create"}</button>
    </Section>
  );
}

export default NewCampaign;
