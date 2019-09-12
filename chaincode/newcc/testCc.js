'use strict';
const shim = require('fabric-shim');
const util = require('util');
let id=0;
let Chaincode = class {
 
    async Init(stub) {
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
// return Buffer.from(timeStamp);
const timestamp = new Date(stub.getTxTimestamp().getSeconds() * 1000).toISOString();
let time2 =timestamp.low;
let time3 =timestamp.getSeconds();


console.log('submitter MSP is ..'+msp);
console.log('submitter certificate is ..'+certificate);
console.log('channel Id..'+channelID);
console.log('function args..'+parms);
console.log('transaction Id is..'+txId);
console.log('timestamp is..'+timestamp);
console.log('timestamp2 is..'+time2);
console.log('timestamp3 is..'+time3);

    }
}

shim.start(new Chaincode());
