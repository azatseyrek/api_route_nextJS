// localhost:3000/api/feedback

import fs from 'fs';
import path from 'path';

const buildFeeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
};

const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
};

function handler(req, res) {
  if (req.method === 'POST') {
    const {email, text} = req.body;
    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedbackText: text,
    };
    // Save data to local json file
    const filePath = buildFeeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({message: 'Success!', feedback: newFeedback});
  } else {
    const filePath = buildFeeedbackPath();
    const data = extractFeedback(filePath);
    res.status(201).json({feedback: data});
  }
}

export default handler;
