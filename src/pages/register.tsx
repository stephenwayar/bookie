import React from "react"
import toast from "react-hot-toast";
import AppLayout from "@/layouts/common/AppLayout"
import AuthLayout from "@/layouts/auth/AuthLayout";
import { useRouter } from 'next/router'
import { useForm } from "@mantine/form";
import { register } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import AuthBackgroundLayout from "@/layouts/auth/AuthBackgroundLayout";
import { RegistrationData } from "@/services/types/auth.types";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import RegistrationForm from "@/components/secondary/auth/RegistrationForm";
import { AxiosError } from "axios";

export interface InitialValuesType {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string,
}

export default function Login() {
  const router = useRouter()

  const initialValues: InitialValuesType = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  }

  const form = useForm({
    initialValues,

    validate: {
      first_name: (value) => (
        !value ? 'First name is required' : null
      ),
      last_name: (value) => (
        !value ? 'Last name is required' : null
      ),
      email: (value) => (
        !value ? 'Email is required' : null
      ),
      phone_number: (value) => (
        !value ? 'Phone number is required' : null
      ),
      password: (value) => (
        !value ? 'Password is required' : null
      ),
    },
  });

  const mutation = useMutation({
    mutationFn: (data: RegistrationData) => register(data),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { message: string };

      form.setErrors({
        email: errorData.message
      })
    },
    onSuccess: () => {
      toast.success('Registration Successful! Proceed to login.')
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
  })

  const handleRegister = (values: InitialValuesType) => {
    const payload: RegistrationData = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      phoneNumber: values.phone_number,
      password: values.password,
    }

    mutation.mutate(payload)
  }

  return (
    <AppLayout>
      <AuthBackgroundLayout>
        <AuthLayout>
          <SEOMetaTags title="Bookie | Register" />

          <RegistrationForm
            form={form}
            mutation={mutation}
            handleRegister={handleRegister}
          />
        </AuthLayout>
      </AuthBackgroundLayout>
    </AppLayout>
  )
}