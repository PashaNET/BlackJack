$(document).ready(function(){
    var app = {
            initialize: function(){
                this.setUpListeners();
            },
            setUpListeners: function(){
                $(window).load(this.startGame);
                $('#get_button').on('click', this.playerGame);
                $('#stop_button').on('click', this.dealerGame);
                $('#play_again').on('click', this.newGame);
            },
            dealer:{
                points: 0,
                cards: []
            },
            player:{
                points: 0,
                cards: []
            },
            deck: function(){
                var deck = new Deck();
                deck.createDeck();
                deck.shuffle();
                return deck.card_deck;
            },
            startGame: function(){
                $('.table').show();

               for(var i = 0; i < 2; i++){
                    app.getCardFromDeck('dealer');
                    app.getCardFromDeck('player');
               }
               app.showCards('dealer', 'close');
               app.showCards('player');

               setTimeout(function(){
                   app.checkResult();
               }, 1000);
            },
            getCardFromDeck: function(player){
                var player = (typeof player == 'string')? player: 'player',
                    card = app.deck().shift();
                app[player].cards.push(card);
                app[player].points += card.rank;
            },
            showCards: function(player, view){
                var cards = app[player].cards,
                    cards_lenght = cards.length;
                $('#' + player).empty();
                for(var i = 0; i < cards_lenght; i++){
                    app.addCardToTable(player, (view == 'close')?'back_side':cards[i].img);
                }
            },
            addCardToTable: function(player, img){
                $('#' + player).append('<img src="images/cards/'+ img +'.png">');
                $('#score_' + player).html(app[player].points);
            },
            dealerGame: function(){
                $('#score_dealer').show();
                app.showCards('dealer');
                var result = app.checkResult();
                if(result.dealer > 21){
                    app.showAndWriteResults('You win!');
                }
                else if(result.dealer < result.player){
                    app.addCard('dealer');
                    setTimeout(function(){
                        app.dealerGame();
                    }, 1100);
                }
                else{
                    setTimeout(function(){
                        app.showAndWriteResults('You lose!');
                    }, 500);
                }
            },
            playerGame: function(){
                app.addCard('player');
                setTimeout(function(){
                    app.checkResult();
                }, 1100);
            },
            addCard: function(player){
                setTimeout(function(){
                    app.getCardFromDeck(player);
                    app.showCards(player);
                }, 1000);

            },
            checkResult: function(){
                var player_points = app.player.points,
                    dealer_points = app.dealer.points;
                if(player_points == 21){
                    app.showCards('dealer');
                    app.showAndWriteResults('You win!');
                }
                else if(player_points > 21){
                    app.showCards('dealer');
                    app.showAndWriteResults('You lose!');
                }

                return {player: player_points, dealer: dealer_points};
            },
            showAndWriteResults: function(title){
                var player_points = app.player.points,
                    dealer_points = app.dealer.points;
                $('#modal_title').text(title);
                $('#modal_body').html('<h3>Player: '+ player_points +'</h3> <h3>Dealer: '+ dealer_points +'</h3>');
                $('#results').modal('show');

                var data = new FormData();
                data.append('title', title);
                data.append('player_points', player_points);
                data.append('dealer_points', dealer_points);
                $.ajax({
                    url: 'php/writeResult.php',
                    type: 'POST',
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    error: function(jqXHR, textStatus){
                        alert(textStatus);
                    }
                });
            },
            newGame: function(){
                location.reload();
            }
        };

    app.initialize();
});
