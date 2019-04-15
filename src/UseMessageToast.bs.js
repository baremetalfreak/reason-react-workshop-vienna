// Generated by BUCKLESCRIPT VERSION 5.0.1, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function not_(fn, x) {
  return !Curry._1(fn, x);
}

function expired(now, message) {
  return now > message[/* expires */0];
}

function nextExpire(messages) {
  var match = messages.length > 0;
  if (match) {
    return Caml_option.some(messages[0]);
  }
  
}

function hook($staropt$star, $staropt$star$1, initialMessages) {
  var now = $staropt$star !== undefined ? $staropt$star : (function (prim) {
        return Date.now();
      });
  var ttl = $staropt$star$1 !== undefined ? $staropt$star$1 : 3000;
  var match = React.useState((function () {
          return initialMessages;
        }));
  var setMessages = match[1];
  var messages = match[0];
  React.useEffect((function () {
          var match = nextExpire(messages);
          if (match !== undefined) {
            var timeoutId = setTimeout((function (param) {
                    return Curry._1(setMessages, (function (messages) {
                                  var partial_arg = Curry._1(now, /* () */0);
                                  var partial_arg$1 = function (param) {
                                    return partial_arg > param[/* expires */0];
                                  };
                                  return messages.filter((function (param) {
                                                return !Curry._1(partial_arg$1, param);
                                              }));
                                }));
                  }), match[/* expires */0] - Curry._1(now, /* () */0) | 0);
            return (function (param) {
                      clearTimeout(timeoutId);
                      return /* () */0;
                    });
          }
          
        }), /* array */[messages]);
  var addMessage = function (messageText) {
    return Curry._1(setMessages, (function (messages) {
                  return messages.concat(/* array */[/* record */[
                                /* expires */Date.now() + ttl,
                                /* text */messageText
                              ]]);
                }));
  };
  return /* tuple */[
          messages.map((function (msg) {
                  return msg[/* text */1];
                })),
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
