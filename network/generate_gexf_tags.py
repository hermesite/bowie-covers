__author__ = '@oscarmarinmiro @ @outliers_es'


import pprint
import json
import networkx as nx

FILE_IN = "../data/david_bowie_data.json"
FILE_OUT =  "coocurr_tags_album.gexf"

ALBUM_SIZE = 90

MIN_TAG_COUNTS = 5

# Load data from file

my_data = json.load(open(FILE_IN, "rb"))

network = {}
album_network = {}

songs_by_tag = {}

tag_counts = {}

# Iterate albums

for album_id, entry in my_data.items():

    # Get title

    album_name = entry['title']

    album_network[album_name] = {}

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
                        sorted_tags = sorted(cover['tags'])

                        for i in range(0, len(sorted_tags) -1):
                            for j in range(i, len(sorted_tags)):

                                source = sorted_tags[i]
                                target = sorted_tags[j]

                                if source!=target:

                                    if source not in network:
                                        network[source] = {}

                                    if target not in network[source]:
                                        network[source][target] = 0

                                    network[source][target]+=1

                    for tag in cover['tags']:
                        if not tag in album_network[album_name]:
                            album_network[album_name][tag] = 0
                        album_network[album_name][tag]+=1

# Generate network

# print network data

# pprint.pprint(network)

G = nx.Graph()

for source, entry in network.items():
    for target,weight in entry.items():
        G.add_edge(source, target, weight=weight)
        G.node[source]['type'] = "tag"
        G.node[target]['type'] = "tag"


for album, tags in album_network.items():
    print "Album %s" % album
    for tag, count in tags.items():

        # Only add tag count with more than N global connections

        G.add_edge(album, tag, weight=count)
        G.node[album]['type'] = "album"
        G.node[tag]['type'] = "tag"


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


