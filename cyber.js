const conf = require('./config.json');
const axios = require('axios');
const builder = require('./node_modules/auto_cyb/builder');
const codec = require('./node_modules/auto_cyb/codec');
const crypto = require('./node_modules/auto_cyb/crypto');
const constants = require('./node_modules/auto_cyb/constants');

const import_data = crypto.recover(conf.seed, 'en');
const sender = {
    'address': import_data.address,
    'privateKey': import_data.privateKey,
    'node': conf.cyber_node,
    'chain': "euler-6"
}

async function link(from, to) {
  const addressInfo = await axios({
      method: 'get',
      url: `${sender.node}/account?address="${sender.address}"`,
  });
  
  if(!addressInfo.data.result) { return console.error('error: addressInfo.data.result undefined') };
  const account = addressInfo.data.result.account;
  if(!account) { return console.error('error: addressInfo.data.result.account undefined') }
  console.log('Данные ошибки, sequence: ' + parseInt(account.sequence, 10) + ', chain_id: ' + sender.chain);
  const acc = {
      address: account.address,
      chain_id: sender.chain,
      account_number: parseInt(account.account_number, 10),
      sequence: parseInt(account.sequence, 10)
  };
  
  const sendRequest = {
      acc,
      fromCid: from,
      toCid: to,
      type: 'link'
  };
  
  const txRequest = builder.buildAndSignTxRequest(sendRequest, sender.privateKey, sender.chain);
  const signedSendHex = codec.hex.stringToHex(JSON.stringify(txRequest));

  return axios({
      method: 'get',
      url: `${sender.node}/submit_signed_link?data="${signedSendHex}"`,
  })
  .then(res => {
      if (!res.data) {
        throw new Error('Empty data');
      }
      if (res.data.error) {
        throw res.data.error;
      }
      return res.data;
    })
  .catch(error => console.log('Cannot send', error));
}

module.exports.link = link;