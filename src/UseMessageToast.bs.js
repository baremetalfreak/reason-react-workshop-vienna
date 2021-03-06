// Generated by BUCKLESCRIPT VERSION 5.0.1, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";

function not_(fn, x) {
  return !Curry._1(fn, x);
}

function expired(now, message) {
  return now > message[/* expires */0];
}

function nextExpire(messages) {
  return Belt_List.get(messages, 0);
}

function hook(param) {
  var match = React.useState((function () {
          return /* [] */0;
        }));
  var setMessages = match[1];
  var messages = match[0];
  React.useEffect((function () {
          var match = Belt_List.get(messages, 0);
          if (match !== undefined) {
            var timeoutId = setTimeout((function (param) {
                    return Curry._1(setMessages, (function (messages) {
                                  var partial_arg = Date.now();
                                  var partial_arg$1 = function (param) {
                                    return partial_arg > param[/* expires */0];
                                  };
                                  return Belt_List.keep(messages, (function (param) {
                                                return !Curry._1(partial_arg$1, param);
                                              }));
                                }));
                  }), match[/* expires */0] - Date.now() | 0);
            return (function (param) {
                      clearTimeout(timeoutId);
                      return /* () */0;
                    });
          }
          
        }), /* array */[messages]);
  var addMessage = function (text) {
    return Curry._1(setMessages, (function (messages) {
                  return Belt_List.concat(messages, /* :: */[
                              /* record */[
                                /* expires */Date.now() + 3000,
                                /* text */text
                              ],
                              /* [] */0
                            ]);
                }));
  };
  return /* tuple */[
          Belt_List.toArray(messages),
          addMessage
        ];
}

var defaultTimeToLive = 3000;

export {
  defaultTimeToLive ,
  not_ ,
  expired ,
  nextExpire ,
  hook ,
  
}
/* react Not a pure module */
