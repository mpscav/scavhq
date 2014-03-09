if __name__ == "__main__":
    from pymongo import MongoClient
    client = MongoClient('localhost', 27017)
    db = client['scavhq-dev']
    
    import inspect, os, json
    path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))

    items_file = path + '/seeds/items.json'
    if os.path.isfile(items_file):
        json_data = open(items_file)
        items = json.load(json_data)

        for item in items:
            db.items.insert({
                'num': item['number'],
                'page': item['page'],
                'text': item['text'],
                'value': item['value']
            })

        json_data.close()
    else:
        print 'items.json not present in the seeds/ directory'

    scavolympics_file = path + '/seeds/scavolympics.json'
    if os.path.isfile(scavolympics_file):
        json_data = open(scavolympics_file)
        events = json.load(json_data)

        for event in events:
            db.scavolympics.insert({'text': event})

        json_data.close()
    else:
        print 'scavolympics.json not present in the seeds/ directory'

    client.disconnect()
