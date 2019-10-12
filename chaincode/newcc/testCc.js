'use strict';
const shim = require('fabric-shim');
const util = require('util');
let Chaincode = class {
 
    async Init(stub) {
     let a= Ord1
     let marks={
       S1:23,
       S2:25
      }
     await stub.putState(a,Buffer.from(JSON.stringify(marks)));
    console.info('=========== Instantiated test chaincode ===========');
    return shim.success();
      }

  
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);

    let method = this[ret.fcn];
    if (!method) {
      console.error('no function of name:' + ret.fcn + ' found');
      throw new Error('Received unknown function ' + ret.fcn + ' invocation');
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
         } catch (err) {
      console.log(err);
      return shim.error(err);
         }
     }
  
async getGlobal(stub,args) {

let submitter= await stub.getCreator();
let msp = Buffer.from(submitter.mspid);
let certificate=submitter.getIdBytes().toString('utf8')
let channelID= await stub.getChannelID();
let parms=await stub.getArgs();
let txId= await stub.getTxID();
let timeStamp= await stub.getTxTimestamp();
const time = new Date(timeStamp.getSeconds() * 1000).toISOString();
let signedProposal =stub.getSignedProposal();
let time2 =timeStamp.getSeconds();
//Console
console.log('submitter MSP is ..'+msp);
console.log('submitter certificate is ..'+certificate);
console.log('channel Id..'+channelID);
console.log('function args..'+parms);
console.log('transaction Id is..'+txId);
console.log('Transaction Proposal Time is..'+time);
console.log('Signed Proposal is..'+signedProposal);
console.log('timestamp is..'+time2);


    }
async getState(stub, args) {


    let patentAsBytes = await ctx.stub.getState(args[0]);

    if (!patentAsBytes || patentAsBytes.toString().length <= 0) {
      throw new Error('data with this Id Doesnt Exist..!');
    }
    else {
     
      let jsonData = JSON.parse(patentAsBytes.toString());
      return JSON.stringify(jsonData);
      }
  }


}

shim.start(new Chaincode());
