
function Card(name, rank, suit, img){
    this.name = name;
    this.rank = rank;
    this.suit = suit;
    this.img = img;
}

function Deck(){
    this.card_deck = [];

    this.createDeck = function(){
        var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
            cards_length = cards.length,
            suits = ["Crosses", "Diamonds", "Hearts", "Spades"],
            suits_length = suits.length;
        for(var i = 0; i < cards_length; i++){
            for(var j = 0; j < suits_length; j++){
                var card = cards[i],
                    rank = parseInt(card);
                if(!rank){
                    (card == 'A')? rank = 11 : rank = 10;
                }
                var img_name = card + suits[j];
                this.card_deck.push(new Card(card, rank, suits[j], img_name));
            }
        }
    };

    this.shuffle  = function(){
        var card_deck_length = this.card_deck.length;
        for (var i = card_deck_length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1)),
                temp = this.card_deck[i];
            this.card_deck[i] = this.card_deck[j];
            this.card_deck[j] = temp;
        }
    };

    this.getCard = function(){
        return this.card_deck.shift();
    };
}

var DeckSingleton = (function(){
    var instance;

    function createInstance() {
        var deck = new Deck;
        deck.createDeck();
        deck.shuffle();
        return deck;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


