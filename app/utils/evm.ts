import axios from "axios";

/*
WIP:
1. get all EVM events on FXCORE
2. extract the evm tx hash from each evm event
3. use an ETH client json RPC method to extract the topics
4. make sense of the data
*/

//use fxCore RestAPI
export const getFxEvmEvents = async (_evmSender: string, _evmRecipient: string): Promise<FxEvmEvents> => {
    const res = await axios.get(
        `https://fx-rest.functionx.io/cosmos/tx/v1beta1/txs?events=message.action%3D'/ethermint.evm.v1.MsgEthereumTx'\
        &events=message.sender%3D'${_evmSender}'\
        &events=ethereum_tx.recipient%3D'${_evmRecipient}'`
    ).then(res => res.data) as FxEvmEvents
    return res
}

//extract all eth tx hash
export const getTransactionHashes = async (_evmEvents: FxEvmEvents) => {
    _evmEvents.tx_responses.forEach((t) => {
        
    })
}

//get eth logs
export const getEvmLogs = async () => {

}