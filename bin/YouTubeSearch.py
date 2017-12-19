__author__ = '@oscarmarinmiro @ @outliers_es'


# Sample Python code for user authorization

import os

import pprint

import google.oauth2.credentials

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google_auth_oauthlib.flow import InstalledAppFlow

# The CLIENT_SECRETS_FILE variable specifies the name of a file that contains
# the OAuth 2.0 information for this application, including its client_id and
# client_secret.
CLIENT_SECRETS_FILE = "client_secret.json"

# This OAuth 2.0 access scope allows for full read/write access to the
# authenticated user's account and requires requests to use an SSL connection.
SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
API_SERVICE_NAME = 'youtube'
API_VERSION = 'v3'

def get_authenticated_service():
  flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
  credentials = flow.run_console()
  return build(API_SERVICE_NAME, API_VERSION, credentials = credentials)

class YouTubeSearch:

    def __init__(self):

        os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
        self.youtube = get_authenticated_service()

        print "Servicio Autenticado"

        return

    def search(self, query):

        print "1"

        search_response = self.youtube.search().list(
        q=query,
        part="id,snippet",
        videoEmbeddable = "true",
        type="video",
        maxResults=5
        ).execute()

        print "2"

        if len(search_response.get("items", [])) > 0:

            result = search_response.get("items", [])[0]

            print "3"


            video_id = result['id']['videoId']
            description = result['snippet']['description']


            video_details = self.youtube.videos().list(
              part = "statistics",
              id = video_id
            ).execute()

            print "4"

            if len(video_details['items']) > 0:

                view_count = video_details['items'][0]['statistics']['viewCount']

                return {'id': video_id, 'description': description, 'views': view_count}
            else:
                return {'id': None, 'description': None, 'views': 0}
        else:
            return {'id': None, 'description': None, 'views': 0}


if __name__ == "__main__":
    youtube = YouTubeSearch()

    pprint.pprint(youtube.search("calatrava bowie"))