import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/shared/ui/input/ui";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitted(true);
    // Here would be the actual API call
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
        <p className="text-on-surface-variant max-w-sm">
          Your message has been received. We will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Input
            name="firstName"
            label="First name"
            register={register}
            required
            error={errors.firstName}
          />
        </div>
        <div className="flex-1">
          <Input
            name="lastName"
            label="Last name"
            register={register}
            required
            error={errors.lastName}
          />
        </div>
      </div>

      <Input
        name="email"
        label="Email"
        type="email"
        register={register}
        required
        error={errors.email}
      />

      <Input
        name="subject"
        label="Subject"
        register={register}
        required
        error={errors.subject}
      />

      <div className="flex flex-col gap-1">
        <label className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline">
          Message
        </label>
        <textarea
          {...register("message", { required: true })}
          rows={5}
          placeholder=" "
          className={`input w-full resize-none p-5 ${
            errors.message ? "border-red-500" : ""
          }`}
        />
        {errors.message && (
          <span className="text-red-500 text-xs">{errors.message.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-full md:w-auto self-start rounded-full border border-primary/20 bg-primary/10 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary"
      >
        Send message
      </button>
    </form>
  );
};
