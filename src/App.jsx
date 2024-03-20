import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [money, setMoney] = useState(null);

  const [prices, setPrices] = useState([
    {
      text: "0 - 50",
      quantity: 50,
      price: 1806,
    },
    {
      text: "51 - 100",
      quantity: 50,
      price: 1866,
    },
    {
      text: "101 - 200",
      quantity: 100,
      price: 2167,
    },
    {
      text: "201 - 300",
      quantity: 100,
      price: 2729,
    },
    {
      text: "301 - 400",
      quantity: 100,
      price: 3050,
    },
    {
      text: "400 trở lên",
      quantity: 0,
      price: 3151,
    },
  ]);

  const getNumberOfElectric = () => {
    let noOfElectric = 0;
    let left = money;
    for (let i = 0; i < prices.length - 1; i++) {
      const temp = left - prices[i].quantity * prices[i].price;
      console.log(left);
      if (temp > 0) {
        noOfElectric += prices[i].quantity;
        left = temp;
      } else {
        noOfElectric += Math.floor(left / prices[i].price);
        left = 0;
        break;
      }
    }
    if (left > 0) {
      noOfElectric += Math.floor(left / prices[prices.length - 1].price);
    }

    return noOfElectric;
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto gap-2">
      <div className="mb-6">
        <div>Tổng số tiền (VND)</div>
        <input
          value={money}
          min={0}
          onChange={(e) => setMoney(Number(e.target.value))}
          type="number"
          pattern="[0-9]*"
          className="border-2 p-1 rounded-sm"
        />
      </div>
      {prices.map((item, index) => (
        <div className="flex items-center gap-10">
          <div className="w-20">{item.text}</div>
          <input
            min={0}
            type="number"
            pattern="[0-9]*"
            className="border-2 p-1 rounded-sm"
            value={item.price}
            onChange={(e) =>
              setPrices(
                prices.map((p, i) => {
                  if (index === i)
                    return { ...p, price: Number(e.target.value) };
                  return p;
                })
              )
            }
          />
        </div>
      ))}
      <div className="mt-6 flex items-center gap-3">
        <strong>Tổng số điện</strong>
        <span className="font-bold text-red-500">{getNumberOfElectric()}</span>
      </div>
      <div className="flex items-center gap-3">
        <strong>Đơn giá</strong>
        {getNumberOfElectric() ? (
          <span className="font-bold text-red-500">
            {(money / getNumberOfElectric()).toFixed(0)} VND
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
