from .ollamaUtils import interact_with_model
from .vectordb import SimpleVectorDatabase

def get_multiline_input():
    prompt = ""
    while True:
        # Get a single line of input
        next_line = input("> ")
        # If this is our last line, we stop reading input. Otherwise, we append it to current_line and continue reading.
        if not next_line.strip():
            break
        # Append the new line to the existing line.
        prompt += next_line
    return prompt

def fetch_documents(prompt, db: SimpleVectorDatabase, top_n=5, metric='euclidean'):
    results = db.search_by_prompt(prompt, top_n=top_n, metric=metric)
    documents = [f"DOCUMENT: {metadata[0]}" for metadata in results]
    return "\n".join(documents)

# i want to extract the model from this a bit into its own object which will handle context if need be
def start_repl(db: SimpleVectorDatabase = None):
    print("You may speak to god: ")
    document_prefix_prompt = "The following DOCUMENTS provide factual context for you to build your answers around to respond to the USER:\n"
    # document_prefix_prompt = "When responding, treat the following documents as multiple choice selections, only respond with the exact content of the document you think is the best choice:\n"
    context = ""
    while True:
        try:
            # Read all lines from standard input
            prompt = get_multiline_input()
            # Exit condition
            if prompt.lower() == 'exit':
                print("Exiting...")
                break
            # Context clearing condition
            if prompt.lower() == 'clear context':
                print("Clearing context...")
                context = ""
                continue
            # generate prompt with context
            interaction = "USER: " + prompt + "\n\n"
            document_context = ""
            if db is not None:
                relevant_documents = fetch_documents(prompt, db, top_n=5)
                document_context = document_prefix_prompt + relevant_documents
            full_convo = document_context + context + interaction
            # prompt model
            print("Model is thinking...\n")
            response = interact_with_model(full_convo)
            # update context
            interaction += f"Your response: {response}\n\n"
            context += interaction

            print(f"Model: {response}")

            # print(f"Documents Retrieved: {document_context}\n")

        except Exception as e:
            print("Error:", str(e))
