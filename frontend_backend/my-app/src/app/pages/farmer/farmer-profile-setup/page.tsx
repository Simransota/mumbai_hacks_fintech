"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronRight, Loader2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { Button } from "../../../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../components/ui/form"
import { Input } from "../../../../components/ui/input"
import { Progress } from "../../../../components/ui/progress"
import Link from "next/link"

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// Form Schema
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  landLocation: z.string().min(1, "Land location is required"),
  latitude: z.number(),
  longitude: z.number(),
  typeOfCrop: z.array(z.string()).min(1, "At least one crop type must be selected"),
  governmentSubsidyUsage: z.string().min(1, "Please select a government subsidy."),
  landDocument: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .pdf, .jpg, and .png formats are supported."
    ),
  bankStatement: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .pdf, .jpg, and .png formats are supported."
    ),
});

// Form Sections
const formSections = [
  { title: "Personal Information", fields: ["fullName", "dateOfBirth", "email", "phoneNumber"] },
  { title: "Farmer Information", fields: ["landLocation", "typeOfCrop"] },
  { title: "Financial Indicators", fields: ["governmentSubsidyUsage", "landDocument", "bankStatement"] },
];

// Crop Options
const cropOptions = [
  "Rice",
  "Wheat",
  "Sugarcane",
  "Pulses",
  "Cotton",
  "Soybean",
  "Maize",
];

// Government Subsidy Options
const subsidyOptions = [
  { value: "pmKisan", label: "PM-Kisan Samman Nidhi" },
  { value: "pmfby", label: "Pradhan Mantri Fasal Bima Yojana (PMFBY)" },
  { value: "mgnrega", label: "MGNREGA" },
  { value: "interestSubvention", label: "Interest Subvention Scheme for Farmers" },
  { value: "nabard", label: "NABARD Refinance Scheme" },
  { value: "ruralDevelopment", label: "Rural Development Yojanas (NRLM and SRLM)" },
];

function MapSelector({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const mapRef = useRef<L.Map | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  // Fix Leaflet's default icon issue
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      mapRef.current = L.map('map').setView([20.5937, 78.9629], 5)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)

      const marker = L.marker([20.5937, 78.9629], { draggable: true }).addTo(mapRef.current)

      marker.on('dragend', function(e) {
        const position = e.target.getLatLng()
        onLocationSelect(position.lat, position.lng)
      })

      mapRef.current.on('click', function(e) {
        marker.setLatLng(e.latlng)
        onLocationSelect(e.latlng.lat, e.latlng.lng)
      })

      // Get user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])
          mapRef.current?.setView([latitude, longitude], 13)
          marker.setLatLng([latitude, longitude])
          onLocationSelect(latitude, longitude)
        },
        (error) => {
          console.error('Error getting user location:', error)
        }
      )
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [onLocationSelect])

  return (
    <div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
      {userLocation && (
        <p className="mt-2 text-sm text-gray-600">
          Your current location: {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
        </p>
      )}
    </div>
  )
}

export default function Component() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: undefined,
      email: "",
      phoneNumber: "",
      landLocation: "",
      latitude: 0,
      longitude: 0,
      typeOfCrop: [],
      governmentSubsidyUsage: "",
      landDocument: null,
      bankStatement: null,
    },
  });

  const currentFields = formSections[step].fields;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      alert("Form submitted successfully!");
    }, 2000);
  }

  const progress = ((step + 1) / formSections.length) * 100;

  function handleLocationSelect(lat: number, lng: number) {
    form.setValue('latitude', lat);
    form.setValue('longitude', lng);
    form.setValue('landLocation', `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  }

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Farmer Signup Form</h1>
      <Progress value={progress} className="w-full" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{formSections[step].title}</h2>
            {currentFields.map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof z.infer<typeof formSchema>}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      {getFieldLabel(field)}
                    </FormLabel>
                    <FormControl>
                      {renderFormControl(field, formField, handleLocationSelect)}
                    </FormControl>
                    <FormDescription>
                      {getFieldDescription(field)}
                    </FormDescription>
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex justify-between">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            {step < formSections.length - 1 ? (
              <Button type="button" onClick={() => setStep(step + 1)} className="ml-auto">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Link href={"/pages/farmer/farmer-predictive-model"}>
              <Button type="submit" disabled={isSubmitting} className="ml-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Information"
                )}
              </Button>
              </Link>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

// Helper Functions
function getFieldLabel(field: string): string {
  return field.split(/(?=[A-Z])/).join(" ").replace(/^\w/, c => c.toUpperCase());
}

function getFieldDescription(field: string): string {
  switch (field) {
    case "fullName":
      return "Enter your full name.";
    case "dateOfBirth":
      return "Select your date of birth.";
    case "email":
      return "Enter a valid email address.";
    case "phoneNumber":
      return "Enter your phone number.";
    case "landLocation":
      return "Select your land location on the map or use your current location.";
    case "typeOfCrop":
      return "Select the type(s) of crop being cultivated.";
    case "governmentSubsidyUsage":
      return "Select a government subsidy you have utilized.";
    case "landDocument":
      return "Upload relevant land documentation (PDF, JPG, or PNG, max 5MB).";
    case "bankStatement":
      return "Upload your bank statement (PDF, JPG, or PNG, max 5MB).";
    default:
      return "";
  }
}

function renderFormControl(field: string, formField: any, handleLocationSelect: (lat: number, lng: number) => void) {
  switch (field) {
    case "fullName":
    case "email":
    case "phoneNumber":
      return <Input {...formField} />;
    case "dateOfBirth":
      return (
        <Input
          type="date"
          {...formField}
          onChange={(e) => formField.onChange(new Date(e.target.value))}
        />
      );
    case "landLocation":
      return (
        <>
          <Input {...formField} readOnly />
          <MapSelector onLocationSelect={handleLocationSelect} />
        </>
      );
    case "typeOfCrop":
      return (
        <div className="flex flex-col space-y-2">
          {cropOptions.map(crop => (
            <label key={crop} className="flex items-center">
              <input
                type="checkbox"
                value={crop}
                onChange={(e) => {
                  const value = e.target.value;
                  if (e.target.checked) {
                    formField.onChange([...formField.value, value]);
                  } else {
                    formField.onChange(formField.value.filter((v: string) => v !== value));
                  }
                }}
                className="mr-2"
              />
              {crop}
            </label>
          ))}
        </div>
      );
    case "governmentSubsidyUsage":
      return (
        <select {...formField} className="w-full p-2 border rounded-md">
          <option value="">Select a subsidy</option>
          {subsidyOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "landDocument":
    case "bankStatement":
      return (
        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            const file = e.target.files?.[0];
            formField.onChange(file);
          }}
        />
      );
    default:
      return <Input {...formField} />;
  }
}