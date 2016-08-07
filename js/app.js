var descendingScore = function(a, b) {
    return b.score - a.score;
};

var descendingTotal = function(a, b) {
    return b.total - a.total;
};

var calculateTotals = function() {
    $.each(clans, function(i, clan) {
        var total = 0;
        $.each(clan.members, function(j, member) {
            total += member.score;
        });
        clan.total = total;

        clan.members = clan.members.sort(descendingScore);
    });

    clans = clans.sort(descendingTotal);
};

var generateScores = function() {

    var scoresElement = $('#scores');

    $.each(clans, function(i, clan) {

        var rowspan = clan.members.length;

        $.each(clan.members, function(j, member) {

            var row = null;

            if (j == 0 ) {
                var row = $('<tr><td rowspan="' + rowspan + '">The ' + clan.name + '</td><td>' + member.name + '</td><td>' + member.score + '</td><td rowspan="' + rowspan + '">' + clan.total + '</td></tr>');

            } else {
                var row = $('<tr><td>' + member.name + '</td><td>' + member.score + '</td></tr>');
            }

            scoresElement.append(row);
        });
    });
};

var initialiseFullPage = function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#ccddff', '#7BAABE'],
        anchors: ['intro', 'theRules', 'theWay', 'theScores'],
        menu: '#menu',
        navigation: true,
        navigationPosition: 'right'
    });
};

var bootstrapper = function() {
    calculateTotals();
    generateScores();
    initialiseFullPage();
}

$(document).ready(bootstrapper);
