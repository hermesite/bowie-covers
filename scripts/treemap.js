'use strict';

var
    widthTreemap = $(".section-treemap").width(),
    heightTreemap = $(".section-treemap").height(),
    widthRadial = $('.radial-album').width(),
    diameter = widthRadial,
    radialOffset = diameter / 5;

var margin = { top: 40, right: 0, bottom: 25, left: 0 },
    width = $('.bar-chart').width() - margin.left - margin.right,
    height = $('.bar-chart').height() - margin.top - margin.bottom;

var x = d3.time.scale()
    .rangeRound([0, width])
    .domain([new Date(1960, 0, 1), new Date(2020, 0, 1)]);

var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, 123]);
// .ticks(0);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select("#coversBar")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);


// var width = 200,
//     height = 200,
var radius = 100;


// var x = d3.scale.linear()
//     .range([0, 2 * Math.PI]);

// var y = d3.scale.linear()
//     .range([0, radius]);


var color = d3.scale.category20c();

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


// DOM element where the Timeline will be attached
var container = document.getElementById('timeline');

// Create a DataSet (allows two way data-binding)
var items = new vis.DataSet();

var bowiePeriods = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

items.add({ id: 'A', content: 'Early career to debut album', start: '1962-01-1', end: '1967-12-31', type: 'background', size: 3 })
items.add({ id: 'B', content: 'Space Oddity to Hunky Dory', start: '1968-01-1', end: '1972-04-1', type: 'background', className: 'negative', size: 187 })
items.add({ id: 'C', content: 'Ziggy Stardust', start: '1972-04-2', end: '1973-12-31', type: 'background', size: 157 })
items.add({ id: 'D', content: '"Plastic soul" and the Thin White Duke', start: '1974-01-1', end: '1976-10-1', type: 'background', className: 'negative', size: 75 })
items.add({ id: 'E', content: 'Berlin era', start: '1976-10-2', end: '1979-12-31', type: 'background', size: 118 })
items.add({ id: 'F', content: 'New Romantic and pop era', start: '1980-01-1', end: '1988-12-31', type: 'background', className: 'negative', size: 187 })
items.add({ id: 'G', content: 'Tin Machine', start: '1989-01-1', end: '1991-12-31', type: 'background', size: 0 })
items.add({ id: 'H', content: 'Electronic period', start: '1992-01-1', end: '1998-12-31', type: 'background', className: 'negative', size: 19 })
items.add({ id: 'I', content: 'Neoclassicist Bowie', start: '1999-01-1', end: '2012-06-31', type: 'background', size: 110 })
items.add({ id: 'J', content: 'Final years', start: '2012-07-1', end: '2016-12-31', type: 'background', className: 'negative', size: 2 })

function customOrder(a, b) {
    // order by id
    // console.log(a.size);
    return a.size - b.size;
}


// Configuration for the Timeline
var options = {
    zoomable: false,
    // moveable: false,
    // align: 'left',
    order: customOrder,
    start: '1960',
    end: '2020',
    margin: { axis: 20 },
    orientation: { axis: 'bottom', item: 'bottom' }
};

var colorScale = d3.scale.quantize()
    .range(colorbrewer.Greys[9])
    .domain([0, 123]);




var trackCovers = [];

d3.json('data/david_bowie_data.json', function(error, artist) {

    if (error) {
        return error;
    }

    var isCover;
    var colorCover;
    var countCovers = [];
    var countOthers = [];

    var coversByArtist = [];

    var countCoverTitles = [];
    var countArtistsCover = ["David Bowie"];

    var countRepeated = [];

    var trackCoversCount = [];
    var albumCount = [];


    $.each(artist, function(i, album) {
        $.each(album.tracks, function(j, track) {
            $.each(track.covers, function(k, cover) {
                if (cover.credits === 'David Bowie') {
                    countCovers.push(track.title);
                } else {
                    countOthers.push(track.title);
                }
            });
        });
    });

    d3.select('#allTracks').text(countCovers.length);
    // Parse JSON to fit treemap structure
    var myData = artist;

    var bowieSongsTree;
    var bowieSongsSun;
    var bowieSongsRadial;

    function createData(scope) {

        bowieSongsTree = {
            'name': 'Bowie',
            'children': []
        };

        bowieSongsSun = {
            'name': 'Bowie',
            'children': []
        };

        bowieSongsRadial = {
            'name': 'Bowie',
            'children': []
        };

        $('#covers-treemap').empty();

        var index = 0;

        $.each(myData, function(i, album) {

            var myAlbum = {
                'name': album.title,
                'size': 0,
                'image': 'images/' + album.title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase() + '.jpg',
                'id': i,
                'positionInArray': index,
                'year': album.first_date
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

            var checkTitle;
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

                    if (jQuery.inArray(track.title, countCovers) === -1 && jQuery.inArray(track.title.substr(0, 8), countRepeated) === -1) {

                        // console.log(track);

                        trackCoversCount.push({
                            id: track.recording_id,
                            title: track.title,
                            covers: track.covers.length
                        });
                    }

                    countRepeated.push(track.title.substr(0, 8));

                    // checkTitle = track.title.substr(0,6);

                    myTrackSun.children = [];
                    myTrackRadial.children = [];

                    var countArtists = [];

                    if (scope === "others") {
                        var condition = jQuery.inArray(track.title, countCovers) != -1;
                    } else if (scope === "bowie") {
                        var condition = jQuery.inArray(track.title, countCovers) === -1;
                    } else {
                        var condition = true;
                    }

                    if (condition) {
                        myTrackSun.name = track.title;
                        myTrackRadial.name = track.title;
                    }

                    $.each(track.covers, function(k, cover) {

                        countArtists.push(cover.credits);
                        var duplicatedArtist = countArtists.indexOf(cover.credits) !== countArtists.lastIndexOf(cover.credits);


                        if (!duplicatedArtist) {

                            if (condition) {


                                if (jQuery.inArray(cover.credits, countArtistsCover) === -1 || jQuery.inArray(cover.title, countCoverTitles) === -1) {
                                    d3.select('#rawList').append("li").text(cover.credits + ' - ' + cover.title);
                                    coversByArtist.push({ 'key': cover.credits });
                                };

                                myTrackSun.children.push({
                                    'name': cover.credits,
                                    'size': 0,
                                    'cover': isCover,
                                    'color': colorCover
                                });


                                countCoverTitles.push(cover.title);
                                countArtistsCover.push(cover.credits);

                                myAlbum.size++;


                                myTrackRadial.children.push({
                                    'name': cover.credits,
                                    'size': 0,
                                    'cover': isCover,
                                    'color': colorCover
                                });

                                myAlbumRadial.cover = isCover;
                                myAlbumSongsSun.size++;

                            }

                        }
                    });



                    // console.log(myTrackSun);
                    

                        if (myTrackSun.children.length > 0) {
                            trackCovers.push({
                                'name' : myTrackSun.name,
                                'size' : myTrackSun.children.length
                            });
                        };
                    


                    d3.select('#allOthers').text(function() {
                        return coversByArtist.length;
                    })

                    

                    myAlbumSun.children.push(myTrackSun);
                    myAlbumRadial.children.push(myTrackRadial);

                    // createSunburst(myTrackSun, "#sunburst-bowie");
                    // createTile(myTrackSun, "#sunburst-bowie", album, i);
                }


            });



            /*----------  Create the radialtree graph  ----------*/

            createRadial(myAlbumRadial, '.radial-container', myAlbum.image, myAlbum.size);

            if (myAlbum.size >= 4) {

                items.add({
                    'id': i,
                    'size': 0,
                    'content': '<img class="album-thumbnail" src="images/' + album.title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase() + '.jpg">',
                    'start': album.first_date,
                    'type': 'box'
                });

                items.update({
                    id: i,
                    size: myAlbum.size,
                    style: 'background-color:' + colorScale(myAlbum.size) + ';',
                    className: myAlbum.size,
                    title: '<strong>' + myAlbum.size + ' COVERS</strong> | <em>' + myAlbum.name + '</em> (' + album.first_date + ')'
                });

            }


            // myAlbum.year = parseDate(myAlbum.year);
            // myAlbum.close = +myAlbum.close;


            bowieSongsTree.children.push(myAlbum);
            bowieSongsSun.children.push(myAlbumSun);
            bowieSongsRadial.children.push(myAlbumRadial);

            // chart.append("g")
            //         .attr("transform", function(d, i) {
            //             return "translate(" + x(new Date(myAlbum.year.substr(0,4), 0, 1)) + ",0)";
            //         });

            var barWidth = 1;


            if (myAlbum.size > 0)  {
                chart.append("rect")
                    .attr("x", function() {
                        return x(new Date(myAlbum.year.substr(0, 4), 0, 1));
                    })
                    .attr("y", function() {
                        return y(myAlbum.size);
                    })
                    .attr("height", function() {
                        return height - y(myAlbum.size);
                    })
                    .attr("width", barWidth)
                    .attr("fill", "rgba(255,255,255,.25)");

                chart.append("text")
                    .attr('data-anchor', function() {
                        return myAlbum.id;
                    })
                    .attr("class", "bar-chart-label link")
                    .attr("x", function() {
                        return x(new Date(myAlbum.year.substr(0, 4), 0, 1))
                    })
                    .attr("y", function() {
                        return y(myAlbum.size) - 15;
                    })
                    .attr("dy", ".75em")
                    .attr("text-anchor", "middle")
                    // .text(function() { return myAlbum.name + ' (' + myAlbum.size + ')'; });
                    .text(function() { return myAlbum.name; })
                    .on('click', function() {
                        scrollTo($(this).attr('data-anchor'));
                    })
            }


        });

        function scrollTo(hash) {
            location.hash = "#" + hash;
        }
        // myAlbum.forEach(function(d) {
        //     d.date = parseDate(d.year);
        //     d.value = +d.value;
        // });

        trackCovers.sort(function(b, a) {
            if (a.size > b.size) {
                return 1;
            }
            if (a.size < b.size) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        trackCoversCount.sort(function(b, a) {
            if (a.covers > b.covers) {
                return 1;
            }
            if (a.covers < b.covers) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        // console.log(trackCoversCount);

        createTreemap(bowieSongsTree);

        // Album with more covers
        d3.select('#allAlbums').text(function() {
            return bowieSongsTree.children.length;;
        })

        // Album with more covers
        var bowieMoreAlbum = d3.select('#bowie-album');
        bowieMoreAlbum.append("p").attr("class", "heading").text(function() {
            return bowieSongsTree.children[0].name;
        })
        bowieMoreAlbum.append("p").attr("class", "title").text(function() {
            return bowieSongsTree.children[0].size;
        })

        // Song with more covers
        var bowieMoreTrack = d3.select('#bowie-track');
        bowieMoreTrack.append("p").attr("class", "heading").text(function() {
            return trackCovers[0].name;
        })
        bowieMoreTrack.append("p").attr("class", "title").text(function() {
            return trackCovers[0].size;
        })

        // d3.select('#bowie-covers').append("p").attr("class", "title").text(function() {
        //     return bowieSongsTree.value;
        // })


        // bar.append("rect")
        //     .attr("y", function(d) {
        //         console.log(d.size);
        //         return y(d.size);
        //     })
        //     .attr("height", function(d) { 
        //         console.log(y(d.size));
        //         return height - y(d.size); 
        //     })
        //     .attr("width", barWidth - 1);

        // bar.append("text")
        //     .attr("x", function(d) {
        //         // console.log(d.year.substr(0,4));
        //         return x(new Date(d.year.substr(0,4), 0, 1))
        //     })
        //     .attr("y", function(d) {
        //         return console.log(y(d.size));
        //         return y(d.size);
        //     })
        //     .attr("dy", ".75em")
        //     .text(function(d) { return d.size + ' - ' + d.name; });

        // function type(d) {
        //     d.size = +d.size; // coerce to number
        //     return d;
        // }

    }

    $('#all').on('click', function() {
        $('.button').removeClass("is-active");
        $(this).addClass("is-active");
        createData();
    });
    $('#others').on('click', function() {
        $('.button').removeClass("is-active");
        $(this).addClass("is-active");
        createData("others");
    });
    $('#bowie').on('click', function() {
        $('.button').removeClass("is-active");
        $(this).addClass("is-active");
        createData("bowie");
    })

    createData("bowie");

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);

    timeline.on('click', function(properties) {

        var anchorLink = '#' + properties.item
        // scrollTo($(this).attr('data-anchor'));
        $(document).scrollTop($(anchorLink).offset().top);

        // logEvent('click', properties);
        // console.log(properties.item);
        // scrollTo(properties.item);
        // var anchorLink = '#' + properties.item
        // scrollTo($(this).attr('data-anchor'));
        // $(document).scrollTop(properties.item);
    });

    d3.select('.buttons').append('span').attr('class', 'button is-small is-danger').text('All').on('click', function() {
        timeline.setOptions({ start: '1960', end: '2020' });
        $('.buttons .button').removeClass('is-danger');
        $(this).addClass('is-danger');
    })

    for (var i = 0; i < bowiePeriods.length; i++) {

        d3.select('.buttons').append('span')
            .attr('class', 'button is-small')
            .attr('data-start', function() {
                return items._data[bowiePeriods[i]].start;
            })
            .attr('data-end', function() {
                return items._data[bowiePeriods[i]].end;
            })
            .html(function() {
                return items._data[bowiePeriods[i]].content + ' - ' + items._data[bowiePeriods[i]].size;
            }).on('click', function() {
                $('.buttons .button').removeClass('is-danger');
                $(this).addClass('is-danger');
                timeline.setOptions({ start: $(this).attr('data-start'), end: $(this).attr('data-end') });
            })
    };


    function countPeriodCovers(period) {}

    function createTreemap(treeData) {

        var treemap = d3.layout.treemap()
            .size([widthTreemap, heightTreemap])
            .sticky(false)
            .round(true)
            .mode('squarify')
            .value(function(d) {
                if (d.size > 10) {
                    return d.size;
                }
            });

        div.datum(treeData).selectAll('.node')
            .data(treemap.nodes)
            .enter().append('div')
            .attr('id', function(d) {
                return d.positionInArray;
            })
            .attr('data-anchor', function(d) {
                // console.log(d.id);
                // var albumId = d.id;
                if (d.id) {
                    return d.id;
                }
            })
            .attr('class', 'node row middle-xs')

            .on('click', function() {

                var anchorLink = '#' + $(this).attr('data-anchor')
                // scrollTo($(this).attr('data-anchor'));
                $(document).scrollTop($(anchorLink).offset().top);

                // createRadial(bowieSongsSun.children[d.positionInArray], '#covers-bowie', d.image, d.size);

                // $('#covers').empty();

            })
            .style('background-image', function(d) {
                if (d.image) {
                    return 'url(' + d.image + ')';
                }
            })
            .call(position)
            .append('div')
            .attr('class', function(d) {
                var textSize = Math.round(d.area / 1000);
                return 'col-xs row middle-xs node-content area-' + textSize;
                // return 'col-xs row middle-xs node-content tooltip';
            })
            .attr('title', function(d) {
                return d.name;
            })
            .html(function(d) {
                return d.children ? null : '<p class="col-xs text-center"><strong>' + d.size + '</strong><em>COVERS</em><span>' + d.name + '</span></p>';
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


    function createRadial(data, container, image, size) {

        if (size <= 1) {
            return false;
        }

        var radialItem = d3.select(container).append('div')
            .attr('id', data.id)
            .attr('class', 'radial-item row')

        var box = radialItem.append('div')
            .attr('id', data.id.substr(0, 5))
            .attr('class', 'radial-album');

        var aside = radialItem.append('div')
            .attr('class', 'radial-aside');



        // $(container).empty();

        // $(box).css({ 'width': diameter });
        // $(box).css({ 'height': diameter });

        box.append('div').attr('class', 'record');

        aside.append('div').attr('class', 'record-info').html(function() {
            return '<h2><span><strong>' + size + '</strong>covers</span><em>' + data.name + '</em></h2>';
        });

        var youtubeContainer = aside.append('div').attr('class', 'video');

        youtubeContainer.append('iframe')
            .attr('src', 'https://www.youtube.com/embed/pMIOqxC7j68')
            .attr('width', '100%')
            .attr('height', '200px')
            .attr('allowfullscreen', 'allowfullscreen')
            .attr('mozallowfullscreen', 'mozallowfullscreen')
            .attr('msallowfullscreen', 'msallowfullscreen')
            .attr('oallowfullscreen', 'oallowfullscreen')
            .attr('webkitallowfullscreen', 'webkitallowfullscreen')


        var
            widthFactor = 1.67,
            recordSize = widthRadial / widthFactor;


        $('.record').css('height', recordSize + 'px');
        $('.record').css('width', recordSize + 'px');
        $('.record').css('margin-top', -(recordSize / 2) + 'px');
        $('.record').css('margin-left', -(recordSize / 2) + 'px');

        $('#' + data.id.substr(0, 5) + ' .record')
            .css({
                'background-image': 'url(' + image + ')'
            });

        var svg = box.append('svg')
            .attr('width', widthRadial)
            .attr('height', diameter)
            .append('g')
            .attr('transform', 'translate(' + widthRadial / 2 + ',' + diameter / 2 + ')');

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

        // oscar

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

    var indexControl;

    function createTile(data, container, album, index) {


        var tile = d3.select(container).append("div")
            .attr("class", "box")

        if (index != indexControl) {

            tile.append("h4")
                .text(function() {
                    return album.title;
                })

            indexControl = index;
        }


        tile.append("p").text(function() {
            return data.name;
        })
    }

    function createSunburst(data, container) {

        var svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

        var partition = d3.layout.partition()
            .value(function(d) {
                return d.size;
            });

        var arc = d3.svg.arc()
            .startAngle(function(d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
            })
            .endAngle(function(d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
            })
            .innerRadius(function(d) {
                return Math.max(0, y(d.y));
            })
            .outerRadius(function(d) {
                return Math.max(0, y(d.y + d.dy));
            });

        var g = svg.selectAll("g")
            .data(partition.nodes(data))
            .enter().append("g");

        var path = g.append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                return color((d.children ? d : d.parent).name);
            })
            .on("click", click);

        var text = g.append("text")
            .attr("transform", function(d) {
                return "rotate(" + computeTextRotation(d) + ")";
            })
            .attr("x", function(d) {
                return y(d.y);
            })
            .attr("dx", "6") // margin
            .attr("dy", ".35em") // vertical-align
            .text(function(d) {
                return d.name;
            });

        function click(d) {
            // fade out all text elements
            text.transition().attr("opacity", 0);

            path.transition()
                .duration(750)
                .attrTween("d", arcTween(d))
                .each("end", function(e, i) {
                    // check if the animated element's data e lies within the visible angle span given in d
                    if (e.x >= d.x && e.x < (d.x + d.dx)) {
                        // get a selection of the associated text element
                        var arcText = d3.select(this.parentNode).select("text");
                        // fade in the text element and recalculate positions
                        arcText.transition().duration(750)
                            .attr("opacity", 1)
                            .attr("transform", function() {
                                return "rotate(" + computeTextRotation(e) + ")"
                            })
                            .attr("x", function(d) {
                                return y(d.y);
                            });
                    }
                });
        }

        d3.select(self.frameElement).style("height", height + "px");

        // Interpolate the scales!
        function arcTween(d) {
            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, 1]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function(d, i) {
                return i ? function(t) {
                    return arc(d);
                } : function(t) {
                    x.domain(xd(t));
                    y.domain(yd(t)).range(yr(t));
                    return arc(d);
                };
            };
        }

        function computeTextRotation(d) {

            return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
        }
    }


});

$('document').ready(function() {

    var desc = false;
    document.getElementById("test").onclick = function() {
        sortUnorderedList("rawList", desc);
        desc = !desc;
        return false;
    }

    $('.tooltip').tooltipster({
        theme: 'tooltipster-noir'
    });
})


function sortUnorderedList(ul, sortDescending) {
    if (typeof ul == "string")
        ul = document.getElementById(ul);

    var lis = ul.getElementsByTagName("LI");
    var vals = [];

    for (var i = 0, l = lis.length; i < l; i++)
        vals.push(lis[i].innerHTML);

    vals.sort();

    if (sortDescending)
        vals.reverse();

    for (var i = 0, l = lis.length; i < l; i++)
        lis[i].innerHTML = vals[i];
}