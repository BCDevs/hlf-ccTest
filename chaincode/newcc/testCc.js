'use strict';
const shim = require('fabric-shim');
const util = require('util');

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
       await stub.putState(args[0],Buffer.from(JSON.stringify(args[1]))); 
let value= await stub.getState(args[0]); 
let result= value.toString();
let submitter= await stub.getCreator();
let channelID= await stub.getChannelID();
let args=await stub.getArgs();
let keyHistory=await stub.getHistoryForKey(args[0]);
let txId= await stub.getTxID();
let timeStamp= await stub.getTxTimestamp();
console.log(value);
console.log(result);
console.log(Submitter);
console.log(channelID);
console.log(args);
console.log(keyHistory);
console.log(txId);
console.log(timeStamp);

    }
}

shim.start(new Chaincode());
