'use strict';

// Minimum number of views to display a cover video

var MIN_VIDEO_VIEWS = 500;
var MIN_COVERS_ALBUM = 8;
var DEFAULT_VIDEO_TEXT = "DEFAULT VIDEO TEXT";

var FORBIDDEN_VIDEOS = [
    "aCHg5r6rFoI", "CMThz7eQ6K0", "aySEzuNSN1k"
];

var bannedAlbums = ['bc02d917-a52e-3d77-ae5f-75aa3fb754ef'];

// Club Bowie: Rare and Unreleased 12″ Mixes

var widthTreemap = $(".section-treemap").width(),
    heightTreemap = $(".section-treemap").height();

var widthRadial = $('.radial-album').width(),
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


var color = d3.scale.category20c();

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) {
        return [d.y, d.x / 180 * Math.PI];
    });


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
    moveable: false,
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

d3.json('data/david_bowie_data.videos.sincometas.json', function(error, artist) {

    if (error) {
        return error;
    }

    var params = get_params();

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

        if (bannedAlbums.indexOf(i)) {
            $.each(album.tracks, function(j, track) {
                $.each(track.covers, function(k, cover) {
                    if (cover.credits === 'David Bowie') {
                        countCovers.push(track.title);
                    } else {
                        countOthers.push(track.title);
                    }
                });
            });
        };

    });

    d3.select('#allTracks').text(countCovers.length);
    // Parse JSON to fit treemap structure
    var myData = artist;

    var bowieSongsTree;
    var bowieSongsSun;
    var bowieSongsRadial;

    function createData(scope, treemapContainer, radialContainer) {

        $(treemapContainer).empty();

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

        $(treemapContainer).empty();

        var index = 0;

        $.each(myData, function(i, album) {

            if (bannedAlbums.indexOf(i)) {


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

                d3.select('#buttonsCovers').append('button').attr('data-filter', function() {
                    return '.' + i.substr(0, 4);
                }).text(function() {
                    return album.title;
                });

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
                        } else if (scope === "pinups") {
                            var condition = i === '8b7bd1c2-be07-3083-989a-714f219f1ff8';
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
                                        // d3.select('#rawList').append("div")
                                        //     .attr('class', function() {
                                        //         return 'grid-item ' + i.substr(0, 4);
                                        //     })
                                        //     .text(cover.credits + ' - ' + cover.title + ' - ' + album.title);


                                        if (scope != 'pinups') {
                                            coversByArtist.push({ 'key': cover.credits });
                                        }
                                    };

                                    myTrackSun.children.push({
                                        'name': cover.credits,
                                        'youtube': cover.youtube,
                                        'size': 0,
                                        'cover': isCover,
                                        'color': colorCover
                                    });

                                    countCoverTitles.push(cover.title);
                                    countArtistsCover.push(cover.credits);

                                    myAlbum.size++;

                                    myTrackRadial.children.push({
                                        'name': cover.credits,
                                        'youtube': cover.youtube,
                                        'size': 0,
                                        'cover': isCover,
                                        'color': colorCover
                                    });

                                    myAlbumRadial.cover = isCover;
                                    myAlbumSongsSun.size++;

                                }

                            }
                        });

                        if (myTrackSun.children.length > 0) {
                            trackCovers.push({
                                'id': i,
                                'name': myTrackSun.name,
                                'size': myTrackSun.children.length
                            });
                        };

                        if (scope != 'pinups') {
                            d3.select('#allOthers').text(function() {
                                return coversByArtist.length;
                            })
                        }

                        myAlbumSun.children.push(myTrackSun);
                        myAlbumRadial.children.push(myTrackRadial);

                    }

                });

                /*----------  Create the radialtree graph  ----------*/

                createRadial(myAlbumRadial, radialContainer, myAlbum.image, myAlbum.size);

                /*----------  Add items to the timeline  ----------*/

                if (myAlbum.size >= MIN_COVERS_ALBUM && scope != 'pinups') {

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
                        title: '<p class="timeline-tooltip-date">' + album.first_date + '</p><p class="timeline-tooltip-number">' + myAlbum.size + '</p><p class="timeline-tooltip-album">' + myAlbum.name + '</p>'
                    });

                }

                /*----------  Push data  ----------*/

                if (myAlbum.size >= MIN_COVERS_ALBUM) {
                    bowieSongsTree.children.push(myAlbum);
                    bowieSongsSun.children.push(myAlbumSun);
                    bowieSongsRadial.children.push(myAlbumRadial);
                };


            }
        });

        /*----------  Create isotope filter  ----------*/

        var $grid = $('.grid').isotope({
            // options
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });

        // filter items on button click
        $('.filter-button-group').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
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

        createTreemap(bowieSongsTree, treemapContainer);

        // Album with more covers

        if (scope != 'pinups') {

            // Discography
            var bowieDiscography = d3.select('#bowie-discography');
            bowieDiscography.append("p").attr("class", "counter-number").text(function() {
                return bowieSongsTree.children.length;
            })
            bowieDiscography.append("h5").attr("class", "counter-units").text(function() {
                return 'Albums analyzed with more than ' + MIN_COVERS_ALBUM + ' covers resulting ' + coversByArtist.length + ' artist covering';
            })
            bowieDiscography.append("h5").attr("class", "counter-link")
                .append('a')
                .attr('href', function() {
                    return treemapContainer;
                })
                .text(function() {
                    return 'Go to albums';
                })
            // Album with more covers
            var bowieMoreAlbum = d3.select('#bowie-album');
            bowieMoreAlbum.append("p").attr("class", "counter-number").text(function() {
                return bowieSongsTree.children[0].size;
            })
            bowieMoreAlbum.append("h5").attr("class", "counter-units").text(function() {
                return 'Covers in the album';
            })
            bowieMoreAlbum.append("p").attr("class", "counter-entity").text(function() {
                return bowieSongsTree.children[0].name;
            })
            bowieMoreAlbum.append("h5").attr("class", "counter-link")
                .append('a')
                .attr('href', function() {
                    return '#' + bowieSongsTree.children[0].id
                })
                .text(function() {
                    return 'Go to album';
                })

            // Song with more covers
            var bowieMoreTrack = d3.select('#bowie-track');
            bowieMoreTrack.append("p").attr("class", "counter-number").text(function() {
                return trackCovers[0].size;
            })
            bowieMoreTrack.append("h5").attr("class", "counter-units").text(function() {
                return 'Covers of the song';
            })
            bowieMoreTrack.append("p").attr("class", "counter-entity").text(function() {
                return trackCovers[0].name;
            })

            bowieMoreTrack.append("h5").attr("class", "counter-link")
                .append('a')
                .attr('href', function() {
                    return '#' + trackCovers[0].id
                })
                .text(function() {
                    return 'Go to album';
                })
        };


    }

    createData('bowie', '#covers-treemap', '#coversRadial');
    createData('pinups', '#covers-pinups', '#coversRadialPinups');

    // $(window).resize(function() {
    //     createData('bowie', '#covers-treemap', '#coversRadial');
    //     createData('pinups', '#covers-pinups', '#coversRadialPinups');
    // });

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);

    timeline.on('click', function(properties) {

        var anchorLink = '#' + properties.item
        $(document).scrollTop($(anchorLink).offset().top);

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

    function createTreemap(treeData, container) {

        var treemap = d3.layout.treemap()
            .size([100, 100])
            // .sticky(true)
            // .round(true)
            // .mode('squarify')
            .value(function(d) {
                if (d.size >= MIN_COVERS_ALBUM) {
                    return d.size;
                }
            });

        var treemapContainer = d3.select(container);
        treemapContainer.datum(treeData);

        var treemapJoin = treemapContainer.selectAll('.node')
            .data(treemap.nodes)

        treemapJoin.attr('class', 'update');

        treemapJoin.enter().append('a')
            .attr('id', function(d) {
                return d.positionInArray;
            })
            .attr('href', function(d) {
                if (d.id) {
                    return '#' + d.id;
                }
            })
            .attr('class', 'node row middle-xs')
            .style('background-image', function(d) {
                if (d.image) {
                    return 'url(' + d.image + ')';
                }
            })
            .call(position);

        treemapJoin.append('div')
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

        treemapJoin.exit().remove();

    }

    function position() {

        this.style('left', function(d) {
                return d.x + '%';
            })
            .style('top', function(d) {
                return d.y + '%';
            })
            .style('width', function(d) {
                return Math.max(0, d.dx) + '%';
            })
            .style('height', function(d) {
                return Math.max(0, d.dy) + '%';
            });
    }


    function createRadial(data, container, image, size) {


        var tree = d3.layout.tree()
            .size([360, diameter / 2 - radialOffset])
            .separation(function(a, b) {
                return (a.parent === b.parent ? 1 : 2) / a.depth;
            });

        if (size <= MIN_COVERS_ALBUM) {
            return false;
        }


        var radialItem = d3.select(container).append('div')
            .attr('id', data.id)
            .attr('class', 'radial-item row')

        // radialItem.remove();

        // var counterSide = radialItem.append('div')
        //     .attr('class', 'radial-counter content');

        var albumTitle = radialItem.append('div').attr('class', 'col-xs-12 radial-album-title');

        albumTitle.append('nav').attr('class', 'level')
            .append('div').attr('class', 'counter')
            .append('div').attr('class', 'content')
            .html(function() {
                return '<p class="counter-number"><strong>' + data.name + '</strong> | ' + size + ' <span class="counter-units">Covers</span></p>';
            });

        var box = radialItem.append('div')
            .attr('id', data.id + '-album')
            .attr('class', 'radial-album');

        var aside = radialItem.append('div')
            .attr('class', 'radial-aside content');

        box.append('div').attr('class', 'record');

        var coverTitle = aside.append('p').attr('class', 'cover-title').text('Song title');
        var coverArtist = aside.append('p').attr('class', 'cover-artist').text('Cover artist');

        var youtubeContainer = aside.append('div').attr('class', 'video').style('height', function() {
            return $(this).width() - ($(this).width() / 3) + 'px';
        });

        // OSCAR


        console.log("LOOKING FOR THE MOST VIEWED VIDEO");

        //        console.log(data);

        var candidate = { 'name': undefined, 'id': undefined, 'count': 0 };

        data.children.forEach(function(d, i) {
            console.log("SONG", d.name, i);
            if (('children' in d) && (d.children.length > 0)) {
                var children = d.children;
                children.forEach(function(version, j) {
                    if ('youtube' in version && FORBIDDEN_VIDEOS.indexOf(version.youtube.id) == -1) {
                        console.log("VERSION", version.name, version.youtube.id, version.youtube.views, candidate);
                        if (parseInt(version.youtube.views, 10) > candidate.count) {
                            candidate = { name: version.name, id: version.youtube.id, count: parseInt(version.youtube.views, 10) };
                        }
                    }
                })
            }

        });

        console.log("CANDIDATE!", candidate);

        youtubeContainer.append('iframe')
            .attr('id', 'video')
            .attr('src', 'https://www.youtube.com/embed/' + candidate.id)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('allowfullscreen', 'allowfullscreen')
            .attr('mozallowfullscreen', 'mozallowfullscreen')
            .attr('msallowfullscreen', 'msallowfullscreen')
            .attr('oallowfullscreen', 'oallowfullscreen')
            .attr('webkitallowfullscreen', 'webkitallowfullscreen');

        var youtubeContainerSubText = aside.append('div').attr('class', 'video_subtext').html(DEFAULT_VIDEO_TEXT);

        // OSCAR

        var backLink = aside.append('a').attr('href', '#covers-treemap').text('Back to albums').on('click', function() {
            $('.video').empty();
            navigateSooth();
        });

        var
            widthFactor = 10,
            recordSize = widthRadial / widthFactor;

        // $('.record').css('height', recordSize + '%');
        // $('.record').css('width', recordSize + '%');
        // $('.record').css('margin-top', -(recordSize / 2) + '%');
        // $('.record').css('margin-left', -(recordSize / 2) + '%');

        $('#' + data.id + ' .record')
            .css({
                'background-image': 'url(' + image + ')'
            });

        var nodes = tree.nodes(data),
            links = tree.links(nodes);

        var radialTreeContainer = box.append('svg')
            .attr("viewBox", "0 0 " + widthRadial + " " + widthRadial)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .append('g')
            .attr('transform', 'translate(' + widthRadial / 2 + ',' + diameter / 2 + ')');


        // DATA JOIN
        // Join new data with old elements, if any.
        var radialTreeJoin = radialTreeContainer.selectAll('.link').data(links);
        var nodeJoin = radialTreeContainer.selectAll('.node').data(nodes)
        var textJoin = radialTreeContainer.selectAll('text').data(nodes)

        // UPDATE
        // Update old elements as needed.
        radialTreeJoin.attr("class", "update");
        nodeJoin.attr("class", "update");
        textJoin.attr("class", "update");

        // ENTER
        // Create new elements as needed.
        //
        // ENTER + UPDATE
        // After merging the entered elements with the update selection,
        // apply operations to both.

        radialTreeJoin.enter().append('path')
            .attr('class', function(d) {
                if (!d.source.id) {
                    return 'link';
                } else {
                    return 'link';
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

        nodeJoin.enter().append('g')
            .attr('class', 'node')
            .attr('transform', function(d) {
                return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')';
            });

        nodeJoin.append('title')
            .text(function(d) {
                return d.name;
            });

        textJoin.enter().append('g')
            .attr('class', 'node')
            .attr('class', function(d) {

                if (d.youtube) {

                    if ((parseInt(d.youtube.views, 10) > MIN_VIDEO_VIEWS) && (FORBIDDEN_VIDEOS.indexOf(d.youtube.id)==-1)) {
                        return 'node'
                    } else {
                        return 'node inactive'
                    }
                }
            })
            .attr('transform', function(d) {
                return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')';
            })
            .on('click', function(d) {
                console.log("DATOS DE COVER:", d);

                coverTitle.text(function() {
                    return d.parent.name;
                })
                coverArtist.text(function() {
                    return d.name;
                })



                if (parseInt(d.youtube.views, 10) > MIN_VIDEO_VIEWS) {
                    $('.video').empty();
                    youtubeContainer.append('iframe')
                        .attr('id', 'video')
                        .attr('src', 'https://www.youtube.com/embed/' + d.youtube.id)
                        .attr('width', '100%')
                        .attr('height', '100%')
                        .attr('allowfullscreen', 'allowfullscreen')
                        .attr('mozallowfullscreen', 'mozallowfullscreen')
                        .attr('msallowfullscreen', 'msallowfullscreen')
                        .attr('oallowfullscreen', 'oallowfullscreen')
                        .attr('webkitallowfullscreen', 'webkitallowfullscreen');

                }
            });

        textJoin.append('text')
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

        // EXIT
        // Remove old elements as needed.
        radialTreeJoin.exit().remove();
        nodeJoin.exit().remove();
        textJoin.exit().remove();

    }

    var indexControl;

    // OSCAR 'land' en el video

    console.log("LANDING", myData, params, location.hash);

    if ('id' in params) {

        var hash = location.hash;

        var youtubeContainer = d3.select("#coversRadial").select(hash).select(".video");

        $(youtubeContainer.node()).empty();

        youtubeContainer.append('iframe')
            .attr('id', 'video')
            .attr('src', 'https://www.youtube.com/embed/' + params['id'])
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('allowfullscreen', 'allowfullscreen')
            .attr('mozallowfullscreen', 'mozallowfullscreen')
            .attr('msallowfullscreen', 'msallowfullscreen')
            .attr('oallowfullscreen', 'oallowfullscreen')
            .attr('webkitallowfullscreen', 'webkitallowfullscreen');
    }


});

$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {

        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

function navigateSooth() {
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {

            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

}
$('document').ready(function() {

    // Select all links with hashes

    // id in params?


});






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


(function($) {
    $.deparam = function(params, coerce) {
        var obj = {},
            coerce_types = { 'true': !0, 'false': !1, 'null': null };

        // Iterate over all name=value pairs.
        $.each(params.replace(/\+/g, ' ').split('&'), function(j, v) {
            var param = v.split('='),
                key = decodeURIComponent(param[0]),
                val,
                cur = obj,
                i = 0,

                // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
                // into its component parts.
                keys = key.split(']['),
                keys_last = keys.length - 1;

            // If the first keys part contains [ and the last ends with ], then []
            // are correctly balanced.
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
                // Remove the trailing ] from the last keys part.
                keys[keys_last] = keys[keys_last].replace(/\]$/, '');

                // Split first keys part into two parts on the [ and add them back onto
                // the beginning of the keys array.
                keys = keys.shift().split('[').concat(keys);

                keys_last = keys.length - 1;
            } else {
                // Basic 'foo' style key.
                keys_last = 0;
            }

            // Are we dealing with a name=value pair, or just a name?
            if (param.length === 2) {
                val = decodeURIComponent(param[1]);

                // Coerce values.
                if (coerce) {
                    val = val && !isNaN(val) ? +val // number
                        :
                        val === 'undefined' ? undefined // undefined
                        :
                        coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
                        :
                        val; // string
                }

                if (keys_last) {
                    // Complex key, build deep object structure based on a few rules:
                    // * The 'cur' pointer starts at the object top-level.
                    // * [] = array push (n is set to array length), [n] = array if n is
                    //   numeric, otherwise object.
                    // * If at the last keys part, set the value.
                    // * For each keys part, if the current level is undefined create an
                    //   object or array based on the type of the next keys part.
                    // * Move the 'cur' pointer to the next level.
                    // * Rinse & repeat.
                    for (; i <= keys_last; i++) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last ?
                            cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) :
                            val;
                    }

                } else {
                    // Simple key, even simpler rules, since only scalars and shallow
                    // arrays are allowed.

                    if ($.isArray(obj[key])) {
                        // val is already an array, so push on the next value.
                        obj[key].push(val);

                    } else if (obj[key] !== undefined) {
                        // val isn't an array, but since a second value has been specified,
                        // convert val into an array.
                        obj[key] = [obj[key], val];

                    } else {
                        // val is a scalar.
                        obj[key] = val;
                    }
                }

            } else if (key) {
                // No value was defined, so set something meaningful.
                obj[key] = coerce ?
                    undefined :
                    '';
            }
        });

        return obj;
    };
})(jQuery);

function get_params() {
    return $.deparam(location.search.substring(1));
}

function set_params(params) {

    window.history.replaceState({}, document.title, window.location.origin + window.location.pathname + "?" + $.param(params));

}