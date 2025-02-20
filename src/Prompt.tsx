import { ChangeEvent, useCallback, useState } from "react";
import { Dialog } from "./Dialog";

const GEMINI_ENDPOINT = "/google";
const LOCAL_ENDPOINT = "/local";
const USERNAME = "user1";

export const PromptView: React.FC<{
  prompViewState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}> = ({ prompViewState }) => {
  const [question, setQuestion] = useState("");
  const [questionsAsked, setQuestionsAsked] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [, setPromptView] = prompViewState;

  const [post, setPost] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
    // console.log("value is:", event.target.value);
  };

  const createPost = useCallback((question: string, endpoint: string) => {
    console.log({ creating: question });
    if (!question) return;
    // setLoading(true);

    setQuestionsAsked((q) => [...q, question]);
    const sendQuestion = question;
    setQuestion("");

    setResponses((r) => [...r, "test response"]);

    // axios({
    //   method: "post",
    //   url: endpoint,
    //   data: {
    //     question: sendQuestion,
    //     username: USERNAME,
    //   },
    // })
    //   .then((response) => {
    //     console.log({ response });
    //     setPost(response.data);
    //     setLoading(false);

    //     setResponses((r) => [...r, response.data]);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log(error.response);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     }
    //   });
  }, []);

  return (
    <div className="absolute flex flex-col inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold  text-xl p-3">MLS Players GPT</h1>
        <button
          className="mb-3 p-1 bg-green-50 rounded border"
          onClick={() => {
            setPromptView(false);
          }}
        >
          Table View
        </button>
      </div>

      <div>
        {questionsAsked.length > 0 && (
          <div className="m-5 bg-white rounded border h-[500px] border-gray-100 overflow-auto">
            <Dialog responses={responses} questions={questionsAsked} />
          </div>
        )}
        <div className="flex gap-3 justify-center mb-8">
          <input
            type="text"
            id="question"
            name="question"
            onChange={handleTextChange}
            value={question}
            size={50}
            className="border rounded text-xs p-2"
          />
          {/* <button
            onClick={() => createPost(question, GEMINI_ENDPOINT)}
            disabled={!question || loading}
            className="text-sm ml-1 bg-red-400 rounded p-2 "
          >
            Send to Gemini
          </button> */}
          <button
            onClick={() => createPost(question, LOCAL_ENDPOINT)}
            disabled={!question || loading}
            className={"text-sm ml-1 bg-orange-400 rounded p-2 border"}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
