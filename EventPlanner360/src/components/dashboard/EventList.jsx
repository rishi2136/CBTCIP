import EventItem from "./EventItem";

const EventList = ({ eventList }) => {
  return (
    <div className="d-flex justify-content-evenly flex-wrap container-fluid ">
      {eventList.length !== 0 &&
        eventList.map((eachEvent, idx) => (
          <EventItem eachEvent={eachEvent} key={idx} />
        ))}
    </div>
  );
};

export default EventList;
