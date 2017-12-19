__author__ = '@oscarmarinmiro @ @outliers_es'


import pprint
import json
import networkx as nx

FILE_IN = "../data/david_bowie_data.json"
FILE_OUT =  "album_tags_nuevo.gexf"

ALBUM_SIZE = 90

MIN_TAG_COUNTS = 5

# Load data from file

my_data = json.load(open(FILE_IN, "rb"))

network = {}

songs_by_tag = {}

tag_counts = {}

# Iterate albums

for album_id, entry in my_data.items():

    # Get title

    album_name = entry['title']

    network[album_name] = {}

    for track in entry['tracks']:

        # To avoid duplicate authors...

        credits = {}

        # Update album tags for each cover

        if 'covers' in track:
            for cover in track['covers']:
                if not cover['credits'] in credits:

                    title = cover['title']

                    credits[cover['credits']] = True

                    if 'tags' in cover:
                        for tag in cover['tags']:

                            if not tag in network[album_name]:
                                network[album_name][tag] = 0
                            network[album_name][tag]+=1

                            if title is not None:
                                if not tag in songs_by_tag:
                                    songs_by_tag[tag] = {}

                                songs_by_tag[tag][title] = True

                            if not tag in tag_counts:
                                tag_counts[tag] = 0

                            tag_counts[tag]+=1

# Generate network

# print network data

# pprint.pprint(network)

G = nx.Graph()

for album, tags in network.items():
    for tag, count in tags.items():

        # Only add tag count with more than N global connections

        if tag_counts[tag] > MIN_TAG_COUNTS:
            G.add_edge(album, tag, weight=count)
            G.node[album]['type'] = "album"
            G.node[tag]['type'] = "tag"
            G.node[album]['size'] = ALBUM_SIZE + 0.0
            G.node[tag]['size'] = tag_counts[tag] + 0.0

# for node, data in G.nodes(data = True):
#
#     print "==========="
#     pprint.pprint(node)
#     pprint.pprint(data)
#     pprint.pprint(G.degree(node))
#     pprint.pprint(G.node[node])

# sorted_nodes = sorted(tag_counts.keys(), key = lambda node: tag_counts[node], reverse = True)

# print "====== SONGS BY TAG ======"
# pprint.pprint(songs_by_tag)
# print "====== SONGS BY TAG ======"

# for node in sorted_nodes:
#     if G.node[node]['type'] == "tag":
#         print "%s\t%d" % (node, tag_counts[node])
#
        # pprint.pprint(songs_by_tag[node])


nx.write_gexf(G, FILE_OUT)


