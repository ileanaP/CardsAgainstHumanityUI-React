//global.api = 'http://cardsagainsthumanity.test/api/';
global.api = 'http://localhost/CardsAgainstHumanity/public/api/';

global.getTryUserEnterGameURL = function(gameId, userId) {
    return global.api + 'games/' + gameId + '/users/' + userId;
}

global.getGameURL = function(gameId) {
    return global.api + 'games/' + gameId;
}

global.getGamePlayersURL = function(gameId) {
    return global.api + 'games/' + gameId + '/users';
}

global.getUserCardsForCurrRound = function (userId, roundId) {
    return global.api + 'users/' + userId + '/rounds/' + roundId;
}

global.getGameRoundData = function (gameId) {
    return global.api + 'games/' + gameId + '/rounds'
}

global.tryGetGameRoundData = function (gameId) {
    return global.api + 'games/' + gameId + '/tryGetCurrentRound'
}

global.getCurrUserCardData = function (roundId) {
    return global.api + 'games/' + roundId + '/getUserWhiteCards'
}