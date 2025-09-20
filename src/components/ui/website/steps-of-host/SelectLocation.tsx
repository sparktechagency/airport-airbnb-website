"use client";

import React, { useRef, useState } from "react";
import { Form, Input } from "antd";
import { TbCurrentLocation } from "react-icons/tb";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultViewport = {
  latitude: 0,
  longitude: 0,
  zoom: 2,
};

interface SelectLocationProps {
  location: string;
  setLocation: (val: string) => void;
}

const SelectLocation = ({ location, setLocation }: SelectLocationProps) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [viewport, setViewport] = useState(defaultViewport);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["places"],
  });

  const handlePlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (place?.formatted_address) {
      setLocation(place.formatted_address);
    }

    if (place.geometry?.location) {
      const latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMarker(latLng);
      setViewport({ latitude: latLng.lat, longitude: latLng.lng, zoom: 12 });
      map?.panTo(latLng);
    }
  };

  const geocodeAddress = (address: string) => {
    if (!window.google || !address?.trim()) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const loc = results[0].geometry.location;
        const latLng = { lat: loc.lat(), lng: loc.lng() };
        setLocation(results[0].formatted_address);
        setMarker(latLng);
        setViewport({ latitude: latLng.lat, longitude: latLng.lng, zoom: 12 });
        map?.panTo(latLng);
      }
    });
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className="lg:w-1/2 w-full">
      <Form.Item
        // label={<p className="text-sm text-gray-600">Location</p>} 
     
      >
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
          options={{ types: ["geocode"], fields: ["formatted_address", "geometry"] }}
        >
          <Input
            placeholder="Enter Location"
            style={{ height: 45 }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            suffix={
              <TbCurrentLocation
                size={20}
                color="#083a65"
                className="cursor-pointer"
                onClick={() => geocodeAddress(location)}
              />
            }
          />
        </Autocomplete>
      </Form.Item>

      <div className="lg:mt-20 mt-10 h-[350px]" style={{ borderRadius: 10 }}>
        <GoogleMap
          center={{ lat: viewport.latitude, lng: viewport.longitude }}
          zoom={viewport.zoom}
          onLoad={(mapInstance) => setMap(mapInstance)}
          onUnmount={() => setMap(null)}
          mapContainerStyle={mapContainerStyle}
        >
          {marker && (
            <Marker
              position={marker}
              icon={{
                url: "/marker.png",
                scaledSize: new window.google.maps.Size(25, 30),
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default SelectLocation;
