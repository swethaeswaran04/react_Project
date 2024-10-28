import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { v4 as uuidv4 } from 'uuid'; // For generating unique event codes

const MainPage = () => {
  const [date, setDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    totalMembers: '',
    time: '',
    code: '',
    meetingLink: ''
  });
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const navigate = useNavigate(); // For redirecting to Home page

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setShowEventForm(true); // Show the event form after selecting a date
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const generateMeetingLink = () => {
    // Generate a unique meeting link
    return `https://meetings.example.com/${uuidv4()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a unique event code and meeting link
    const eventCode = uuidv4();
    const meetingLink = generateMeetingLink();

    const newEvent = {
      title: eventDetails.title, 
      totalMembers: eventDetails.totalMembers,
      time: eventDetails.time,
      code: eventCode,
      meetingLink,
      date: date.toDateString()
    };

    setScheduledEvents([...scheduledEvents, newEvent]);

    // Reset the form
    setShowEventForm(false);
    setEventDetails({
      title: '',
      totalMembers: '',
      time: '',
      code: '',
      meetingLink: ''
    });
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#021526',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#03346E',
  };

  // Header Component with Logout Button
  const Header = () => {
    const headerStyle = {
      backgroundColor: '#021526',
      color: 'white',
      padding: '10px 0',
      textAlign: 'center',
      borderBottom: '2px solid #03346E',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '20px',
      paddingRight: '20px',
    };

    const handleLogout = () => {
      navigate('/'); // Redirect to Home page on logout
    };

    return (
      <header style={headerStyle}>
        <h1>Event Scheduler</h1>
        <button 
          onClick={handleLogout} 
          style={{
            backgroundColor: '#021526', 
            color: 'white', 
            padding: '8px 16px', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#03346E'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#021526'}
        >
          <b>Logout</b>
        </button>
      </header>
    );
  };

  // Footer Component
  const Footer = () => {
    const footerStyle = {
      backgroundColor: '#021526',
      color: 'white',
      padding: '10px 0',
      textAlign: 'center',
      borderTop: '2px solid #03346E',
      position: 'relative',
      bottom: '0',
      width: '100%',
      marginTop: 'auto',
    };

    return (
      <footer style={footerStyle}>
        <p>&copy; 2024 Event Scheduler. All rights reserved.</p>
      </footer>
    );
  };

  const cardStyle = {
    width: '200px',
    height: '100px',
    perspective: '1000px',
    marginBottom: '10px' // Add some space between cards
  };

  const cardInnerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.999s'
  };

  const cardFrontStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#03346E',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    border: '10px solid #03346E',
    borderRadius: '10px',
    justifyContent: 'center',
    fontSize: '24px',
    transform: 'rotateY(0deg)',
    textAlign: 'center'
  };

  const cardBackStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#F08A5D',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '10px solid #F08A5D',
    borderRadius: '10px',
    justifyContent: 'center',
    fontSize: '16px',
    transform: 'rotateY(180deg)',
    textAlign: 'center',
    padding: '10px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: '1' }}>
        <aside style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', padding: '20px', width: '250px', minHeight: '93vh', borderRight: '2px solid #03346E', overflowY: 'auto' }}>
          <center><h2>Scheduled Events</h2>
          {scheduledEvents.length === 0 ? (
            <p>No events scheduled.</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {scheduledEvents.map((event, index) => (
                <li key={index} style={{ marginBottom: '10px', padding: '10px' }}>
                  <div style={cardStyle}>
                    <div style={cardInnerStyle} className="card-inner">
                      <div style={cardFrontStyle} className="card-front">
                        {event.title}
                      </div>
                      <div style={cardBackStyle} className="card-back">
                        <div>
                          <p>Date: {event.date}</p>
                          <p>Time: {event.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          </center>
        </aside>
        <div style={{ flex: '1', padding: '20px', backgroundImage: "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkwNC1udW5ueS0wMTJfMi5qcGc.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '93vh' }}>
          <center>
            <h1 style={{color: '#000'}}>Scheduling Page</h1>
            <Calendar
              onChange={handleDateChange}
              value={date}
            />
            
            {showEventForm && (
              
              <div style={{ marginTop: '20px', width: '100%', maxWidth: '500px', backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
                <h2 style={{color: '#fff'}}>Schedule an Event</h2>
                <center>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '10px', color: '#fff'}}>
                    <p>Title</p>
                    <input
                      type="text"
                      name="title"
                      value={eventDetails.title}
                      onChange={handleInputChange}
                      required
                      style={{ color: 'white',border: '2px solid #29ABE2',borderRadius: '10px',padding: '10px 25px',background: 'transparent',maxWidth: '190px' }}
                    />
                  </label>
                  <label style={{ marginBottom: '10px', color: '#fff' }}>
                    <p>Total Members</p>
                    <input
                      type="number"
                      name="totalMembers"
                      value={eventDetails.totalMembers}
                      onChange={handleInputChange}
                      required
                      style={{ color: 'white',border: '2px solid #29ABE2',borderRadius: '10px',padding: '10px 25px',background: 'transparent',maxWidth: '190px' }}
                    />
                  </label>
                  <label style={{ marginBottom: '10px', color: '#fff' }}>
                    <p>Time</p>
                    <input
                      type="time"
                      name="time"
                      value={eventDetails.time}
                      onChange={handleInputChange}
                      required
                      style={{ color: 'white',border: '2px solid #29ABE2',borderRadius: '10px',padding: '10px 25px',background: 'transparent',maxWidth: '190px' }}
                    />
                  </label>
                  <button type="submit"
                style={buttonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>
                    Schedule Event
                  </button>
                </form>
                </center>
              </div>
            )}
            {scheduledEvents.length > 0 && (
            <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px', textAlign: 'left' }}>
              <center><h2>Scheduled Events</h2></center>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {scheduledEvents.map((event, index) => (
                  <li key={index} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#222', borderRadius: '8px', color: '#fff' }}>
                    <p>Meeting Title: <strong>{event.title}</strong></p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Total Members: {event.totalMembers}</p>
                    <p>Event Code: {event.code}</p>
                    <p>Meeting Link: <a href={event.meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: '#00f' }}>{event.meetingLink}</a></p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </center>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
