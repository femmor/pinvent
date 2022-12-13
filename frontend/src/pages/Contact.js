import { useState } from 'react';
import { Card } from '../components';
import { FaPhoneAlt, FaEnvelope, FaTwitter, GoLocation } from '../utils/icons';
import '../styles/Contact.scss';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../services/authService';

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const data = {
    subject,
    message,
  };

  const sendEmail = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactUs`, data);
      setSubject('');
      setMessage('');
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              placeholder="Please enter your message here..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              cols={30}
              rows={10}
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Send Message
            </button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass="card2">
            <h3>Contact Information</h3>
            <div>
              Please fill the form or contact us via other channels listed
              below.
              <div className="icons">
                <span>
                  <FaPhoneAlt />
                  <span>+1 813 000 0000</span>
                </span>
                <span>
                  <FaEnvelope />
                  <span>support@pinvent.com</span>
                </span>
                <span>
                  <GoLocation />
                  <span>Dallas, Texas</span>
                </span>
                <span>
                  <FaTwitter />
                  <span>@femmycodes</span>
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Contact;
