type message = {
  expires: float,
  text: string,
};

let defaultTimeToLive = 3000.;
let not = (fn, x) => !fn(x);
let expired = (now, message) => now > message.expires;
let nextExpire = messages => {
  Js.Array.length(messages) > 0
    ? Some(Js.Array.unsafe_get(messages, 0)) : None;
};

let hook =
    (
      ~now=Js.Date.now,
      ~ttl=defaultTimeToLive,
      initialMessages: Js.Array.t(message),
    ) => {
  let (messages, setMessages) = React.useState(() => initialMessages);
  React.useEffect1(
    () =>
      switch (nextExpire(messages)) {
      | None => None
      | Some(message) =>
        let timeoutId =
          Js.Global.setTimeout(
            () =>
              setMessages(messages =>
                Js.Array.filter(not(expired(now())), messages)
              ),
            int_of_float(message.expires -. now()),
          );
        Some(() => Js.Global.clearTimeout(timeoutId));
      },
    [|messages|],
  );

  let addMessage = messageText => {
    setMessages(messages => {
      let newMessages =
        [|{expires: Js.Date.now() +. ttl, text: messageText}|]
        ->Js.Array.concat(messages);
      newMessages;
    });
  };
  (Js.Array.map(msg => msg.text, messages), addMessage);
};
