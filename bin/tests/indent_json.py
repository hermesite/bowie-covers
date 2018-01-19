__author__ = '@oscarmarinmiro @ @outliers_es'

import json

FILE_IN = "david_bowie_data.videos.json"

FILE_OUT = "david_bowie_data.videos.indented.json"

with open(FILE_IN, "rb") as in_file:
    json.dump(json.load(in_file), open(FILE_OUT, "wb"), indent = 4)