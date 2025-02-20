from .ollamaUtils import interact_with_model
from .vectordb import SimpleVectorDatabase

class Model:
    def __init__(self, db: SimpleVectorDatabase=None):
        self.convo_history = []
        self.db = db
        self.system_prompt = ""
        self.retrieval_prompt = "Use the following DOCUMENTs to inform your responses to the user. Don't mention the existence of the DOCUMENTs; act like you already know the data they contain."

    def generate_with_context(self, user_input, retrieve=True):
        # include context at start of prompt
        context = self.get_context()
        if retrieve:
            context += self.get_document_context(user_input)
        prompt = context + "\n" + f"prompt: {user_input}"
        # generate a response
        response = self.generate_response(prompt)
        # Update the conversation history with the user input and generated response
        self.set_convo_history(self.convo_history + [f"prompt: {user_input}", f"response: {response}"])
        return response
    
    def set_convo_history(self, conversation):
        self.convo_history = conversation
    
    def get_context(self) -> str:
        context = self.system_prompt + "\n"
        context += "\n".join(self.convo_history)
        return context

    def get_document_context(self, prompt, top_n=5, metric='euclidean') -> str:
        context = ""
        if self.db:
            context += self.retrieval_prompt + "\n"
            context += self.fetch_documents(prompt, top_n=top_n, metric=metric) + "\n"
        return context
    
    def generate_response(self, prompt) -> str:
        return interact_with_model(prompt)
    
    def fetch_documents(self, prompt, top_n=5, metric='euclidean') -> str:
        if self.db == None:
            return ""
        results = self.db.search_by_prompt(prompt, top_n=top_n, metric=metric)
        documents = [f"DOCUMENT: {metadata[0]}" for metadata in results]
        return "\n".join(documents)


if __name__ == "__main__":
    # Example usage
    model = Model()
    print(model.prompt_with_context("Hello, how are you?"))
    print(model.prompt_with_context("Tell me a joke using what you just said"))
    print(model.convo_history)
