const Vendors = ({ handleClick }) => {
  let vendors = [
    "Carters",
    "Rentals",
    "Music",
    "Photographers",
    "Makeup artist",
    "DJ",
    "Mehendi artist",
    "Decor",
    "Entertainment",
    "Wedding gifts",
  ];

  return (
    <>
      <h1 className="text-center m-3">Listed Vendors</h1>
      <ul
        className="budgetOptions row row-cols-md-3 row-cols-2 g-3 row-cols-lg-5 "
        style={{ width: "100%" }}
      >
        {vendors.map((el, idx) => (
          <li
            className="col vendor_card"
            key={idx}
            onClick={() => handleClick(el)}
          >
            <div className="card">
              <h1 className="text-center my-auto">{el}</h1>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Vendors;
