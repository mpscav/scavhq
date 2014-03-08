import scavhq, unittest, json
from pymongo import MongoClient

class ScavhqTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        scavhq.app.config['TESTING'] = True
        self.app = scavhq.app.test_client()

        self.client = MongoClient('localhost', 27017)
        self.items = self.client['scavhq-dev'].items

    def tearDown(self):
        self.items.remove()

    @classmethod
    def tearDownClass(self):
        self.client.disconnect()

class TestItemAPI(ScavhqTestCase):
    def test_get_index_none_exist(self):
        response = self.app.get('/api/items')
        assert json.loads(response.data) == []

    def test_get_index_with_items(self):
        self.items.insert({'num': 1, 'page': 1, 'text': 'Bring me Big Bertha!', 'value': '43 points'})
        response = self.app.get('/api/items')
        assert json.loads(response.data)[0]['num'] == 1

    def test_add_item(self):
        response = self.app.post('/api/items', data=json.dumps(dict(
            num=1,
            page=1,
            text='Bring me Big Bertha!',
            value = '43 points'
        )), content_type="application/json")

        assert response.status_code == 201
        
        item = self.items.find_one({'text': 'Bring me Big Bertha!'})
        assert item['num'] == 1

    def test_edit_item_that_exists(self):
        self.items.insert({'num': 1, 'page': 1, 'text': 'Bring me Big Bertha!', 'value': '43 points'})
        response = self.app.post('/api/items/1', data=json.dumps(dict(page=2)), content_type="application/json")
        
        assert response.status_code == 200

        item = self.items.find_one({'text': 'Bring me Big Bertha!'})
        assert item['page'] == 2

    def test_edit_item_that_does_not_exist(self):
        self.items.insert({'num': 1, 'page': 1, 'text': 'Bring me Big Bertha!', 'value': '43 points'})
        response = self.app.post('/api/items/2', data=json.dumps(dict(page=2)), content_type="application/json")
        
        assert response.status_code == 404

    def test_delete_item_that_exists(self):
        self.items.insert({'num': 1, 'page': 1, 'text': 'Bring me Big Bertha!', 'value': '43 points'})
        response = self.app.delete('/api/items/1')

        assert response.status_code == 200

    def test_delete_nonexisting_item(self):
        self.items.insert({'num': 1, 'page': 1, 'text': 'Bring me Big Bertha!', 'value': '43 points'})
        response = self.app.delete('/api/items/2')

        assert response.status_code == 404

if __name__ == "__main__":
    unittest.main()
