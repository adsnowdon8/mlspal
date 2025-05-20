import { useMemo } from "react";
import reactStringReplace from "react-string-replace";

export const ResponseComponent: React.FC<{
  response: string;
  setResponse: (response: string) => void;
}> = ({ response, setResponse }) => {
  // response = testResponse;
  const formattedResponse = useMemo(() => {
    const strReplace = response.replace(/(?<!\*)(\*\s)+/g, "-");
    const replacedText = reactStringReplace(
      strReplace,
      /\*\*(.*?)\*\*/g,
      (match, i) => (
        <>
          <strong className="font-bold" key={i}>
            {match}
          </strong>
        </>
      )
    );
    return replacedText;
  }, [response]);

  return (
    <div className="w-full h-full flex flex-col text-wrap justify-center gap-2 pb-8 relative overflow-auto">
      <pre className="p-5 h-full text-sm whitespace-pre-wrap overflow-y-scroll">
        {formattedResponse}
      </pre>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            navigator.clipboard.writeText(response);
          }}
          className="rounded bg-gray-200 p-2"
        >
          copy
        </button>
        <button
          className="rounded bg-gray-200 p-2"
          onClick={() => setResponse("")}
        >
          New Trade
        </button>
      </div>
    </div>
  );
};
