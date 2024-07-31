import DueStatus from "../utils/DueStatus";

const Schedule = ({ eventList }) => {
  return (
    <center>
      <h1 className="fw-bolder">Scheduled Events</h1>
      <table className="table schedule_table table-striped mx-auto ">
        <thead>
          <tr>
            <th scope="col">Event Name</th>
            <th scope="col">Due Date</th>
            <th scope="col">Type</th>
            <th scope="col ">
              <div className="text-center">Status</div>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {eventList.map((event, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>{event.title}</td>
              <td>{event.dueDate}</td>
              <td>
                <DueStatus dueDate={event.dueDate} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  );
};

export default Schedule;
