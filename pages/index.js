import {useRef, useState} from 'react';
import path from 'path';

export default function Home() {
  // Refs
  const emailInputRef = useRef('');
  const feedbackInputRef = useRef('');

  // Functions

  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    const response = await fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.feedback));
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    // fetch /api/feedback
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input ref={emailInputRef} id="email" type="text" />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea ref={feedbackInputRef} id="feedback" rows="5"></textarea>
        </div>
        <button type="submit">Send Feedback</button>
      </form>

      <hr />

      <button onClick={getFeedbacks}>Get Feedbacks</button>

      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}> {feedback.feedbackText}</li>
        ))}
      </ul>
    </div>
  );
}
