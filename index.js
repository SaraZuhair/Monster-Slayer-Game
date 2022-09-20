const app = Vue.createApp({
    data() {

        return {
        monsterHealth: 100,
        playerHealth: 100,
        round: 0,
        winner: null,
        log: [],
        };
    },

    watch: {
        playerHealth(value) {
            if (value <=0 && this.monsterHealth <= 0){
                //draw
                this.winner ='draw';
            } else if(value <=0){
                //player lost
                this.winner ='monster';
            }
        },
        monsterHealth(value) {
            if(value <=0 && this.playerHealth <=0 ){
                //draw
                this.winner ='draw';
            } else if(value <= 0){
                //monster lost
                this.winner ='player';
            }
        }
    },

    methods: {
        attackmonster() {
            this.round ++;
            const attackvalue= Math.floor(Math.random() * (12 - 6) + 6);
            this.monsterHealth -= attackvalue;
            this.addlog("player", "attack" , attackvalue );
            this.attackPlayer(); 
        },

        attackPlayer() {
            const attackvalue= Math.floor(Math.random() * (16 - 9) + 9);
            this.playerHealth -= attackvalue;
            this.addlog("monster", "attack" , attackvalue );
        },

        specialattack() {
            this.round++;
            const attackvalue= Math.floor(Math.random() * (25 - 12) + 12);
            this.monsterHealth -= attackvalue;
            this.addlog("player", "Special-attack" , attackvalue );
            this.attackPlayer();
        },

        healplayer() {
            this.round++;
            const healvalue = Math.floor(Math.random() * (25 - 9) + 9);
            
            if(this.playerHealth + healvalue > 100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += healvalue;
            }

            this.addlog("player", "heal" , healvalue );
            this.attackPlayer();
        },

        startOver() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.round = 0;
            this.winner = null;
            this.log = [];
        },

        surrender() {
            this.winner ='monster';
        },

        addlog(who, type, value) {
            //array of objects
            this.log.unshift(
                {
                    by: who,
                    type: type,
                    value: value,
                }
            );
        }
    }
});



app.mount('#game');