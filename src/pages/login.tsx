import React from "react"
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/router'
import { useForm } from "@mantine/form";
import { login } from "@/services/api/auth";
import { setUser } from "@/redux/slices/user";
import { useAppDispatch } from "@/redux/hooks";
import { User } from "@/redux/types/user.types";
import AppLayout from "@/layouts/common/AppLayout"
import AuthLayout from "@/layouts/auth/AuthLayout";
import { useMutation } from "@tanstack/react-query";
import { LoginData } from "@/services/types/auth.types";
import LoginForm from "@/components/secondary/auth/LoginForm";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import AuthBackgroundLayout from "@/layouts/auth/AuthBackgroundLayout";

export interface InitialValuesType {
  email: string;
  password: string
}

export default function Login() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const initialValues: InitialValuesType = {
    email: '',
    password: ''
  }

  const form = useForm({
    initialValues,

    validate: {
      email: (value) => (
        !value ? 'Email is required' : null
      ),
      password: (value) => (
        !value ? 'Password is required' : null
      )
    },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginData) => login(data),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { message: string };

      form.setErrors({
        email: errorData.message || 'An error occurred'
      })
    },
    onSuccess: (res: User) => {
      dispatch(setUser(res))

      form.reset();
      toast.success('Login successful')

      const params = new URLSearchParams(window.location.search);

      if (params.has("redirect")) {
        const redirectUrl = params.get("redirect");

        if (redirectUrl) {
          setTimeout(() => {
            router.push(redirectUrl)
          }, 1500);
        } else {
          setTimeout(() => {
            router.push('/account');
          }, 1500);
        }
      } else {
        setTimeout(() => {
          router.push('/account');
        }, 1500);
      }
    },
  })

  const handleLogin = (values: InitialValuesType) => {
    const payload: LoginData = {
      email: values.email,
      password: values.password,
    }

    mutation.mutate(payload)
  }

  return (
    <AppLayout>
      <AuthBackgroundLayout>
        <AuthLayout>
          <SEOMetaTags title="Bookie | Login" />

          <LoginForm
            form={form}
            mutation={mutation}
            handleLogin={handleLogin}
          />
        </AuthLayout>
      </AuthBackgroundLayout>
    </AppLayout>
  )
}