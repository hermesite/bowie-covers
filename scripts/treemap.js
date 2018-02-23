'use strict';

// Minimum number of views to display a cover video

var MIN_VIDEO_VIEWS = 500;
var MIN_COVERS_ALBUM = 4;
var DEFAULT_VIDEO_TEXT = "DEFAULT VIDEO TEXT";
// var BASE_URL = "http://127.0.0.1/bowie-covers/";
// Hermes base URL
var BASE_URL = "http://localhost:3000/";


var LIST_OUTSIDER = [{
        "covers": 52,
        "name": "Love You Till Tuesday",
        "link": "#96c14aa4-c378-33d5-99f9-3cade6f1ecb3",
        "youtube": "https://www.youtube.com/embed/YWjTbB4ONeM",
        "text": "La versión del coro de niños",
        "artist": "The Langley Schools Music Project",
        "song": "Space Oddity",
        "description": "Por ejemplo el caso de las grabaciones de <span class='artist-name'>The Langley Schools Music Project</span> que consisten en coros de niños que en la década de los 70 versionearon los hits de la música pop, entre ellos <em>Space Oddity</em>."
    },
    {
        "covers": 14,
        "name": "Station To Station",
        "link": "#686cdbd1-b400-32d8-8cb8-9317a2e41a58",
        "youtube": "https://www.youtube.com/embed/BXssFNHkq-A",
        "text": "La versión del coro de abuelos",
        "artist": "Young@Heart",
        "song": "Golden Years",
        "description": "O el proyecto <span class='artist-name'>young@heart</span> un grupo de entretenimiento y creación musical que tiene como requisito ser mayor de 70 años de edad para poder entrar y que versionean temas de Bowie."
    },
    {
        "covers": 54,
        "name": "Let's Dance",
        "link": "#75c2bddf-1799-3eda-b6b3-a0cf5189d8ed",
        "youtube": "https://www.youtube.com/embed/XaIx_FBk4-Q",
        "text": "La historia del riff de Let's Dance",
        "artist": "Nile Rodgers",
        "song": "Let's Dance",
        "description": "No es exactamente una versión, el guitarrista de <span class='artist-name'>Chic</span>, <span class='artist-name'>Nile Rodgers</span> cuenta la historia del riff de <em>Let's Dance</em>."
    },
    {
        "covers": 50,
        "name": "Heroes",
        "link": "#1f5ef8d3-10ca-30eb-b41e-85b16987d412",
        "youtube": "https://www.youtube.com/embed/2JywkrIiXW8",
        "text": "El riff de Heroes",
        "artist": "King Crimson",
        "song": "Heroes",
        "description": "<span class='artist-name'>Robert Fripp</span> versionenanado <em>Heroes</em> con <span class='artist-name'>King Crimson</span> rememorando él riff que el mismo creó."
    },
    {
        "covers": 61,
        "name": "David Bowie",
        "link": "#2e12918c-4973-3537-b9ab-e4723ae1ae1d",
        "youtube": "https://www.youtube.com/embed/RtjOEmIxtQw",
        "text": "Comandante Tom",
        "artist": "William Shatner",
        "song": "Space Oddity",
        "description": "El capitán Kirk de Star Trek manteniendo un tú a tú con el comandante Tom en una versión hablada de <em>Space Oddity</em>."
    }
]
var LIST_MARKET = [{
        "covers": 123,
        "name": "The Rise and Fall of Ziggy Stardust and the Spiders From Mars",
        "link": "#6c9ae3dd-32ad-472c-96be-69d0a3536261",
        "youtube": "https://www.youtube.com/embed/4AGK3AkGbLo",
        "text": "La versión del Guitar Hero",
        "artist": "Wavegroup Sound",
        "song": "Ziggy Stardust",
        "description": "Wavegroup Sound es una empresa de Sillicon Valley que hace la mezcla de <em>Ziggy Stardust</em> para Guitar Hero."
    },
    {
        "covers": 35,
        "name": "On Air",
        "link": "#e61c281f-c170-422d-a380-4e83e2bafe21",
        "youtube": "https://www.youtube.com/embed/SI97GtP11ns",
        "text": "La versión nana",
        "artist": "Rockabye Baby!",
        "song": "Rebel Rebel",
        "description": "Rockabye baby! está especializada en versiones para bebés y comercializa nanas de Bowie."
    },
    {
        "covers": 33,
        "name": "The Man Who Sold The World",
        "link": "#2536a41d-fde9-35d5-a6c6-cd4d94ffd916",
        "youtube": "https://www.youtube.com/embed/TlA3GNksUGs",
        "text": "La versión Easy Listening",
        "artist": "Vitamin String Quartet",
        "song": "The Man Who Sold The World",
        "description": "La misma <a href='http://www.cmhlabelgroup.com/'>empresa</a> comercializa VSQ es un producto Easy Listening con cuartetos de cuerda."
    },
    {
        "covers": 50,
        "name": "Heroes",
        "link": "#1f5ef8d3-10ca-30eb-b41e-85b16987d412",
        "youtube": "https://www.youtube.com/embed/wKKJb06Elo4",
        "text": "La versión del Reality Show",
        "artist": "The X Factor Finalists 2010",
        "song": "Heroes",
        "description": "Y por supuesto los shows televisivos de búsqueda de talentos también han versioneado a Bowie como en la final de Factor X de 2010 en UK."
    }
]
var LIST_INTERNATIONAL = [{
        "covers": 61,
        "name": "David Bowie",
        "link": "#2e12918c-4973-3537-b9ab-e4723ae1ae1d",
        "youtube": "https://www.youtube.com/embed/pc0E1bhpDSQ",
        "text": "La dudosa versión en español que raya el mal gusto",
        "artist": "Hermanos Calatrava",
        "song": "Space Oddity"
    },
    {
        "covers": 35,
        "name": "On Air",
        "link": "#e61c281f-c170-422d-a380-4e83e2bafe21",
        "youtube": "https://www.youtube.com/embed/GzkXuHu-xYc",
        "text": "La versión en brasileño",
        "artist": "Seu Jorge",
        "song": "Rebel Rebel"
    },
    {
        "covers": 13,
        "name": "1.Outside: The Nathan Adler Diaries: A Hyper Cycle",
        "link": "#2e12918c-4973-3537-b9ab-e4723ae1ae1d",
        "youtube": "https://www.youtube.com/embed/PQUJFj4n5Ts",
        "text": "La versión en turco",
        "artist": "Müslüm Gürses",
        "song": "I'm Deranged"
    }
]
var LIST_ARTISTS = [{
        "covers": 38,
        "name": "Diamond Dogs",
        "link": "#80dc4835d-b21a-3612-bac6-ab1e782a1396",
        "youtube": "https://www.youtube.com/embed/jZnOKBysN78",
        "text": "La versión de Tina Turner",
        "artist": "Tina Turner",
        "song": "1984"
    },
    {
        "covers": 35,
        "name": "On Air",
        "link": "#e61c281f-c170-422d-a380-4e83e2bafe21",
        "youtube": "https://www.youtube.com/embed/i3mdUf4j5h8",
        "text": "La versión del Boss",
        "artist": "Bruce Springsteen",
        "song": "Rebel Rebel"
    },
    {
        "covers": 33,
        "name": "The Man Who Sold The World",
        "link": "#2536a41d-fde9-35d5-a6c6-cd4d94ffd916",
        "youtube": "https://www.youtube.com/embed/fregObNcHC8",
        "text": "La versión de Nirvana",
        "artist": "Nirvana",
        "song": "The Man Who Sold The World"
    }
]
var LIST_GENRES = [{
        "covers": 23,
        "name": "Young Americans",
        "link": "#8c2a0eae-1359-3577-9127-e3d862acc2a2",
        "youtube": "https://www.youtube.com/embed/v-ec1in-JzU",
        "text": "La versión Rockabilly",
        "artist": "The Polecats",
        "song": "John I'm Only Dancing"
    },
    {
        "covers": 42,
        "name": "Scary Monsters… and Super Creeps",
        "link": "#bb13cb45-254c-3a61-89a5-15d22a97e6d6",
        "youtube": "https://www.youtube.com/embed/XTDWjZpVg9E",
        "text": "La versión Jazz",
        "artist": "Bojan Z",
        "song": "Ashes to Ashes"
    },
    {
        "covers": 34,
        "name": "Aladdin Sane",
        "link": "#50f8710f-3ae6-319b-85a7-afe783f13449",
        "youtube": "https://www.youtube.com/embed/zgayzxXqlD0",
        "text": "La versión Zapatillera",
        "artist": "Praga Khan",
        "song": "Jean Genie"
    },
    {
        "covers": 123,
        "name": "The Rise and Fall of Ziggy Stardust and the Spiders From Mars",
        "link": "#6c9ae3dd-32ad-472c-96be-69d0a3536261",
        "youtube": "https://www.youtube.com/embed/hebF0fBIst8",
        "text": "La versión Ruidosa",
        "artist": "Place to Bury Strangers",
        "song": "Suffragette City"
    },
    {
        "covers": 54,
        "name": "Let's Dance",
        "link": "#75c2bddf-1799-3eda-b6b3-a0cf5189d8ed",
        "youtube": "https://www.youtube.com/embed/ZdpG7vSrOfY",
        "text": "La versión Goth Rock",
        "artist": "Last Days of Jesus",
        "song": "China Girl"
    },
    {
        "covers": 0,
        "name": "",
        "link": "",
        "youtube": "https://www.youtube.com/embed/wkfPueWrRvo",
        "text": "La versión Cabaret",
        "artist": "Starlit",
        "song": "Modern Love"
    }
]

function generateVideoList(element, array) {

    for (var i = 0; i < array.length; i++) {
        var container = d3.select(element);

        var left = container.append("div").attr("class", "col-3 counter d-none d-sm-block");
        if (array[i].covers > 0) {
            left.append("p").attr("class", "counter-number").text(function() { return array[i].covers });
            left.append("h5").attr("class", "counter-units").text("Covers in the album");
            left.append("p").attr("class", "counter-entity").text(function() { return array[i].name });
            left.append("a").attr("class", "counter-link").attr("href", function() { return array[i].link }).text("See album");
        };

        var middle = container.append("div").attr("class", "col-9 col-sm-6 mb-3");
        middle.append("div").attr("class", "video-container").html(function() {
            return '<iframe src="' + array[i].youtube + '" frameborder="0"></iframe>'
        })
        if (array[i].description) {
            middle.append("p").html(function() { return array[i].description })
        };
        var right = container.append("div").attr("class", "col-3 counter figure");
        right.append("figcaption").attr("class", "figure-caption").text(function() { return array[i].text })
        right.append("span").attr("class", "artist-name").text(function() { return array[i].artist })
        right.append("em").attr("class", "song-name").text(function() { return array[i].song })
    };
}

generateVideoList("#list-genres", LIST_GENRES);
generateVideoList("#list-artists", LIST_ARTISTS);
generateVideoList("#list-international", LIST_INTERNATIONAL);
generateVideoList("#list-market", LIST_MARKET);
generateVideoList("#list-outsider", LIST_OUTSIDER);

var FORBIDDEN_VIDEOS = [
    "aCHg5r6rFoI",
    "CMThz7eQ6K0",
    "aySEzuNSN1k",
    "v--IqqusnNQ",
    "aCHg5r6rFoI",
    "SkkOu1BYNo0",
    "eF551z9KlA8",
    "4AyuiThAzaI",
    "N4d7Wp9kKjA",
    "jBuwC4VJi50",
    "6bLOjmY--TA",
    "EJBFD-Wvc7U",
    "ot61jhzYtdo",
    "LaqMwE5NKaM",
    "YWX_MFNOL_Y",
    "c65L71inrlg",
    "-oQO-kGU2lA",
    "0698sTH7mUk",
    "0uazTyTrk-8",
    "9G4jnaznUoQ",
    "JDG2m5hN1vo",
    "y-JqH1M4Ya8",
    "5WICgADzDqw",
    "3dv0AC0xnNI",
    "Whcgt_NBT30",
    "GA27aQZCQMk",
    "CGQo6zpVzt8",
    "6fHoMw8tCzo",
    "QgPUxjQOk-w",
    "rQtVB7_lDHg",
    "Tgcc5V9Hu3g",
    "YoDh_gHDvkk",
    "-nbq6Ur103Q",
    "J06yQb4lbPk", // End of video defaults
    "mjedw-Ar_Y8", // Love you till tuesday
    "pXSGocWifAg",
    "ERxTaENbRdY",
    "ICgZj_2E9Sw",
    "CtBItBCZsvU",
    "TaGAbCJ6AO8",
    "nv8gySWBpRo",
    "yefQwsHSkI0",
    "QFRqRUJHi4A",
    "1xINehkmCpc",
    "iYYRH4apXDo",
    "MY23nChpciw", // The Man Who Sold The World
    "Yr5MmGN3NxY",
    "SDtj9PS0wT0",
    "HjKcCGaCiu0",
    "x6rZIMB6mNk",
    "NhKQinkxPak",
    "T6z4lTf8qIs", // Lodger
    "cyjePaiVKXM",
    "XqUfX93EtJE", // Christiane F
    "rThH2eGEtoA",
    "WY0lAwPS38E",
    "vucGm9MiDBI", // On Air
    "hyH0Eo2WPfo",
    "hVt07JAR7Ws",
    "VdqsBX1q3sc", // David Bowie
    "c3OA6Ud91a8",
    "18kbAQXw11w",
    "Dw3BcdtGnFg",
    "Cr-SqRWImmI",
    "60-MoSGqhhg", // Ziggy Stardust
    "oijZhA8NK48",
    "IgJq6v6gA_4",
    "JghPaZAbIyo",
    "870wDkcQpHk",
    "XYL9tHrVrz0",
    "ha3_Hpicc3Y",
    "mx2uE7FhIZk",
    "VBe-idcujSg",
    "5yC-6Mel2Ow", // Ziggy Stardust Def Leppard
    "HkrGyRupneM",
    "7pJ3EFwY1Pw",
    "jv1h733ssac",
    "teW6dNG968U",
    "B_VKs1V53yE",
    "-i7u5tNhbJw",
    "yYwpnG-rkHI", // Let's Dance
    "2-ulsiCjnAc",
    "KsnmUB6w784",
    "bjErUqjZjIc",
    "cHsUHmHDfS8",
    "kjYlkEbU16M",
    "4DuxU9diD8g",
    "Crj6B2-7r6Q",
    "OPblCVR35y8", // Station to station
    "K3hxQ6umWOs",
    "hv7Y7F-Q2KE", // LOW
    "wnqa1XBegak",
    "ADupxRzX7mk",
    "W5cbtUzKNyo", // Diamond Dogs
    "26WbBSWauNs",
    "HaN-7fdRnvc",
    "555jxltr9Zo",
    "FTNGQqqB0JQ", // Hunky Dory
    "wQbIe-KBdjs",
    "UJtZd17wApc",
    "atv619qIfNU",
    "3JWGXagA1MI",
    "l9fQTQ6z324",
    "vLghYQ-sGew",
    // "jogv7tD18gs",
    "oNxDpqX_4wk",
    "LZZf_Tt1jXE",
    "Kz4NyLEqGKQ", // Young americans
    "aWRrpvPUOpI", // Scary Monsters
    "bUShW7T7vOM",
    "rTfkeW_4lNE",
    "kyb3LVGHwhE",
    "NhPZUJFC2LE",
    "RsynrZzCA94",
    "2xHIWvY-Xoc",
    "4t9AgwAzgGw", // Aladdin Sane
    "l8KSeYyxQbM",
    "IMOAqxaOsec",
    "NnOhBykB-z4", // Heroes
    "v-DiwnZw6jw",
    "ez9cRs_EkCk",
    "jR_dk7iyGFA",
    "4qEiT17OMOM"
];

var bannedAlbums = ['bc02d917-a52e-3d77-ae5f-75aa3fb754ef'];
var bannedTracks = [
    "3c8dffa2-9b30-4c07-93df-d05712d74582",
    "a1fc298b-6604-45aa-a9f6-c331e580822a",
    "a97a2742-b719-4fe3-8f3a-5c7d39573b02"
];

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
// var items = new vis.DataSet();

// var bowiePeriods = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// items.add({ id: 'A', content: 'Early career to debut album', start: '1962-01-1', end: '1967-12-31', type: 'background', size: 3 })
// items.add({ id: 'B', content: 'Space Oddity to Hunky Dory', start: '1968-01-1', end: '1972-04-1', type: 'background', className: 'negative', size: 187 })
// items.add({ id: 'C', content: 'Ziggy Stardust', start: '1972-04-2', end: '1973-12-31', type: 'background', size: 157 })
// items.add({ id: 'D', content: '"Plastic soul" and the Thin White Duke', start: '1974-01-1', end: '1976-10-1', type: 'background', className: 'negative', size: 75 })
// items.add({ id: 'E', content: 'Berlin era', start: '1976-10-2', end: '1979-12-31', type: 'background', size: 118 })
// items.add({ id: 'F', content: 'New Romantic and pop era', start: '1980-01-1', end: '1988-12-31', type: 'background', className: 'negative', size: 187 })
// items.add({ id: 'G', content: 'Tin Machine', start: '1989-01-1', end: '1991-12-31', type: 'background', size: 0 })
// items.add({ id: 'H', content: 'Electronic period', start: '1992-01-1', end: '1998-12-31', type: 'background', className: 'negative', size: 19 })
// items.add({ id: 'I', content: 'Neoclassicist Bowie', start: '1999-01-1', end: '2012-06-31', type: 'background', size: 110 })
// items.add({ id: 'J', content: 'Final years', start: '2012-07-1', end: '2016-12-31', type: 'background', className: 'negative', size: 2 })

function customOrder(a, b) {
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

        if (bannedAlbums.indexOf(i) === -1) {
            $.each(album.tracks, function(j, track) {
                if (bannedTracks.indexOf(track.recording_id) === -1) {
                    $.each(track.covers, function(k, cover) {
                        if (cover.credits === 'David Bowie') {
                            countCovers.push(track.title);
                        } else {
                            countOthers.push(track.title);
                        }
                    });
                }
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

            if (bannedAlbums.indexOf(i) === -1) {


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

                    if (bannedTracks.indexOf(track.recording_id) === -1) {

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
                    }


                });

                /*----------  Create the radialtree graph  ----------*/

                createRadial(myAlbumRadial, radialContainer, myAlbum.image, myAlbum.size);

                /*----------  Push data  ----------*/

                if (myAlbum.size >= MIN_COVERS_ALBUM) {
                    bowieSongsTree.children.push(myAlbum);
                    bowieSongsSun.children.push(myAlbumSun);
                    bowieSongsRadial.children.push(myAlbumRadial);
                };


            }
        });


        // ATERRIZAJE CON HASH

        var url = window.location.href,
            idx = url.indexOf("#")
        var landingHash = idx != -1 ? url.substring(idx + 1) : "";

        if (landingHash) {
            var hashAnchor = "#" + landingHash;
            $(document).scrollTop($(hashAnchor).offset().top);
        } else {
            $(document).scrollTop($("#bsides-start").offset().top);
        }

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
                return coversByArtist.length;
            })
            bowieDiscography.append("h5").attr("class", "counter-units").text(function() {
                return 'Artists singing Bowie songs along ' + bowieSongsTree.children.length + ' albums';
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
                return 'row justify-content-center node-content area-' + textSize;
                // return 'col-xs row middle-xs node-content tooltip';
            })
            .attr('title', function(d) {
                return d.name;
            })
            .html(function(d) {
                return d.children ? null : '<p class="col align-self-center"><strong>' + d.size + '</strong><em>COVERS</em><span>' + d.name + '</span></p>';
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

        var albumTitle = radialItem.append('div').attr('class', 'radial-album-title');

        albumTitle.append('div').attr('class', 'album-title')
            .html(function() {
                return size + '<span class="counter-units">Covers</span>' + '<strong>' + data.name + '</strong>';
            });

        var box = radialItem.append('div')
            .attr('id', data.id + '-album')
            .attr('class', 'radial-album');


        box.append('div').attr('class', 'record');

        var aside = radialItem.append('div')
            .attr('class', 'radial-aside content');

        var youtubeContainer = aside.append('div').attr('class', 'video').style('height', function() {
            return $(this).width() - ($(this).width() / 3) + 'px';
        });
        var coverTitleBadge = aside.append('span').attr('class', 'badge badge-primary').text('SONG');
        var coverTitle = aside.append('p').attr('class', 'cover-title').text('Song title');
        var coverArtistBadge = aside.append('span').attr('class', 'badge badge-primary').text('ARTIST');
        var coverArtist = aside.append('p').attr('class', 'cover-artist').text('Cover artist');

        var tweetbutton_container = aside.append('div').attr('class', 'tweet_button');

        tweetbutton_container.append("img").attr("src", "images/twitter.svg");

        tweetbutton_container.on("click", function() {
            var text = "I saw this amazing version of Bowie's " + candidate.coverName + " by " + candidate.name + " here: ";
            var url = BASE_URL + "?id=" + candidate.id + "#" + data.id;
            window.open("https://twitter.com/share?url=" + escape(url) + "&text=" + text, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            return false;
        });

        var backLink = aside.append('a').attr('href', '#covers-treemap-container').text('Back to albums').on('click', function() {
            // $('.video').empty();
            navigateSooth();
        });




        //        tweetbutton_container.append("a")
        //            .attr("href", "https://twitter.com/share")
        //            .classed("twitter-share-button", true)
        //            .attr("data-url", BASE_URL + "?id=" + candidate.id)
        //            .attr("data-text", "I saw this amazing version of Bowie's " + candidate.coverName + " by " + candidate.name + " here: ")
        //            .attr("data-size", "normal")
        //            .attr("data-show-count", false).html("TROLLEO");

        //        tweetbutton_container.html('<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-url="http://outliers.es" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');
        //        tweetbutton_container.html('<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Hello%20world" data-size="large">Tweet</a>');

        // OSCAR

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

                    if ((parseInt(d.youtube.views, 10) > MIN_VIDEO_VIEWS) && (FORBIDDEN_VIDEOS.indexOf(d.youtube.id) == -1)) {
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
                d3.selectAll('.node').classed('active', false)
                d3.select(this).classed('active', true);

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

                    // Remake the tweet button

                    tweetbutton_container.on("click", function() {
                        var text = "I saw this amazing version of Bowie's " + d.parent.name + " by " + d.name + " here: ";
                        var url = BASE_URL + "#" + d.parent.parent.id + "?id=" + d.youtube.id;
                        window.open("https://twitter.com/share?url=" + escape(url) + "&text=" + text, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                        return false;
                    });

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

        // OSCAR

        // console.log("LOOKING FOR THE MOST VIEWED VIDEO");

        // console.log(data);

        var candidate = { 'coverName': undefined, 'name': undefined, 'id': undefined, 'count': 0 };

        data.children.forEach(function(d, i) {
            // console.log("SONG", d.name, i);
            if (('children' in d) && (d.children.length > 0)) {
                var children = d.children;
                children.forEach(function(version, j) {
                    if ('youtube' in version && FORBIDDEN_VIDEOS.indexOf(version.youtube.id) == -1) {
                        // console.log("VERSION", version.name, version.youtube.id, version.youtube.views, candidate);
                        if (parseInt(version.youtube.views, 10) > candidate.count) {
                            candidate = { coverName: d.name, name: version.name, id: version.youtube.id, count: parseInt(version.youtube.views, 10) };

                            $(".node text:contains(" + version.name + ")").parent().addClass('active');

                            coverTitle.text(function() {
                                return d.name;
                            })
                            coverArtist.text(function() {
                                return version.name;
                            })
                        }
                    }
                })
            }

        });

        // console.log("CANDIDATE!", candidate);

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

        // var youtubeContainerSubText = aside.append('div').attr('class', 'video_subtext').html(DEFAULT_VIDEO_TEXT);

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

    // id in params?



});



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