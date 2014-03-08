from flask import Flask, Response, request, send_file
from pymongo import MongoClient
from bson import json_util
import json

app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client['scavhq-dev']

# Dev settings
app.config['DEBUG'] = True
app.config['PROPAGATE_EXCEPTIONS'] = True

@app.route('/')
def index():
    return send_file('templates/index.html')

@app.route('/api/items', methods=['GET'])
def items_get_all():
    items_json = json.dumps(list(db.items.find()), default=json_util.default)
    return Response(response=items_json, status=200, mimetype="application/json")

@app.route('/api/items', methods=['POST'])
def items_add():
    item = request.get_json()
    db.items.insert(item)
    return Response(status=201)

@app.route('/api/items/<num>', methods=['POST'])
def item_edit(num):
    result = db.items.update({'num': int(num)}, {"$set": {u'page': 2}}, upsert=False, multi=False)
    status = 404 if result['updatedExisting'] is False else 200
    return Response(status=status)

@app.route('/api/items/<num>', methods=['DELETE'])
def item_destroy(num):
    result = db.items.remove({'num': int(num)})
    status = 404 if result['n'] is 0 else 200
    return Response(status=status)

if __name__ == "__main__":
    app.run()
