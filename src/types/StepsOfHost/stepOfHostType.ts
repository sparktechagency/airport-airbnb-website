import { Dispatch, SetStateAction } from "react";

interface Step {
    title?: string;
    content: React.JSX.Element | string;
    skippable?: boolean;
}
export interface Props {
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
    steps: Step[];
} 


//for location
export interface PropertyDetails {
  location: string;
  latitude: number;
  longitude: number;
}

export interface SelectLocationProps {
  updateFormData: (newData: Partial<PropertyDetails>) => void;
  formData: PropertyDetails;
}

