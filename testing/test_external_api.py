import base64
import json
import requests
import unittest


class TestExternalApi(unittest.TestCase):

    JSON_KEY_PATH = './api_keys.json'

    # ------------------------------ SETUP ------------------------------
    @classmethod
    def setUpClass(cls):
        cls._api_keys = cls._get_api_keys()

    # ------------------------------ HELPER FUNCTIONS ------------------------------
    @staticmethod
    def _get_api_keys():
        """
        Load a json file containing API keys and return a json object.
        """
        try:
            with open(TestExternalApi.JSON_KEY_PATH, 'r') as json_file:
                data = json.load(json_file)
            return data
        except Exception:
            return None

    @staticmethod
    def _get_image_bytes(image_path):
        """
        Return an image from disk in terms of its base64 bytes string.
        """
        with open(image_path, 'rb') as image_file:
            file_bytes = image_file.read()
        base_64_file_bytes = base64.b64encode(file_bytes)
        return base_64_file_bytes.decode()

    # ------------------------------ TESTS ------------------------------
    def test_facebook_popup(self):
        """
        Test that the Facebook API key works and responds with login page.
        """
        payload = {
            'skip_api_login': 1,
            'api_key': self._api_keys['facebook'],
            'signed_next': 1,
            'display': 'popup',
            'locale': 'en_US'
        }
        response = requests.get('https://facebook.com/login.php', params=payload)
        self.assertEqual(200, response.status_code, 'Bad response status code')

        # Make sure relevant login info is present
        self.assertIn('Log in to use your Facebook account with', response.text)
        self.assertIn('SocialStache', response.text)

    def test_clarifai(self):
        """
        Test that the Clarifai API key works and that Clarifai can correctly
        label an example image.
        """
        # Forming the request
        headers = {
            'Authorization': 'Key ' + self._api_keys['clarifai']
        }
        base_64_file_bytes = TestExternalApi._get_image_bytes('./TestMountains.jpg')
        json_string = '{ \
                "inputs": [ \
                    { \
                        "data": { \
                            "image": { \
                                "base64": "' + base_64_file_bytes + '"' + ' \
                            } \
                        } \
                    } \
                ] \
        }'

        # Make the request
        response = requests.post('https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs',
                                 headers=headers,
                                 json=json.loads(json_string))

        # Make sure the request succeeded
        self.assertEqual(200, response.status_code)

        # Make sure Clarifai recognizes the image as a mountain
        response_json = response.json()
        concepts = response_json['outputs'][0]['data']['concepts']
        for concept in concepts:
            if 'mountain' in concept['name'] or 'mountains' in concept['name']:
                return
        self.fail()


if __name__ == '__main__':
	unittest.main()
