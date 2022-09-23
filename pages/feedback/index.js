import path from 'path';
import fs from 'fs';

const FeedbackPage = (props) => {
  const {feedbackItems} = props;
  return (
    <ul>
      {feedbackItems.map((item) => (
        <li key={item.id}> {item.feedbackText}</li>
      ))}
    </ul>
  );
};

export default FeedbackPage;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
