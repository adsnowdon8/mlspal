# this shit is not working for me
# the api key is a json file that I guess I need to send you
# im thinking this shit is dumb and we should just like download some csvs locally
# but if you want to set up a cloud db please d0 1t

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("../bullshit-f5726-firebase-adminsdk-z723v-442af069a0.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def get_single_document(collection_name, document_id):
    doc_ref = db.collection(collection_name).document(document_id)
    doc = doc_ref.get()

    if doc.exists:
        return doc.to_dict()
    else:
        print(f'No such document with ID: {document_id}')
        raise Exception

def get_all_documents(collection_name):
    docs = db.collection(collection_name).stream()
    return [doc.to_dict() for doc in docs]

def query_documents(collection_name, field, value):
    docs = db.collection(collection_name).where(field, '==', value).stream()
    return [doc.to_dict() for doc in docs]

def set_document(collection_name, document_id, data):
    doc_ref = db.collection(collection_name).document(document_id)
    doc_ref.set(data)
    print(f'Document with ID: {document_id} has been set')


if __name__ == "__main__":
    docs = get_all_documents('testing')
    print(docs)

