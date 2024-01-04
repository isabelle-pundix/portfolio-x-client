import { getDelegatorDelegations } from "./Delegations";
import {
  getWithdrawals1,
  getReward,
  getValidatorMoniker,
  calculateTotalWithdrawals,
} from "./Delegations";
import Big from "big.js";

interface Delegations {
  [index: string]: {
    amount?: string;
    moniker?: string;
    reward?: string;
    rewardValue?: string;
    value?: string;
    gainOrLoss?: string;
  };
}

export const retrieveDelegationInfo = (
  cosmosAddress: string,
  fxPrice: number
) => {
  const fetchDelegation = async () => {
    const responses = await Promise.all([
      getDelegatorDelegations(cosmosAddress),
      // getWithdrawals1(addr!, "staking", false),
    ]);

    const delegationsResponse = responses[0];
    const delegations: Delegations = {};
    let rewardSum = Big(0);
    let totalValue = Big(0);

    if (
      delegationsResponse &&
      delegationsResponse.delegation_responses.length !== 0
    ) {
      const rewardsPromises = [];
      const validatorMonikersPromises = [];
      for (
        let i = 0;
        i < delegationsResponse.delegation_responses.length;
        i++
      ) {
        const validatorAddress =
          delegationsResponse.delegation_responses[i].delegation
            .validator_address;
        rewardsPromises.push(getReward(cosmosAddress, validatorAddress));
        validatorMonikersPromises.push(getValidatorMoniker(validatorAddress));
      }
      const validatorMonikers = await Promise.all(validatorMonikersPromises);
      const rewards = await Promise.all(rewardsPromises);
      for (
        let i = 0;
        i < delegationsResponse.delegation_responses.length;
        i++
      ) {
        const validatorAddress =
          delegationsResponse.delegation_responses[i].delegation
            .validator_address;
        const reward = rewards[i] as string;
        const amount = Big(
          delegationsResponse.delegation_responses[i].delegation.shares
        ).div(Big("1e+18"));
        const value = Big(reward).add(Big(amount)).mul(fxPrice);
        const rewardValue = Big(reward).mul(fxPrice).toString();
        delegations[validatorAddress] = {
          amount: amount.toString(),
          moniker: validatorMonikers[i] as string,
          reward: reward,
          rewardValue: rewardValue,
          value: value.toString(),
        };
        totalValue = totalValue.add(value);
        rewardSum = rewardSum.add(Big(reward));
      }
      
      return {
        totalValue: totalValue,
        rewardSum: rewardSum,
        delegations: delegations,
      };
    }
  };

  return fetchDelegation();
};

export const retrieveWithdrawalInfo = (addr: string) => {
  const fetchWithdrawal = async () => {
    const responses = await Promise.all([
      getWithdrawals1(addr!, "staking", false),
    ]);

    if (responses[0] && responses[0].result.length !== 0) {
      const withdrawals = calculateTotalWithdrawals(responses[0] as TxnLogEvents);
      return {
        withdrawals,
      };
    }
  };
  return fetchWithdrawal();
};
