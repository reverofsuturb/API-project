import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "../../store/events";
import { fetchGroup } from "../../store/groups";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton/";
import { DeleteModal } from "../DeleteModal";
import "./EventDetailsPage.css";

export function EventDetailsPage() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { user } = useSelector((state) => state.session);
  const event = useSelector((state) => state.events[eventId]);
  const group = useSelector((state) => state.groups[event?.groupId]);
  const [showButton, setShowButton] = useState(false);
  const startDate = new Date(event?.startDate).toDateString();
  const startTime = new Date(event?.startDate).toLocaleTimeString();
  const endDate = new Date(event?.endDate).toDateString();
  const endTime = new Date(event?.endDate).toLocaleTimeString();
  const type = "event";

  useEffect(() => {
    dispatch(fetchEvent(eventId));
    dispatch(fetchGroup(event?.groupId));
  }, [dispatch, eventId, event?.groupId]);

  return (
    <div className="ed-container">
      <Link to="/events">Events</Link>
      <h2>{event?.name}</h2>
      <p>
        Hosted by: {group?.Organizer && group?.Organizer.firstName}{" "}
        {group?.Organizer && group?.Organizer.lastName}
      </p>
      <div className="ed-banner">
        <div className="ed-img-container">
          <img
            className="ed-img"
            src={event?.EventImages && `${event?.EventImages.url}`}
            alt=""
          />
        </div>

        <div className="ed-info-container">
          <Link className="ed-link" to={`/groups/${event?.groupId}`}>
            <div className="ed-group-info">
              {group?.GroupImages && (
                <img className="ed-group-img" src={group?.GroupImages[0].url} />
              )}
              <div className="ed-group-nametype">
                <p>{group?.name}</p>
                <p style={{ color: "grey" }}>{group?.type}</p>
              </div>
            </div>
          </Link>
          <div className="ed-event-info">
            <div className="ed-datetime">
              <p>
                Start: {startDate} {startTime}
                End: {endDate} {endTime}
              </p>
            </div>
            <div className="ed-price">
              {event?.price && event?.price > 0 ? `$ ${event?.price}` : "FREE"}
            </div>
            <div className="ed-type">{event?.type}</div>
          </div>
          {user?.id == group?.organizerId && (
            <div className="ed-button">
              <OpenModalButton
                buttonText="Delete Event"
                modalComponent={<DeleteModal type={type} id={eventId} />}
              />
            </div>
          )}
        </div>
      </div>
      <h2>Details</h2>
      <p>{event?.description}</p>
    </div>
  );
}
