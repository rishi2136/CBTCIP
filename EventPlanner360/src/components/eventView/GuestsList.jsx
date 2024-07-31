import axios from "axios";
import { useEffect, useState } from "react";

const GuestsList = ({ myEvent }) => {
  let [modifiedEvent, setModifiedEvent] = useState(myEvent);
  let [addGuestList, setAddGuestList] = useState([]);
  let [info, setInfo] = useState({ name: "", email: "" });
  let [isExist, setIsExist] = useState(false);

  useEffect(() => {
    let guestInit = async () => {
      let res = await axios.get(
        `http://localhost:3001/events/${myEvent._id}/guests`
      );
      setModifiedEvent({ ...res.data });
    };
    guestInit();
  }, []);

  let handleAddAllGuest = async () => {
    let res = await axios.put(
      `http://localhost:3001/events/${myEvent._id}/guests`,
      {
        guests: addGuestList,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let modifiedEvent = res.data;
    setModifiedEvent(modifiedEvent);
    setAddGuestList([]);
    setInfo({ name: "", email: "" });
  };

  let IsGuestExist =
    modifiedEvent.guests.every((el) => el.email !== info.email) &&
    addGuestList.every((el) => el.email !== info.email);

  let handleAddClick = () => {
    if (IsGuestExist) {
      setAddGuestList((list) => [...list, info]);
      setInfo({ name: "", email: "" });
      return;
    } else {
      setIsExist(true);

      setInfo({ name: "", email: "" });
      return;
    }
  };

  let handleChange = (evt) => {
    setInfo((oldInfo) => ({ ...oldInfo, [evt.target.name]: evt.target.value }));
  };

  let handleRemoveClick = (removeGuestIdx) => {
    setAddGuestList((list) => list.filter((el, idx) => idx !== removeGuestIdx));
  };

  return (
    <>
      <h1 className="text-center">
        <strong>Add Guest List here</strong>
      </h1>
      <table className="table guest_table mx-auto">
        <thead>
          <tr>
            <th scope="col">NO.</th>
            <th scope="col">Guest Name</th>
            <th scope="col">Email</th>
            <th scope="col">
              <button
                className="btn btn-dark float-end"
                onClick={handleAddAllGuest}
              >
                Add all
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {modifiedEvent.guests.map((item, idx) => (
            <tr key={idx} className="table-info">
              <th scope="row">{idx + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <span className="badge text-bg-success">Added</span>
                {item.isInvited === true && (
                  <span className="badge text-bg-dark ms-2 ">Confirmed</span>
                )}
              </td>
            </tr>
          ))}
          {addGuestList.map((item, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRemoveClick(idx)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      {isExist && (
        <div className="text-center fw-600">Guest Already in the list</div>
      )}
      {/* input part for insert guests */}
      <div className="input-group mb-3 guest_input_container mx-auto  ">
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          name="name"
          value={info.name}
          onChange={handleChange}
        />
        <span className="input-group-text">@</span>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          value={info.email}
          onChange={handleChange}
        />
        <button
          className="btn btn-outline-secondary "
          type="button"
          onClick={() => {
            setIsExist(false);
            handleAddClick();
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </>
  );
};

export default GuestsList;
