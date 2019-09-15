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

async put(stub,args){
let value=args[0];

await stub.putState(args[0],Buffer.from(value.toString()));
console.log('Transaction Submitted');
       }
async get(stub,args){
const result=await stub.getState(args[0]);
 console.log(result.toString());
     }
async addMarks(stub, args) {
      if (args.length != 6) {
      throw new Error('Incorrect number of arguments. Expecting 6');
        }
console.info('============= Adding Marks.. ===========');

        const marks = {
            physics:args[1],
            chemistry:args[2],
            maths:args[3],
            biology:args[4],
            docType:'marks',
            social:args[5]
          };

        await stub.putState(args[0], Buffer.from(JSON.stringify(marks)));
        console.info('=============Marks Added with an Id of'+args[0]);
    }

async getMarks(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting 1');
    }
    

    let marksAsBytes = await stub.getState(args[0]); 
    
    console.log(marksAsBytes.toString());
    return marksAsBytes;
  }

}

shim.start(new Chaincode());
