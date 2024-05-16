

import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './event.css'; // Import CSS styles

export function EventsContainer({ eventsData, onVoteButtonClick, onFormButtonClick }) {
    // Function to convert Unix timestamp to human-readable date and time
    const [clickedEvents, setClickedEvents] = useState({});
    function timeConverter(UNIX_timestamp) {
        var milliseconds = UNIX_timestamp / 1000000; // Convert nanoseconds to milliseconds
        var a = new Date(milliseconds);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = hour + ':' + min + ':' + sec;
        var date_ = date + ' ' + month + ' ' + year;
        return [time, date_];
    }

    useEffect(() => {
        console.log(eventsData)
    }, [eventsData]); // Include eventsData in the dependency array

    const handleVoteClick = (eventId) => {
        onVoteButtonClick(eventId)
    };
    const handleFormClick = () => {
        onFormButtonClick()
    };

    return (
        <div className="container events-container">
            <div className="event-containerx header11">
                <div className="event-detailsx event-head">
                    <h2>Events</h2>
                </div>
                <div className="event-detailsx form11">
                    <button className="buttnon123" onClick={() => handleFormClick()} role="button">Add Event</button>
                </div>
            </div>
            <div id="events-list">
                {Object.keys(eventsData).map(key => (
                    <div key={key} className="event">
                        <div className="event-containerx">
                            <div className="event-detailsx, event-detailse">
                                <p>{timeConverter(eventsData[key].created_at)[1]}</p>
                                <p className="time">{timeConverter(eventsData[key].created_at)[0]}</p>
                            </div>
                            <div className="event-detailsx">
                                <h3>{eventsData[key].title}</h3>
                                <h5>{eventsData[key].creator}</h5>
                                <p className="discrip">{eventsData[key].description}</p>
                            </div>
                            <div className="event-detailsx line-edit">
                                <button className="button-89 vote-button" onClick={() => handleVoteClick(eventsData[key].id)} role="button">vote <p> {eventsData[key].votes ? eventsData[key].votes.length : 0}</p></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


}

