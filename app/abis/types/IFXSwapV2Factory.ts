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

export interface IFXSwapV2FactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "allPairs"
      | "allPairsLength"
      | "createPair"
      | "feeTo"
      | "feeToSetter"
      | "getPair"
      | "setFeeTo"
      | "setFeeToSetter"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "PairCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "allPairs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allPairsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPair",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "feeTo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feeToSetter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPair",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeTo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeToSetter",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "allPairs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allPairsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeToSetter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setFeeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeeToSetter",
    data: BytesLike
  ): Result;
}

export namespace PairCreatedEvent {
  export type InputTuple = [
    token0: AddressLike,
    token1: AddressLike,
    pair: AddressLike,
    arg3: BigNumberish
  ];
  export type OutputTuple = [
    token0: string,
    token1: string,
    pair: string,
    arg3: bigint
  ];
  export interface OutputObject {
    token0: string;
    token1: string;
    pair: string;
    arg3: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IFXSwapV2Factory extends BaseContract {
  connect(runner?: ContractRunner | null): IFXSwapV2Factory;
  waitForDeployment(): Promise<this>;

  interface: IFXSwapV2FactoryInterface;

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

  allPairs: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  allPairsLength: TypedContractMethod<[], [bigint], "view">;

  createPair: TypedContractMethod<
    [tokenA: AddressLike, tokenB: AddressLike],
    [string],
    "nonpayable"
  >;

  feeTo: TypedContractMethod<[], [string], "view">;

  feeToSetter: TypedContractMethod<[], [string], "view">;

  getPair: TypedContractMethod<
    [tokenA: AddressLike, tokenB: AddressLike],
    [string],
    "view"
  >;

  setFeeTo: TypedContractMethod<[arg0: AddressLike], [void], "nonpayable">;

  setFeeToSetter: TypedContractMethod<
    [arg0: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "allPairs"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "allPairsLength"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "createPair"
  ): TypedContractMethod<
    [tokenA: AddressLike, tokenB: AddressLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "feeTo"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "feeToSetter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getPair"
  ): TypedContractMethod<
    [tokenA: AddressLike, tokenB: AddressLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "setFeeTo"
  ): TypedContractMethod<[arg0: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setFeeToSetter"
  ): TypedContractMethod<[arg0: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "PairCreated"
  ): TypedContractEvent<
    PairCreatedEvent.InputTuple,
    PairCreatedEvent.OutputTuple,
    PairCreatedEvent.OutputObject
  >;

  filters: {
    "PairCreated(address,address,address,uint256)": TypedContractEvent<
      PairCreatedEvent.InputTuple,
      PairCreatedEvent.OutputTuple,
      PairCreatedEvent.OutputObject
    >;
    PairCreated: TypedContractEvent<
      PairCreatedEvent.InputTuple,
      PairCreatedEvent.OutputTuple,
      PairCreatedEvent.OutputObject
    >;
  };
}
