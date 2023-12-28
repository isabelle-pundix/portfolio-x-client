/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface GLPTokenInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DELEGATION_TYPEHASH"
      | "DOMAIN_TYPEHASH"
      | "addAuthorized"
      | "allowance"
      | "approve"
      | "authorized"
      | "balanceOf"
      | "burnPercent"
      | "checkpoints"
      | "decimals"
      | "decreaseAllowance"
      | "disPercent"
      | "disPool"
      | "dynamicTaxReduction"
      | "increaseAllowance"
      | "isWhitelistedFrom"
      | "isWhitelistedTo"
      | "lockFromBlock"
      | "lockToBlock"
      | "manualMintLimit"
      | "manualMinted"
      | "minimumSupply"
      | "name"
      | "nonces"
      | "numCheckpoints"
      | "owner"
      | "previousOwner"
      | "reclaimOwnership"
      | "removeAuthorized"
      | "renounceOwnership"
      | "symbol"
      | "taxReductionDuration"
      | "taxStartDate"
      | "totalSupply"
      | "transferOwnership"
      | "cap"
      | "capUpdate"
      | "lockFromUpdate"
      | "lockToUpdate"
      | "taxStartDateUpdate"
      | "burnPercentUpdate"
      | "minimumSupplyUpdate"
      | "disPoolUpdate"
      | "disPercentUpdate"
      | "taxReductionDurationUpdate"
      | "dynamicTaxReductionUpdate"
      | "setWhitelistedTo"
      | "removeWhitelistedTo"
      | "setWhitelistedFrom"
      | "removeWhitelistedFrom"
      | "unlockedSupply"
      | "lockedSupply"
      | "circulatingSupply"
      | "totalLock"
      | "mint"
      | "manualMint"
      | "transfer"
      | "transferFrom"
      | "totalBalanceOf"
      | "lockOf"
      | "lastUnlockBlock"
      | "lock"
      | "canUnlockAmount"
      | "unlock"
      | "transferAll"
      | "delegates"
      | "delegate"
      | "delegateBySig"
      | "getCurrentVotes"
      | "getPriorVotes"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "Burn"
      | "DelegateChanged"
      | "DelegateVotesChanged"
      | "Lock"
      | "OwnershipTransferred"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "DELEGATION_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DOMAIN_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addAuthorized",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "authorized",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "burnPercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "checkpoints",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "disPercent",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "disPool", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "dynamicTaxReduction",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isWhitelistedFrom",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isWhitelistedTo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "lockFromBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lockToBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "manualMintLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "manualMinted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minimumSupply",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "numCheckpoints",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "previousOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reclaimOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeAuthorized",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "taxReductionDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "taxStartDate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "cap", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "capUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lockFromUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lockToUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "taxStartDateUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burnPercentUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "minimumSupplyUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "disPoolUpdate",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "disPercentUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "taxReductionDurationUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "dynamicTaxReductionUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setWhitelistedTo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeWhitelistedTo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setWhitelistedFrom",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeWhitelistedFrom",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "unlockedSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lockedSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "circulatingSupply",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "totalLock", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "manualMint",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalBalanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "lockOf", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "lastUnlockBlock",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "lock",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "canUnlockAmount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unlock", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferAll",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "delegates",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "delegate",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "delegateBySig",
    values: [
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentVotes",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPriorVotes",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DELEGATION_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DOMAIN_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "burnPercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkpoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "disPercent", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "disPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "dynamicTaxReduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isWhitelistedFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isWhitelistedTo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockFromBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockToBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "manualMintLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "manualMinted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minimumSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numCheckpoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "previousOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reclaimOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "taxReductionDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "taxStartDate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "capUpdate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lockFromUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockToUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "taxStartDateUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "burnPercentUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minimumSupplyUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disPoolUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disPercentUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "taxReductionDurationUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dynamicTaxReductionUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWhitelistedTo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeWhitelistedTo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWhitelistedFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeWhitelistedFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlockedSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockedSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "circulatingSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalLock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "manualMint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastUnlockBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "canUnlockAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "delegates", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "delegate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "delegateBySig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPriorVotes",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [owner: string, spender: string, value: bigint];
  export interface OutputObject {
    owner: string;
    spender: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BurnEvent {
  export type InputTuple = [_from: AddressLike, _value: BigNumberish];
  export type OutputTuple = [_from: string, _value: bigint];
  export interface OutputObject {
    _from: string;
    _value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DelegateChangedEvent {
  export type InputTuple = [
    delegator: AddressLike,
    fromDelegate: AddressLike,
    toDelegate: AddressLike
  ];
  export type OutputTuple = [
    delegator: string,
    fromDelegate: string,
    toDelegate: string
  ];
  export interface OutputObject {
    delegator: string;
    fromDelegate: string;
    toDelegate: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DelegateVotesChangedEvent {
  export type InputTuple = [
    delegate: AddressLike,
    previousBalance: BigNumberish,
    newBalance: BigNumberish
  ];
  export type OutputTuple = [
    delegate: string,
    previousBalance: bigint,
    newBalance: bigint
  ];
  export interface OutputObject {
    delegate: string;
    previousBalance: bigint;
    newBalance: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace LockEvent {
  export type InputTuple = [to: AddressLike, value: BigNumberish];
  export type OutputTuple = [to: string, value: bigint];
  export interface OutputObject {
    to: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, value: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface GLPToken extends BaseContract {
  connect(runner?: ContractRunner | null): GLPToken;
  waitForDeployment(): Promise<this>;

  interface: GLPTokenInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  DELEGATION_TYPEHASH: TypedContractMethod<[], [string], "view">;

  DOMAIN_TYPEHASH: TypedContractMethod<[], [string], "view">;

  addAuthorized: TypedContractMethod<
    [_toAdd: AddressLike],
    [void],
    "nonpayable"
  >;

  allowance: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  authorized: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  burnPercent: TypedContractMethod<[], [bigint], "view">;

  checkpoints: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [[bigint, bigint] & { fromBlock: bigint; votes: bigint }],
    "view"
  >;

  decimals: TypedContractMethod<[], [bigint], "view">;

  decreaseAllowance: TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  disPercent: TypedContractMethod<[], [bigint], "view">;

  disPool: TypedContractMethod<[], [string], "view">;

  dynamicTaxReduction: TypedContractMethod<[], [bigint], "view">;

  increaseAllowance: TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  isWhitelistedFrom: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  isWhitelistedTo: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  lockFromBlock: TypedContractMethod<[], [bigint], "view">;

  lockToBlock: TypedContractMethod<[], [bigint], "view">;

  manualMintLimit: TypedContractMethod<[], [bigint], "view">;

  manualMinted: TypedContractMethod<[], [bigint], "view">;

  minimumSupply: TypedContractMethod<[], [bigint], "view">;

  name: TypedContractMethod<[], [string], "view">;

  nonces: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  numCheckpoints: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  previousOwner: TypedContractMethod<[], [string], "view">;

  reclaimOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  removeAuthorized: TypedContractMethod<
    [_toRemove: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  symbol: TypedContractMethod<[], [string], "view">;

  taxReductionDuration: TypedContractMethod<[], [bigint], "view">;

  taxStartDate: TypedContractMethod<[], [bigint], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  cap: TypedContractMethod<[], [bigint], "view">;

  capUpdate: TypedContractMethod<[_newCap: BigNumberish], [void], "nonpayable">;

  lockFromUpdate: TypedContractMethod<
    [_newLockFrom: BigNumberish],
    [void],
    "nonpayable"
  >;

  lockToUpdate: TypedContractMethod<
    [_newLockTo: BigNumberish],
    [void],
    "nonpayable"
  >;

  taxStartDateUpdate: TypedContractMethod<
    [_newTaxStartDate: BigNumberish],
    [void],
    "nonpayable"
  >;

  burnPercentUpdate: TypedContractMethod<
    [_newBurnPercent: BigNumberish],
    [void],
    "nonpayable"
  >;

  minimumSupplyUpdate: TypedContractMethod<
    [_newMinimumSupply: BigNumberish],
    [void],
    "nonpayable"
  >;

  disPoolUpdate: TypedContractMethod<
    [_newDisPool: AddressLike],
    [void],
    "nonpayable"
  >;

  disPercentUpdate: TypedContractMethod<
    [_newDisPercent: BigNumberish],
    [void],
    "nonpayable"
  >;

  taxReductionDurationUpdate: TypedContractMethod<
    [_newTaxReductionDuration: BigNumberish],
    [void],
    "nonpayable"
  >;

  dynamicTaxReductionUpdate: TypedContractMethod<
    [_newDynamicTaxReduction: BigNumberish],
    [void],
    "nonpayable"
  >;

  setWhitelistedTo: TypedContractMethod<
    [newWhitelist: AddressLike],
    [void],
    "nonpayable"
  >;

  removeWhitelistedTo: TypedContractMethod<
    [newWhitelist: AddressLike],
    [void],
    "nonpayable"
  >;

  setWhitelistedFrom: TypedContractMethod<
    [newWhitelist: AddressLike],
    [void],
    "nonpayable"
  >;

  removeWhitelistedFrom: TypedContractMethod<
    [newWhitelist: AddressLike],
    [void],
    "nonpayable"
  >;

  unlockedSupply: TypedContractMethod<[], [bigint], "view">;

  lockedSupply: TypedContractMethod<[], [bigint], "view">;

  circulatingSupply: TypedContractMethod<[], [bigint], "view">;

  totalLock: TypedContractMethod<[], [bigint], "view">;

  mint: TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  manualMint: TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  transfer: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  totalBalanceOf: TypedContractMethod<[_holder: AddressLike], [bigint], "view">;

  lockOf: TypedContractMethod<[_holder: AddressLike], [bigint], "view">;

  lastUnlockBlock: TypedContractMethod<
    [_holder: AddressLike],
    [bigint],
    "view"
  >;

  lock: TypedContractMethod<
    [_holder: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  canUnlockAmount: TypedContractMethod<
    [_holder: AddressLike],
    [bigint],
    "view"
  >;

  unlock: TypedContractMethod<[], [void], "nonpayable">;

  transferAll: TypedContractMethod<[_to: AddressLike], [void], "nonpayable">;

  delegates: TypedContractMethod<[delegator: AddressLike], [string], "view">;

  delegate: TypedContractMethod<[delegatee: AddressLike], [void], "nonpayable">;

  delegateBySig: TypedContractMethod<
    [
      delegatee: AddressLike,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  getCurrentVotes: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  getPriorVotes: TypedContractMethod<
    [account: AddressLike, blockNumber: BigNumberish],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DELEGATION_TYPEHASH"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DOMAIN_TYPEHASH"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "addAuthorized"
  ): TypedContractMethod<[_toAdd: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "authorized"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "burnPercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "checkpoints"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [[bigint, bigint] & { fromBlock: bigint; votes: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "decreaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "disPercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "disPool"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "dynamicTaxReduction"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "increaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isWhitelistedFrom"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isWhitelistedTo"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "lockFromBlock"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "lockToBlock"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "manualMintLimit"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "manualMinted"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "minimumSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "nonces"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "numCheckpoints"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "previousOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "reclaimOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeAuthorized"
  ): TypedContractMethod<[_toRemove: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "taxReductionDuration"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "taxStartDate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "cap"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "capUpdate"
  ): TypedContractMethod<[_newCap: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "lockFromUpdate"
  ): TypedContractMethod<[_newLockFrom: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "lockToUpdate"
  ): TypedContractMethod<[_newLockTo: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "taxStartDateUpdate"
  ): TypedContractMethod<
    [_newTaxStartDate: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "burnPercentUpdate"
  ): TypedContractMethod<[_newBurnPercent: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "minimumSupplyUpdate"
  ): TypedContractMethod<
    [_newMinimumSupply: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "disPoolUpdate"
  ): TypedContractMethod<[_newDisPool: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "disPercentUpdate"
  ): TypedContractMethod<[_newDisPercent: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "taxReductionDurationUpdate"
  ): TypedContractMethod<
    [_newTaxReductionDuration: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "dynamicTaxReductionUpdate"
  ): TypedContractMethod<
    [_newDynamicTaxReduction: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setWhitelistedTo"
  ): TypedContractMethod<[newWhitelist: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeWhitelistedTo"
  ): TypedContractMethod<[newWhitelist: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setWhitelistedFrom"
  ): TypedContractMethod<[newWhitelist: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeWhitelistedFrom"
  ): TypedContractMethod<[newWhitelist: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unlockedSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "lockedSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "circulatingSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalLock"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "manualMint"
  ): TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "totalBalanceOf"
  ): TypedContractMethod<[_holder: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "lockOf"
  ): TypedContractMethod<[_holder: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "lastUnlockBlock"
  ): TypedContractMethod<[_holder: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "lock"
  ): TypedContractMethod<
    [_holder: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "canUnlockAmount"
  ): TypedContractMethod<[_holder: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "unlock"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferAll"
  ): TypedContractMethod<[_to: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "delegates"
  ): TypedContractMethod<[delegator: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "delegate"
  ): TypedContractMethod<[delegatee: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "delegateBySig"
  ): TypedContractMethod<
    [
      delegatee: AddressLike,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getCurrentVotes"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPriorVotes"
  ): TypedContractMethod<
    [account: AddressLike, blockNumber: BigNumberish],
    [bigint],
    "view"
  >;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "Burn"
  ): TypedContractEvent<
    BurnEvent.InputTuple,
    BurnEvent.OutputTuple,
    BurnEvent.OutputObject
  >;
  getEvent(
    key: "DelegateChanged"
  ): TypedContractEvent<
    DelegateChangedEvent.InputTuple,
    DelegateChangedEvent.OutputTuple,
    DelegateChangedEvent.OutputObject
  >;
  getEvent(
    key: "DelegateVotesChanged"
  ): TypedContractEvent<
    DelegateVotesChangedEvent.InputTuple,
    DelegateVotesChangedEvent.OutputTuple,
    DelegateVotesChangedEvent.OutputObject
  >;
  getEvent(
    key: "Lock"
  ): TypedContractEvent<
    LockEvent.InputTuple,
    LockEvent.OutputTuple,
    LockEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "Burn(address,uint256)": TypedContractEvent<
      BurnEvent.InputTuple,
      BurnEvent.OutputTuple,
      BurnEvent.OutputObject
    >;
    Burn: TypedContractEvent<
      BurnEvent.InputTuple,
      BurnEvent.OutputTuple,
      BurnEvent.OutputObject
    >;

    "DelegateChanged(address,address,address)": TypedContractEvent<
      DelegateChangedEvent.InputTuple,
      DelegateChangedEvent.OutputTuple,
      DelegateChangedEvent.OutputObject
    >;
    DelegateChanged: TypedContractEvent<
      DelegateChangedEvent.InputTuple,
      DelegateChangedEvent.OutputTuple,
      DelegateChangedEvent.OutputObject
    >;

    "DelegateVotesChanged(address,uint256,uint256)": TypedContractEvent<
      DelegateVotesChangedEvent.InputTuple,
      DelegateVotesChangedEvent.OutputTuple,
      DelegateVotesChangedEvent.OutputObject
    >;
    DelegateVotesChanged: TypedContractEvent<
      DelegateVotesChangedEvent.InputTuple,
      DelegateVotesChangedEvent.OutputTuple,
      DelegateVotesChangedEvent.OutputObject
    >;

    "Lock(address,uint256)": TypedContractEvent<
      LockEvent.InputTuple,
      LockEvent.OutputTuple,
      LockEvent.OutputObject
    >;
    Lock: TypedContractEvent<
      LockEvent.InputTuple,
      LockEvent.OutputTuple,
      LockEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
