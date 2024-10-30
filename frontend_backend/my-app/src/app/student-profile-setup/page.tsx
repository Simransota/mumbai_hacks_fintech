"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, ChevronRight, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { Progress } from "../../components/ui/progress"
import { Textarea } from "../../components/ui/textarea"
import { cn } from "../utils/cn"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),

  // Educational Background
  reportCard: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .pdf, .jpg and .png formats are supported."
    ),
  certificate: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .pdf, .jpg and .png formats are supported."
    ),
  collegeName: z.string().min(1, "College name is required"),
  course: z.string().min(1, "Course is required"),
  internshipFile: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .pdf, .jpg and .png formats are supported."
    ),

  // Parental Information
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  parentsPanCard: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card number"),

  // Additional Comments
  additionalComments: z.string().optional(),
})

const formSections = [
  { title: "Personal Information", fields: ["fullName", "dateOfBirth", "email", "phoneNumber"] },
  { title: "Educational Background", fields: ["reportCard", "certificate", "collegeName", "course", "internshipFile"] },
  { title: "Parental Information", fields: ["fatherName", "motherName", "parentsPanCard"] },
  { title: "Additional Comments", fields: ["additionalComments"] },
]

export default function UpdatedStudentInfoForm() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: new Date(),
      email: "",
      phoneNumber: "",
      reportCard: null,
      certificate: null,
      collegeName: "",
      course: "",
      internshipFile: null,
      fatherName: "",
      motherName: "",
      parentsPanCard: "",
      additionalComments: "",
    },
  })

  const currentFields = formSections[step].fields

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      alert("Form submitted successfully!")
    }, 2000)
  }

  const progress = ((step + 1) / formSections.length) * 100

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Student Information Form</h1>
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
                    <FormLabel>{getFieldLabel(field)}</FormLabel>
                    <FormControl>
                      {renderFormControl(field, formField)}
                    </FormControl>
                    <FormDescription>
                      {getFieldDescription(field)}
                    </FormDescription>
                    <FormMessage />
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
  )
}

function getFieldLabel(field: string): string {
  return field.split(/(?=[A-Z])/).join(" ").replace(/^\w/, c => c.toUpperCase())
}

function getFieldDescription(field: string): string {
  switch (field) {
    case "fullName":
      return "Enter your full name as it appears on official documents."
    case "dateOfBirth":
      return "Select your date of birth."
    case "email":
      return "Enter a valid email address for communication."
    case "phoneNumber":
      return "Enter your contact number including country code."
    case "reportCard":
      return "Upload your latest report card (PDF, JPG, or PNG, max 5MB)."
    case "certificate":
      return "Upload any relevant certificates (PDF, JPG, or PNG, max 5MB)."
    case "collegeName":
      return "Enter the name of your current college or university."
    case "course":
      return "Specify your current course or program of study."
    case "fatherName":
      return "Enter your father's full name."
    case "motherName":
      return "Enter your mother's full name."
    case "parentsPanCard":
      return "Enter your parents' PAN card number (e.g., ABCDE1234F)."
    case "additionalComments":
      return "Provide any additional information or concerns regarding your education or financial status."
    default:
      return ""
  }
}

function renderFormControl(field: string, formField: any) {
  switch (field) {
    case "dateOfBirth":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !formField.value && "text-muted-foreground"
                )}
              >
                {formField.value ? (
                  formField.value.toLocaleDateString()
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formField.value}
              onSelect={formField.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </PopoverContent>
        </Popover>
      )
    case "reportCard":
    case "certificate":
    case "internshipFile":
      return (
        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            const file = e.target.files?.[0]
            formField.onChange(file)
          }}
        />
      )
    case "additionalComments":
      return <Textarea {...formField} />
    default:
      return <Input {...formField} />
  }
}
