import { Wrapper, Status } from "@googlemaps/react-wrapper";

const ref = React.useRef<HTMLDivElement>(null);
const [map, setMap] = React.useState<google.maps.Map>(null);

React.useEffect(() => {
  if (ref.current && !map) {
    setMap(new window.google.maps.Map(ref.current, {}));
  }
}, [ref, map]);

const render = () => {
    return <h1>{status}</h1>;
  };
  
  <Wrapper apiKey={"AIzaSyD1XnQk1ZLEbBXcSBS3_UZlEHHkO0S6v5M"} render={render}>
    <YourComponent/>
  </Wrapper>
