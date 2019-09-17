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
         } 
     catch (err) {
      console.log(err);
      return shim.error(err);
            }
     }
  
async signUp(stub, args) {
      if (args.length != 2) {
      throw new Error('Incorrect number of arguments. Expecting 2');
            }
let credentialsAsBytes = await stub.getState(args[0]); 
if (!credentialsAsBytes || credentialsAsBytes.toString().length <= 0) {
    console.info('**Storing Credentials on Blockchain**');

    const credentials  = {userName:args[0],password:args[1]};

    await stub.putState(args[0], Buffer.from(JSON.stringify(credentials)));
    console.info('*Signup Successfull..Your Username is  '+args[0]);
        }
     else {
     console.log('UserName is already taken..!')
     console.info('UserName is already taken..!')
         }
    }

async login(stub, args) {
    if (args.length != 2) {
      throw new Error('Incorrect number of arguments. Expecting 2');
        }
    
    let userName=args[0];
    let password=args[1];
    let credentialsAsBytes = await stub.getState(args[0]); 
    let credentials=JSON.parse(credentialsAsBytes.toString());
    if (userName!=credentials.userName) {
      throw new Error('Incorrect Username..!');
           }

if (password!=credentials.password) {
    throw new Error('Incorrect Password..!');
        }
// Functions go here after signin
console.log('Login Successfull..✓')
console.info('Login Successfull..✓')
      }

}

shim.start(new Chaincode());
