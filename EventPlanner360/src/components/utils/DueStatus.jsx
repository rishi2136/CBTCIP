const DueStatus = ({ dueDate, size }) => {
  const daysLeftOver = Math.ceil(
    (new Date(dueDate).getTime() - new Date(Date.now()).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <span
      className="badge text-bg-danger float-end me-1"
      style={{ fontSize: `${size}px` }}
    >
      {daysLeftOver === 0
        ? `Today is the Event Day`
        : `${daysLeftOver}  Days Left`}
    </span>
  );
};

export default DueStatus;
