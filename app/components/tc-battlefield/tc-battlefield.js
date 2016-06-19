"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tc_service_1 = require('../tc-service/tc-service');
var tc_set_value_1 = require('../tc-set-value/tc-set-value');
var tc_restart_game_1 = require('../tc-restart-game/tc-restart-game');
var tcBattlefield = (function () {
    function tcBattlefield(_tcService) {
        this._tcService = _tcService;
        this.currentPlayer = true; //true = x | false = o 
        this.startGame();
    }
    tcBattlefield.prototype.startGame = function () {
        this.battlefield = [];
        this.winner = this.draw = false;
        this.currentPlayerLabel = this.returnCurrentPlayer(this.currentPlayer);
        while (this.battlefield.length < 9) {
            var randomNumber = Math.ceil(Math.random() * 100);
            var found = false;
            for (var i = 0; i < this.battlefield.length; i++) {
                if (this.battlefield[i] == randomNumber) {
                    found = true;
                    break;
                }
            }
            if (!found)
                this.battlefield[this.battlefield.length] = randomNumber;
        }
    };
    tcBattlefield.prototype.play = function (index, currentPlayer) {
        if (typeof (this.battlefield[index]) !== "string") {
            if (currentPlayer)
                this.battlefield[index] = 'X';
            else
                this.battlefield[index] = 'O';
            this.checkGame(this.battlefield);
            this.currentPlayer = !this.currentPlayer;
            this.currentPlayerLabel = this.returnCurrentPlayer(this.currentPlayer);
        }
    };
    tcBattlefield.prototype.checkGame = function (battlefield) {
        var gameStatus = this._tcService.checkGame(this.battlefield);
        if (gameStatus !== undefined && gameStatus.endGame) {
            gameStatus.winner = this.returnCurrentPlayer(gameStatus.winner);
            this.winner = gameStatus;
        }
        else if (gameStatus !== undefined && gameStatus.draw) {
            this.draw = gameStatus.draw;
        }
    };
    tcBattlefield.prototype.returnCurrentPlayer = function (currentPlayer) {
        if ((currentPlayer && typeof (currentPlayer) === 'boolean') || (currentPlayer && typeof (currentPlayer) === 'string') && currentPlayer === 'X')
            return '<img src="app/images/ic_X.svg" alt="X">';
        else
            return '<img src="app/images/ic_O.svg" alt="O">';
    };
    tcBattlefield = __decorate([
        core_1.Component({
            selector: 'tc-battlefield',
            templateUrl: 'app/components/tc-battlefield/tpl/tc-battlefield.html',
            providers: [tc_service_1.tcService],
            directives: [tc_set_value_1.tcSetValue, tc_restart_game_1.tcRestartGame]
        }), 
        __metadata('design:paramtypes', [tc_service_1.tcService])
    ], tcBattlefield);
    return tcBattlefield;
}());
exports.tcBattlefield = tcBattlefield;
//# sourceMappingURL=tc-battlefield.js.map