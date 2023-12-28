export {}
declare global {
    interface DelegationResponses {
        delegation_responses: DelegationResponse[]
        pagination: Pagination
    }

    export interface DelegationResponse {
        delegation: Delegation
        balance: Balance
    }

    export interface Delegation {
        delegator_address: string
        validator_address: string
        shares: string
    }

    export interface Balance {
        denom: string
        amount: string
    }

    export interface Pagination {
        next_key: any
        total: string
    }

    export interface RewardResponse {
        rewards: Reward[]
      }
      
      export interface Reward {
        denom: string
        amount: string
      }
      

}