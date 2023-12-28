import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import authReducer from "./authSlice";
// import application from "./application/applicationReducer";
import tokens from "./tokens/tokensReducer"
import farms from "./liquidityFarms/farmReducer";
import metrics from "./metrics/metricsReducer"
import { updateVersion } from "./global/actions";
// import { blockNumberMiddleware } from "./middleware/blockNumber";
// import { userMiddleware } from "./middleware/user";
import privateNotesReducer from "./privateNote/privateNoteSlice"
import alertReducer from "./alertSlice";
import walletAddressReducer from "./walletAddress/walletAddressSlice";
// import addWalletAddressMessageReducer from "./walletAddress/addWalletAddressMessageSlice";
import walletBalanceReducer from "./walletBalance/walletBalanceSlice";
import pricesReducer from "./prices/pricesSlice";
import fxSwapReducer from "./metrics/FXSwapMetricsSlice"
import pangolinReducer from "./metrics/PangolinMetricsSlice"
import traderJoeReducer from "./metrics/TraderJoeMetricsSlice"
import fxCoreReducer from "./metrics/FXCoreMetricsSlice"
import bavaReducer from "./metrics/BavaMetricsSlice"
import glpReducer from "./metrics/GlpMetricsSlice"
import usdcReducer from "./metrics/USDCMetricsSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        // application,
        tokens,
        prices: pricesReducer,
        farms,
        privateNotes: privateNotesReducer,
        metrics,
        alert: alertReducer,
        walletBalances: walletBalanceReducer,
        walletAddresses: walletAddressReducer,
        // addWalletAddressMessage: addWalletAddressMessageReducer,
        fxSwap: fxSwapReducer,
        pangolin: pangolinReducer,
        traderJoe: traderJoeReducer,
        fxCore: fxCoreReducer,
        bava: bavaReducer,
        glp: glpReducer,
        usdc: usdcReducer,
    }
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat([
    //         blockNumberMiddleware.middleware,
    //         userMiddleware.middleware
    //     ]),
});

// store.dispatch(updateVersion());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch