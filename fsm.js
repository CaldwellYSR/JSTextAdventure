"use strict";

var FSM = function() {
    this.handlers = {};
    this.initialState = null;
    this.endStates = [];
};
FSM.prototype.addState = function(name, handler, endState) {
    name = name.toUpperCase();
    this.handlers[name] = handler;
    if (endState) {
        this.endStates.push(name);
    }
};
FSM.prototype.setStart = function(name) {
    this.initialState = name.toUpperCase();
};

FSM.prototype.run = function() {
    try {
        var handler = this.handlers[this.initialState];
    } catch(e) {
        console.log(e);
        return false;
    }

    if (this.endStates.length == 0) {
        console.log("At least one state must be an end state");
        return false;
    }

    while (true) {
        var newState = handler();
        if (this.endStates.indexOf(newState.toUpperCase()) >= 0) {
            handler = this.handlers[newState.toUpperCase()];
            handler();
            break;
        } else {
            handler = this.handlers[newState.toUpperCase()];
        }
    }
    return true;
};

module.exports = new FSM();
