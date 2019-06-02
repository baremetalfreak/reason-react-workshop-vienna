let s = React.string;

[@react.component]
let make = () =>
  <div> <Downshift> {() => <div> "KAREL"->s </div>} </Downshift> </div>;
