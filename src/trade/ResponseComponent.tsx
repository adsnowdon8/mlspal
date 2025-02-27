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
          <strong className="font-bold">{match}</strong>
        </>
      )
    );
    return replacedText;
    // return <div className="break-normal">{replacedText}</div>;
  }, [response]);

  // const formattedResponse2 = useMemo(() => {
  //   // response = response.replace(/\*([^\*]*)\*/g, "<em>$1</em>");
  //   const moreFormatted = reactStringReplace(
  //     response,
  //     /\*\*(.*?)\*\*/g,
  //     (match, i) => {
  //       return <div>{match}</div>;
  //     }
  //   );
  //   const moreMoreFormatted = reactStringReplace(
  //     moreFormatted,
  //     /^(\* .*)$/gm,
  //     (match, i) => (
  //       <ul>
  //         {/* <li>-{match.replaceAll("^(* .*)$", "$1")}</li> */}
  //         <li>-{match}</li>
  //       </ul>
  //     )
  //   );
  //   return moreFormatted;
  // }, [response]);
  return (
    <div className="w-full flex flex-col text-wrap justify-center gap-2 pb-40">
      {/* {reactStringReplace(response, /(\d+)/g, (match, i) => (
        <span key={i} style={{ color: "red" }}>
          {match}
        </span>
      ))} */}
      {/* {formattedResponse2} */}
      <pre className="p-5 text-sm whitespace-pre-wrap overflow-y-scroll">
        {formattedResponse}
      </pre>
      {/* <pre>{response}</pre> */}
      {/* {response}
      {response}
      {response} */}
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
