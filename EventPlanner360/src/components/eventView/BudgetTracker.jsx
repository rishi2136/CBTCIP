import { useState } from "react";

const BudgetTracker = ({ myEvent }) => {
  let [paidVendor, setPaidVendor] = useState([]);
  let [input, setInput] = useState({ vendor: "", amount: 0 });

  const handleAdd = () => {
    if (!input.vendor || !input.amount) {
      return;
    }
    setPaidVendor((oldList) => [...oldList, input]);
    setInput({ vendor: "", amount: "" });
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInput((old) => ({ ...old, [name]: value }));
  };

  const handleRemove = (Idx) => {
    setPaidVendor((paidVendor) =>
      paidVendor.filter((el, idx) => idx !== Idx && el)
    );
  };

  //to treasury remains in the event
  let treasury =
    myEvent.budget -
    paidVendor.reduce((sum, el) => (sum += Number(el.amount)), 0);
  return (
    <center className="pb-5">
      <h1>Budget Tracker</h1>
      <table className="guest_table mx-auto table table-striped">
        <thead>
          <tr className="table-dark">
            <th scope="col">#</th>
            <th scope="col">Treasury </th>
            <th scope="col">
              Rs. &nbsp;
              {treasury}
              &nbsp;
              {treasury <= -1 && (
                <div className="badge text-bg-danger">Exceed</div>
              )}
            </th>
            <th scope="col">Controls</th>
          </tr>
        </thead>
        <tbody>
          {paidVendor.map((element, idx) => (
            <tr key={idx}>
              <td scope="col">{idx + 1}</td>
              <td>{element.vendor}</td>
              <td>Rs.{" " + element.amount}</td>
              <td>
                <button
                  className="btn btn-dark"
                  onClick={() => handleRemove(idx)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <th></th>
            <td>
              <select
                className="form-select"
                aria-label="Default select example"
                name="vendor"
                onChange={handleChange}
              >
                {myEvent.vendors.map((vendor, idx) => (
                  <option key={idx} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the amount"
                name="amount"
                value={input.amount}
                onChange={handleChange}
              />
            </td>
            <td>
              <button className="btn btn-primary" onClick={handleAdd}>
                Add
              </button>
            </td>
          </tr>
          <tr className="table-dark">
            <th scope="col"></th>
            <th scope="col">Total Budget </th>
            <th scope="col">
              Rs. &nbsp;
              {paidVendor.reduce((sum, el) => (sum += Number(el.amount)), 0)}
            </th>
            <th scope="col"></th>
          </tr>
        </tbody>
      </table>
    </center>
  );
};

export default BudgetTracker;
