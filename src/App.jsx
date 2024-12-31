import React, { useState } from "react";

const App = () => {
  const [money, setMoney] = useState(10000);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [history, setHistory] = useState([]);

  const withdraw = () => {
    const amount = parseInt(withdrawAmount);

    if (withdrawAmount > money) {
      alert("ยอดเงินไม่เพียงพอ");
      return;
    } else if (withdrawAmount < 0) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    } else if (money - amount < 1) {
      alert("ต้องมีเงินในบัญชีอย่างน้อย 1 บาท");
      return;
    } else if (withdrawAmount === 0) {
      alert("กรุณากรอกจำนวนเงิน");
      return;
    }

    let result = money - amount;
    setMoney(result);
    setHistory([...history, { amount: amount, result: result }]);
    alert(`ถอนเงินจำนวน ${amount} บาท`);
    setWithdrawAmount(0);
  };

  const button = (amount) => {
    setWithdrawAmount((prevAmount) => (prevAmount ? (parseInt(prevAmount) + amount).toString() : amount.toString()));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600">
        <div className="flex flex-wrap justify-center gap-10 p-6 rounded-xl bg-white shadow-2xl w-full max-w-4xl">
          
          {/* Withdrawal Section */}
          <div className="w-full sm:w-80 p-6 rounded-lg shadow-lg bg-gray-50">
            <h1 className="text-2xl font-bold text-center text-green-700 mb-4">ระบบถอนเงิน</h1>
            <div className="text-center text-xl text-gray-700 mb-6">
              <p>ยอดเงินคงเหลือ: <span className="font-semibold text-green-600">{money}</span> บาท</p>
            </div>
            
            <div className="flex flex-wrap justify-between mb-4">
              { [100, 500, 1000, 5000].map(amount => (
                <button
                  key={amount}
                  onClick={() => button(amount)}
                  className="w-1/2 sm:w-full py-2 text-sm px-3 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md mb-2"
                >
                  {amount} บาท
                </button>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">กรอกจำนวนเงิน</p>
              <input
                type="number"
                value={withdrawAmount}
                min={0}
                onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
                placeholder="กรอกจำนวนเงินที่ต้องการถอน"
                className="w-full p-3 border-2 border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
            </div>

            <button
              onClick={withdraw}
              className="w-full bg-green-700 text-white py-2 rounded-md shadow-lg hover:bg-green-800 transition duration-300"
            >
              ถอนเงิน
            </button>
          </div>

          {/* History Section */}
          <div className="w-full sm:w-80 p-6 rounded-lg shadow-lg bg-gray-50">
            <h1 className="text-2xl font-bold text-center text-green-700 mb-4">ประวัติการถอนเงิน</h1>
            <ul className="space-y-3 text-gray-700">
              {history.map((record, index) => (
                <li key={index} className="flex justify-between">
                  <span>ถอนเงิน {record.amount} บาท</span>
                  <span>คงเหลือ {record.result} บาท</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
