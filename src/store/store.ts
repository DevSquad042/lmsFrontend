
import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// ✅ Import slices
import authReducer from "./slices/authSlice";
import cartReducer, {
  addToCart,
  removeFromCart,
  moveToSaveForLater,
  moveToCart,
  removeFromSaveForLater,
} from "./slices/cartSlice";
import profileReducer from "./slices/ProfileSlice"; // ✅ NEW

// ✅ Custom middleware with action matching
type ReduxAction = { type: string; [key: string]: unknown };

const toastMiddleware: Middleware = () => (next) => (action: unknown) => {
  const result = next(action);

  if (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action as ReduxAction).type === "string"
  ) {
    const actionTyped = action as ReduxAction;
    switch (actionTyped.type) {
      case addToCart.type:
        toast.success("Added to cart 🛒");
        break;
      case removeFromCart.type:
        toast.info("Removed from cart ❌");
        break;
      case moveToSaveForLater.type:
        toast.info("Moved to Save for Later 📥");
        break;
      case moveToCart.type:
        toast.success("Moved back to cart ✅");
        break;
      case removeFromSaveForLater.type:
        toast.info("Removed from Save for Later 🗑️");
        break;
      default:
        break;
    }
  }

  return result;
};

// ✅ Configure store
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer, // ✅ NEW
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toastMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

// ✅ Export types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;








