import './App.css';

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
   

  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
	  
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: 1.99
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

