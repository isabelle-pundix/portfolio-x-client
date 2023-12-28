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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface MulticallInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getCurrentBlockTimestamp"
      | "aggregate"
      | "getLastBlockHash"
      | "getFXBalance"
      | "getCurrentBlockDifficulty"
      | "getCurrentBlockGasLimit"
      | "getCurrentBlockCoinbase"
      | "getBlockHash"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getCurrentBlockTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "aggregate",
    values: [{ target: AddressLike; callData: BytesLike }[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getLastBlockHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFXBalance",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentBlockDifficulty",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentBlockGasLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentBlockCoinbase",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBlockHash",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getCurrentBlockTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "aggregate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getLastBlockHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFXBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentBlockDifficulty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentBlockGasLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentBlockCoinbase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBlockHash",
    data: BytesLike
  ): Result;
}

export interface Multicall extends BaseContract {
  connect(runner?: ContractRunner | null): Multicall;
  waitForDeployment(): Promise<this>;

  interface: MulticallInterface;

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

  getCurrentBlockTimestamp: TypedContractMethod<[], [bigint], "view">;

  aggregate: TypedContractMethod<
    [calls: { target: AddressLike; callData: BytesLike }[]],
    [[bigint, string[]] & { blockNumber: bigint; returnData: string[] }],
    "view"
  >;

  getLastBlockHash: TypedContractMethod<[], [string], "view">;

  getFXBalance: TypedContractMethod<[addr: AddressLike], [bigint], "view">;

  getCurrentBlockDifficulty: TypedContractMethod<[], [bigint], "view">;

  getCurrentBlockGasLimit: TypedContractMethod<[], [bigint], "view">;

  getCurrentBlockCoinbase: TypedContractMethod<[], [string], "view">;

  getBlockHash: TypedContractMethod<
    [blockNumber: BigNumberish],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getCurrentBlockTimestamp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "aggregate"
  ): TypedContractMethod<
    [calls: { target: AddressLike; callData: BytesLike }[]],
    [[bigint, string[]] & { blockNumber: bigint; returnData: string[] }],
    "view"
  >;
  getFunction(
    nameOrSignature: "getLastBlockHash"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getFXBalance"
  ): TypedContractMethod<[addr: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCurrentBlockDifficulty"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCurrentBlockGasLimit"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCurrentBlockCoinbase"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getBlockHash"
  ): TypedContractMethod<[blockNumber: BigNumberish], [string], "view">;

  filters: {};
}