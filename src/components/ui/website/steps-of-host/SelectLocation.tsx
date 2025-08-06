"use client";

import React, { useEffect, useRef, useState } from "react";
import { Form, Input } from "antd";
import { TbCurrentLocation } from "react-icons/tb";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { SelectLocationProps } from "@/types/StepsOfHost/stepOfHostType";



const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultViewport = {
  latitude: 0,
  longitude: 0,
  zoom: 2,
};

const SelectLocation: React.FC<SelectLocationProps> = ({ updateFormData, formData }) => {
  const [form] = Form.useForm();
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [viewport, setViewport] = useState(defaultViewport);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["places"],
  });

  useEffect(() => {
    if (formData?.location) {
      form.setFieldsValue({ location: formData.location });
      const latLng = { lat: formData.latitude, lng: formData.longitude };
      setMarker(latLng);
      setViewport({ latitude: formData.latitude, longitude: formData.longitude, zoom: 12 });
    }
  }, [formData, form]);

  const handlePlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (place.formatted_address && place.geometry?.location) {
      const location = place.geometry.location;
      const latLng = { lat: location.lat(), lng: location.lng() };

      form.setFieldsValue({ location: place.formatted_address });
      setMarker(latLng);
      setViewport({ latitude: latLng.lat, longitude: latLng.lng, zoom: 12 });
      map?.panTo(latLng);

      updateFormData({
        location: place.formatted_address,
        latitude: latLng.lat,
        longitude: latLng.lng,
      });
    }
  };

  const geocodeAddress = (address: string) => {
    if (!window.google || !address?.trim()) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const location = results[0].geometry.location;
        const latLng = { lat: location.lat(), lng: location.lng() };

        form.setFieldsValue({ location: results[0].formatted_address });
        setMarker(latLng);
        setViewport({ latitude: latLng.lat, longitude: latLng.lng, zoom: 12 });
        map?.panTo(latLng);

        updateFormData({
          location: results[0].formatted_address,
          latitude: latLng.lat,
          longitude: latLng.lng,
        });
      }
    });
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className="lg:w-1/2 w-full ">
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => geocodeAddress(values.location)}
      >
        <Form.Item
          name="location"
          label={<p className="text-sm text-gray-600">Location</p>}
          rules={[{ required: true, message: "Please select a location" }]}
        >
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input
              placeholder="Enter Location"
              style={{ height: 45 }}
              suffix={
                <TbCurrentLocation
                  size={20}
                  color="#083a65"
                  onClick={() =>
                    geocodeAddress(form.getFieldValue("location"))
                  }
                  className="cursor-pointer"
                />
              }
            />
          </Autocomplete>
        </Form.Item>

        <div
          className="lg:mt-20 mt-10 h-[350px] "
style={{ borderRadius:"10px"}}
        >
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
      </Form>
    </div>
  );
};

export default SelectLocation;
