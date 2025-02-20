import numpy as np
from .textEmbeddingUtils import embed_text

class SimpleVectorDatabase:
    def __init__(self):
        # Store vectors and their associated data (metadata, labels)
        self.vectors = []
        self.data = []
    
    def add_vector(self, vector, metadata):
        """Add a vector to the database with its associated metadata."""
        self.vectors.append(np.array(vector))
        self.data.append(metadata)
    
    def euclidean_distance(self, v1, v2):
        """Calculate Euclidean distance between two vectors."""
        return np.linalg.norm(v1 - v2)
    
    def cosine_similarity(self, v1, v2):
        """Calculate Cosine similarity between two vectors."""
        return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
    
    def search_by_vector(self, query_vector, top_n=5, metric='euclidean'):
        """Search for the top_n vectors closest to the query vector."""
        if not isinstance(query_vector, np.ndarray):
            query_vector = np.array(query_vector)
        
        # Calculate distances/similarities between the query and all vectors
        distances = []
        for i, vector in enumerate(self.vectors):
            if metric == 'euclidean':
                distance = self.euclidean_distance(query_vector, vector)
            elif metric == 'cosine':
                distance = -self.cosine_similarity(query_vector, vector)  # Negate for descending order
            distances.append((distance, i))  # Store distance and index
        
        # Sort by distance (smallest first) and return the top N results
        distances.sort(key=lambda x: x[0])
        closest_vectors = [(self.data[i], self.vectors[i], dist) for dist, i in distances[:top_n]]
 
        return closest_vectors
    
    def search_by_prompt(self, prompt, top_n=5, metric='euclidean'):
        """Search for the top_n vectors closest to the prompt's query vector."""
        query_vector = embed_text(prompt)
        return self.search_by_vector(query_vector, top_n=top_n, metric=metric)



if __name__ == "__main__":
        
    # Example Usage:
    db = SimpleVectorDatabase()

    # Add some example vectors (e.g., document embeddings or image feature vectors)
    db.add_vector([1.0, 2.0, 3.0], metadata="Vector A")
    db.add_vector([4.0, 5.0, 6.0], metadata="Vector B")
    db.add_vector([7.0, 8.0, 9.0], metadata="Vector C")
    db.add_vector([1.1, 2.1, 3.1], metadata="Vector D")

    # Perform a search with a query vector
    query = [1.0, 2.0, 3.0]
    results = db.search(query_vector=query, top_n=2, metric='euclidean')

    # Display the results
    for metadata, vector, distance in results:
        print(f"Metadata: {metadata}, Vector: {vector}, Distance: {distance}")
