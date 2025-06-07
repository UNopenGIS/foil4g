import { APIProvider, Map } from "@vis.gl/react-google-maps";

export const BasicReactGoogleMaps = () => {
  return (
    <APIProvider apiKey="YOUR_API_KEY">
      <Map
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={2}
        style={{ width: "100%", height: "100%" }}
      />
    </APIProvider>
  );
};
