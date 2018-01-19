__author__ = '@oscarmarinmiro @ @outliers_es'

import pprint
import json
import time

from YouTubeSearch import YouTubeSearch

FILE_IN = "../data/david_bowie_data.json"

FILE_OUT = "./david_bowie_data.videos.sincometas.json"

print "Init youtube search..."

youtube = YouTubeSearch()

print "youtube search ok"

my_data = json.load(open(FILE_IN, "rb"))

# pprint.pprint(my_data)


for album, entry in my_data.items():
    for track in entry['tracks']:
        if 'covers' in track:
            for cover in track['covers']:
                print "========================="
                # query = '"' + cover['credits'] + '"' + " " + cover['title'] + " bowie"
                query = cover['credits'] + " " + cover['title'] + " bowie"
                cover['youtube'] = youtube.search(query)
                cover['youtube']['query'] = query
                pprint.pprint(cover)
                print "========================="

json.dump(my_data, open(FILE_OUT, "wb"))



