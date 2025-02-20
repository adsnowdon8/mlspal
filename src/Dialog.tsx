export const Dialog: React.FC<{ responses: string[]; questions: string[] }> = ({
  responses,
  questions,
}) => {
  return (
    <>
      {questions.map((q, i) => (
        <QuestionResponse question={q} response={responses[i]} />
      ))}
    </>
  );
};

const QuestionResponse: React.FC<{ question: string; response: string }> = ({
  question,
  response,
}) => {
  return (
    <>
      <div className="p-3 text-right">
        <text className="rounded-s rounded-ss-lg  rounded-e rounded-t rounded-b bg-gray-100 p-2">
          {question}
        </text>
      </div>
      {response ? (
        <div className="text-left p-3">
          <p className="rounded-t rounded-r rounded-b rounded-l bg-gray-200 p-2">
            {response}
          </p>
        </div>
      ) : (
        <div className="p-3 items-center justify-center">
          <p className="rounded bg-gray-200 animate-bounce justify-center pl-4 w-12">
            ...
          </p>
        </div>
      )}
    </>
  );
};
