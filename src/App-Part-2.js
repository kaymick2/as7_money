import { useState } from "react";
import "./App.css";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const paypalScriptOptions: PayPalScriptOptions = {
  "client-id":
    "AQaDyXzDcEckQa2JJpfmznVQgiF2d2BhnW2UzJtVtQJm2l0C247rnKlux7Uk5JMqqQBPJ2nKElJTpZtu",
  currency: "USD"
};

function Button() {
   
const [cartValue,setValue]=useState(0);
const items=["VANMOOF BIKE $2000","STEAL BIKE $40 fOR BOLT CUTTER","RENT BIKE $20","SPECIALIZED BIKE USED WITH CUM STAINS $400"];
const prices=[2000.00,40.00,20.00,400.00];

  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
	  
// Style the buttons with allowed PayPal values *****
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
// Replace hardcoded value with the variable created above *****
              value: cartValue.toString()
            }
          }
        ]
      });
    },
    onApprove(data, actions) {
      return actions.order.capture({}).then((details) => {
        alert(
          "Transaction completed by: " +
            (details?.payer.name.given_name ?? "No details")
        );

      });
    }
  };
  return (
    <>
      <div>
      {items.map((item, index) => (
        <button key={index} onClick={() => {
          setValue(prices[items.indexOf(item)]);
          localStorage.setItem("cartValue",{cartValue});
          console.log(cartValue);
        }}>
          {item}
        </button>
      ))}
    </div>

      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}
export default function App() {
  return (
    <div className="App">
      <h1>Hello PayPal</h1>
      <PayPalScriptProvider options={paypalScriptOptions}>
        <Button />
      </PayPalScriptProvider>
    </div>
  );
}
