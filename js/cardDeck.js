
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
                var rank = parseInt(cards[i]);
                if(!rank){
                    if(cards[i]=='A'){
                        rank = 11;
                    }
                    else{
                        rank = 10;
                    }
                }
                var img_name = cards[i] + suits[j];
                this.card_deck.push(new Card(cards[i], rank, suits[j], img_name));
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
}


