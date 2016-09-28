 'use strict';

        var
            widthTreemap = $(window).width(),
            heightTreemap = $(window).height(),
            widthRadial = $('#covers-bowie').width(),
            diameter = widthRadial,
            radialOffset = widthRadial / 5;

        var tree = d3.layout.tree()
            .size([360, diameter / 2 - radialOffset])
            .separation(function(a, b) {
                return (a.parent === b.parent ? 1 : 2) / a.depth;
            });

        var diagonal = d3.svg.diagonal.radial()
            .projection(function(d) {
                return [d.y, d.x / 180 * Math.PI];
            });

        var div = d3.select('#covers-treemap')
            .style('width', widthTreemap + 'px')
            .style('height', heightTreemap + 'px');


        d3.json('data/david_bowie_data.json', function(error, artist) {

            if (error) {
                return error;
            }

            var isCover;
            var colorCover;
            var countCovers = [];

            $.each(artist, function(i, album) {
                $.each(album.tracks, function(j, track) {
                    $.each(track.covers, function(k, cover) {
                        if (cover.credits === 'David Bowie') {
                            countCovers.push(track.title);
                        }
                    });
                });
            });

            // Parse JSON to fit treemap structure
            var myData = artist;

            var bowieSongsTree = {
                'name': 'Bowie',
                'children': []
            };

            var bowieSongsSun = {
                'name': 'Bowie',
                'children': []
            };

            var bowieSongsRadial = {
                'name': 'Bowie',
                'children': []
            };

            function createData() {

                var index = 0;
                $.each(myData, function(i, album) {

                    var myAlbum = {
                        'name': album.title,
                        'size': 0,
                        'image': 'images/' + album.title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase() + '.jpg',
                        'id': i,
                        'positionInArray': index
                    };


                    var myAlbumSongsSun = {
                        'name': album.title,
                        'size': 0,
                        'id': i
                    };

                    var myAlbumSun = {
                        'name': album.title,
                        'children': [],
                        'id': i
                    };
                    var myAlbumRadial = {
                        'name': album.title,
                        'children': [],
                        'id': i,
                        'cover': false
                    };
                    index++;

                    $.each(album.tracks, function(j, track) {

                        if (jQuery.inArray(track.title, countCovers) === -1) {
                            isCover = false;
                            colorCover = '#FFF';
                        } else {
                            isCover = true;
                            colorCover = '#f7ff9b';
                        }

                        var myTrackSun = {};
                        var myTrackRadial = {};


                        if (track.covers.length > 0) {


                            myTrackSun.name = track.title;
                            myTrackSun.children = [];

                            myTrackRadial.name = track.title;
                            myTrackRadial.children = [];


                            var countArtists = [];

                            $.each(track.covers, function(k, cover) {

                                countArtists.push(cover.credits);
                                var duplicatedArtist = countArtists.indexOf(cover.credits) !== countArtists.lastIndexOf(cover.credits);

                                if (!duplicatedArtist) {
                                    myAlbum.size++;
                                    myTrackSun.children.push({
                                        'name': cover.credits,
                                        'size': 1,
                                        'cover': isCover,
                                        'color': colorCover
                                    });

                                    myTrackRadial.children.push({
                                        'name': cover.credits,
                                        'size': 1,
                                        'cover': isCover,
                                        'color': colorCover
                                    });

                                    myAlbumRadial.cover = isCover;
                                    myAlbumSongsSun.size++;

                                }
                            });

                            myAlbumSun.children.push(myTrackSun);
                            myAlbumRadial.children.push(myTrackRadial);
                        }

                    });

                    bowieSongsTree.children.push(myAlbum);
                    bowieSongsSun.children.push(myAlbumSun);
                    bowieSongsRadial.children.push(myAlbumRadial);

                });

                createTreemap(bowieSongsTree);

            }

            createData();

            // console.log("DATOS DATOS");
            // console.log(bowieSongsRadial);

            function createTreemap(treeData) {

                var treemap = d3.layout.treemap()
                    .size([widthTreemap, heightTreemap])
                    .sticky(true)
                    .mode('squarify')
                    .value(function(d) {
                        return d.size;
                    });

                div.datum(treeData).selectAll('.node')
                    .data(treemap.nodes)
                    .enter().append('div')
                    .attr('id', function(d) {
                        return d.positionInArray;
                    })
                    .attr('class', 'node row middle-xs')
                    .on('click', function(d) {

                        $('.section-radial').css('z-index', 20);
                        $('.section-radial').show();

                        createRadial(bowieSongsSun.children[d.positionInArray], '#covers-bowie', d.image);

                        $('#covers').empty();

                    })
                    .style('background-image', function(d) {
                        if (d.image) {
                            return 'url(' + d.image + ')';
                        }
                    })
                    .call(position)
                    .append('div')
                    .attr('class', 'col-xs-12 row middle-xs node-content')
                    .append('h4')
                    .text(function(d) {
                        return d.children ? null : d.size;
                    });

            }

            function position() {

                this.style('left', function(d) {
                        return d.x + 'px';
                    })
                    .style('top', function(d) {
                        return d.y + 'px';
                    })
                    .style('width', function(d) {
                        return Math.max(0, d.dx - 1) + 'px';
                    })
                    .style('height', function(d) {
                        return Math.max(0, d.dy - 1) + 'px';
                    });
            }


            function createRadial(data, container, image) {

                $(container).empty();

                $(container).css({ 'width': diameter });
                $(container).css({ 'height': diameter });


                $('<div class="record"></div>').appendTo(container);

                var
                    widthFactor = 1.67,
                    recordSize = widthRadial / widthFactor;


                $('.record').css('height', recordSize + 'px');
                $('.record').css('width', recordSize + 'px');
                $('.record').css('margin-top', -(recordSize / 2) + 'px');
                $('.record').css('margin-left', -(recordSize / 2) + 'px');
                $('.record')
                    .css({
                        'background-image': 'url(' + image + ')'
                    });

                var svg = d3.select(container)
                    .append('svg')
                    .attr('width', diameter)
                    .attr('height', diameter)
                    .append('g')
                    .attr('transform', 'translate(' + diameter / 2 + ',' + diameter / 2 + ')');

                var nodes = tree.nodes(data),
                    links = tree.links(nodes);

                svg.selectAll('.link')
                    .data(links)
                    .enter().append('path')
                    .attr('class', function(d) {
                        if (!d.source.id) {
                            return 'link';
                        } else {
                            return 'no-link';
                        }

                    })
                    .attr('stroke', function(d) {
                        if (d.cover) {
                            return d.target.color;
                        } else {
                            return d.target.color;
                        }
                    })
                    .attr('d', diagonal);

                var node = svg.selectAll('.node')
                    .data(nodes)
                    .enter().append('g')
                    .attr('class', 'node')
                    .attr('transform', function(d) {
                        return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')';
                    });

                node.append('circle')
                    .attr('r', 2)
                    .attr('fill', function(d) {
                        if (d.cover) {
                            return d.color;
                        } else {
                            return d.color;
                        }
                    });

                node.append('title')
                    .text(function(d) {
                        return d.name;
                    });

                var text = svg.selectAll('text').data(nodes)
                    .enter().append('g')
                    .attr('class', 'node')
                    .attr('transform', function(d) {
                        return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')';
                    })
                    .on('click', function(d) {
                        if (!d.children) {
                            window.open('http://youtube.com/results?search_query=' + d.name.replace(/ /g, '+') + '+' + d.parent.name.replace(/ /g, '+'), '_blank');
                        }
                    });

                text.append('text')
                    .attr('fill', function(d) {
                        if (d.cover) {
                            return d.color;
                        } else {
                            return d.color;
                        }
                    })
                    .attr('transform', function(d) {
                        if (d.children) {
                            return d.x < 180 ? 'translate(-8)' : 'rotate(180)translate(8)';
                        } else {
                            return d.x < 180 ? 'translate(8)' : 'rotate(180)translate(-8)';
                        }
                    })
                    .attr('text-anchor', function(d) {
                        if (d.children) {
                            return d.x < 180 ? 'end' : 'start';
                        } else {
                            return d.x < 180 ? 'start' : 'end';
                        }

                    })
                    .attr('dy', '.31em')
                    .each(function(d) {

                        if (d.children && d.parent) {

                            var text = d3.select(this),
                                words = d.name.replace(/ *\([^)]*\) */g, '').split(/\s+/).reverse(),
                                word,
                                line = [],
                                y = text.attr('y'),
                                dy = parseFloat(text.attr('dy')),
                                tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');

                            text.attr('class', 'record');
                            text.attr('fill', function(d) {
                                return d.children[0].color;
                            });

                            while (word = words.pop()) {
                                line.push(word);
                                tspan.text(line.join(' '));
                                if (tspan.node().getComputedTextLength() > 75) {
                                    line.pop();
                                    tspan.text(line.join(' '));
                                    line = [word];
                                    tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', 10 + 'px').text(word);
                                }
                            }

                        } else if (d.parent && !d.children) {

                            var textArtist = d3.select(this).text(d.name);
                            textArtist.attr('class', 'artist');

                        }

                    });


            }

        });

        $('.close-radial').on('click', function() {
            $('.section-radial').hide();
            return false;
        });