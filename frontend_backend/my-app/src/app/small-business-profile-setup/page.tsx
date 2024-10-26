'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/progress";
import { Textarea } from "../../components/ui/textarea";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// Form Schema
const formSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  ownerName: z.string().min(1, "Owner's name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().min(1, "City is required"),
  shopLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  businessStatement: z.string().min(1, "Business statement is required"),
  amazonSellerId: z.string().optional(),
  socialMediaHandle: z.string().optional(),
  supplierDocument: z
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
    )
    .optional(),
});

// Form Sections
const formSections = [
  { title: "Business Information", fields: ["businessName", "ownerName", "email", "phoneNumber", "city"] },
  { title: "Business Statement & Seller Info", fields: ["shopLocation", "businessStatement", "amazonSellerId", "socialMediaHandle"] },
  { title: "Documents", fields: ["supplierDocument", "bankStatement"] }, // Updated to include bank statement
];

function MapSelector({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const mapRef = useRef<L.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: markerIcon.src,
        iconRetinaUrl: markerIcon2x.src,
        shadowUrl: markerShadow.src,
      });

      mapRef.current = L.map('map').setView([20.5937, 78.9629], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      const marker = L.marker([20.5937, 78.9629], { draggable: true }).addTo(mapRef.current);

      marker.on('dragend', function(e) {
        const position = e.target.getLatLng();
        onLocationSelect(position.lat, position.lng);
      });

      mapRef.current.on('click', function(e) {
        marker.setLatLng(e.latlng);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          mapRef.current?.setView([latitude, longitude], 13);
          marker.setLatLng([latitude, longitude]);
          onLocationSelect(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [onLocationSelect]);

  return (
    <div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
      {userLocation && (
        <p className="mt-2 text-sm text-gray-600">
          Your current location: {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
        </p>
      )}
    </div>
  );
}

export default function BusinessForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      phoneNumber: "",
      city: "",
      shopLocation: {
        latitude: 0,
        longitude: 0,
      },
      businessStatement: "",
      amazonSellerId: "",
      socialMediaHandle: "",
      supplierDocument: null,
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
    form.setValue('shopLocation.latitude', lat);
    form.setValue('shopLocation.longitude', lng);
  }

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Business Information Form</h1>
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
    case "businessName":
      return "Enter the name of your business.";
    case "ownerName":
      return "Enter the name of the business owner.";
    case "email":
      return "Enter a valid email address for communication.";
    case "phoneNumber":
      return "Enter your contact number.";
    case "city":
      return "Enter the city where your business is located.";
    case "shopLocation":
      return "Select your shop location on the map.";
    case "businessStatement":
      return "Provide a brief statement about your business.";
    case "amazonSellerId":
      return "Enter your Amazon Seller ID (optional).";
    case "socialMediaHandle":
      return "Enter your social media handle (optional).";
    case "supplierDocument":
      return "Upload relevant supplier documents (PDF, JPG, or PNG, max 5MB).";
    case "bankStatement":
      return "Upload your bank statement (PDF, JPG, or PNG, max 5MB).";
    default:
      return "";
  }
}

function renderFormControl(field: string, formField: any, handleLocationSelect: (lat: number, lng: number) => void) {
  switch (field) {
    case "businessName":
    case "ownerName":
    case "email":
    case "phoneNumber":
    case "city":
    case "amazonSellerId":
    case "socialMediaHandle":
      return <Input {...formField} />;
    case "businessStatement":
      return <Textarea {...formField} />;
    case "shopLocation":
      return (
        <div>
          <Input
            value={`${formField.value.latitude.toFixed(6)}, ${formField.value.longitude.toFixed(6)}`}
            readOnly
          />
          <MapSelector onLocationSelect={handleLocationSelect} />
        </div>
      );
    case "supplierDocument":
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
