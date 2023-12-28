export { }
declare global {
  interface EthToCosmosAddress {
    cosmos_address: string
    sequence: string
    account_number: string
  }

  interface ValidatorInfo {
    validator: Validator
  }

  interface Validator {
    operator_address: string
    consensus_pubkey: ConsensusPubkey
    jailed: boolean
    status: string
    tokens: string
    delegator_shares: string
    description: Description
    unbonding_height: string
    unbonding_time: string
    commission: Commission
    min_self_delegation: string
  }

  interface ConsensusPubkey {
    "@type": string
    key: string
  }

  interface Description {
    moniker: string
    identity: string
    website: string
    security_contact: string
    details: string
  }

  interface Commission {
    commission_rates: CommissionRates
    update_time: string
  }

  interface CommissionRates {
    rate: string
    max_rate: string
    max_change_rate: string
  }

}