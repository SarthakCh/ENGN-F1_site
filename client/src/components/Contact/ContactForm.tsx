import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const insertLeadSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),

  email: z.string().email("Please enter a valid email address"),

  company: z.string().min(1, "Company name is required"),

  // contactNo: z
  //   .string()
  //   .regex(
  //     /^\+?[1-9]\d{6,14}$/,
  //     "Please enter a valid international phone number"
  //   ),

  contactNo: z
    .string()
    .refine((val) => isValidPhoneNumber(val), {
      message: "Please enter a valid international phone number",
    })
    .refine(
      (val) => {
        if (!val) return false;
        // Check specifically for India (+91)
        if (val.startsWith("+91")) {
          const localPart = val.replace("+91", "");
          return /^[6-9]\d{9}$/.test(localPart); // 10 digits, starts with 6-9
        }
        return true; // other countries: just let react-phone-number-input validate
      },
      {
        message:
          "Indian phone numbers must be exactly 10 digits and start with 6-9",
      }
    ),

  modelInterest: z.string().min(1, "Please select a model of interest"),

  message: z
    .string()
    .max(500, "Message cannot exceed 500 characters")
    .optional(),
});

type InsertLead = z.infer<typeof insertLeadSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState(""); // keep phone country selection stable
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      contactNo: "",
      modelInterest: "",
      message: "",
    },
  });

  const submitLeadMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      setPhoneValue(""); // reset phone input
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertLead) => {
    setIsSubmitting(true);
    submitLeadMutation.mutate(data);
  };

  // Generate dynamic mailto link
  const mailtoLink = `mailto:engn2625@gmail.com?subject=Request for Demo – ENGN-F1&body=Hi ENGN-F1 Team,%0A%0AI would like to request a demo of your optimization platform. Here are my details:%0A%0A- Full Name: ${form.getValues(
    "fullName"
  )}%0A- Email: ${form.getValues("email")}%0A- Company: ${form.getValues(
    "company"
  )}%0A- Contact No.: ${phoneValue}%0A%0AMessage:%0A${form.getValues(
    "message"
  )}%0A%0ALooking forward to your response.%0A%0ABest regards,%0A${form.getValues(
    "fullName"
  )}`;

  return (
    <section>
      {/* Contact Form */}
      <motion.div
        className="bg-slate-800/50 rounded-xl p-8 border border-slate-700"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-12">Request a Demo</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="bg-slate-700 border-slate-600 focus:border-secondary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-slate-700 border-slate-600 focus:border-secondary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your company name"
                      className="bg-slate-700 border-slate-600 focus:border-secondary"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact No. */}
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact No.</FormLabel>
                  <FormControl>
                    <PhoneInput
                      international
                      defaultCountry="IN"
                      value={phoneValue || field.value}
                      onChange={(value) => {
                        setPhoneValue(value || "");
                        field.onChange(value);
                      }}
                      className="bg-slate-700 rounded-md px-3 text-white w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
                    control={form.control}
                    name="modelInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Optimization Model Interest</FormLabel>
                        <Input
                          placeholder="Tell us your interest"
                          className="bg-slate-700 border-slate-600 focus:border-secondary"
                          {...field}
                          value={field.value ?? ""}
                        />
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-700 border-slate-600 focus:border-secondary">
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="base">Base Model</SelectItem>
                            <SelectItem value="smart">Smart Model</SelectItem>
                            <SelectItem value="ultra">Ultra Model</SelectItem>
                            <SelectItem value="custom">
                              Custom Solution
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your optimization needs"
                      className="bg-slate-700 border-slate-600 focus:border-secondary resize-none"
                      rows={4}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 py-5 justify-center">
              {/* Submit via API */}
              {/* <Button
                type="submit"
                className="w-full sm:w-auto bg-secondary/60 hover:bg-secondary/90 py-3 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Demo"}
              </Button> */}

              {/* Open Mail Client */}
              <a
                href={mailtoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto bg-accent/60 hover:bg-accent/90 py-3 font-semibold">
                  {/* Send via Email */}
                  Request Demo
                </Button>
              </a>
            </div>
          </form>
        </Form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
