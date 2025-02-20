from .repl import start_repl
from .textEmbeddingUtils import embed_text, embed_many_texts
from .vectordb import SimpleVectorDatabase
from .weatherDataUtils import get_current_weather_data_by_city

def main():
    db = SimpleVectorDatabase()
    city_names = ["Boston", "Sewanee", "Boulder", "San Diego", "San Francisco", "New York", "Los Angeles"]
    data = [f"{i} weather: {get_current_weather_data_by_city(i)}F" for i in city_names]
    print(data)
    # get vector embedding for each document
    embeddings = embed_many_texts(data)
    # add each document and its vector embedding to the db to enable rag
    for i in range(embeddings.shape[0]):
        db.add_vector(embeddings[i], data[i])
    


    start_repl(db)

if __name__ == "__main__":
    main()