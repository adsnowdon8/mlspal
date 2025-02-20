from sentence_transformers import SentenceTransformer

# Load a pre-trained model
model = SentenceTransformer('all-MiniLM-L6-v2')

# np array of text embedding in shape [1, embeddingDim]
def embed_text(text):
    return model.encode([text])

# nd np array of text embeddings in shape [numEntries, embeddginDim]
def embed_many_texts(texts):
    return model.encode(texts)
