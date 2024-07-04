import React from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "@mantine/form";
import { setUser } from "@/redux/slices/user";
import { User } from "@/redux/types/user.types";
import { updateProfile } from "@/services/api/user";
import { useMutation } from "@tanstack/react-query";
import AccountLayout from "@/layouts/account/AccountLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UpdateProfileData } from "@/services/types/user.types";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import ProfileDetailsForm from "@/components/secondary/account/ProfileDetailsForm";

export interface InitialValuesType {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
}

export default function Account() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.value)

  const initialValues: InitialValuesType = {
    first_name: user?.firstName ?? '',
    last_name: user?.lastName ?? '',
    email: user?.email ?? '',
    phone_number: user?.phoneNumber ?? '',
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
      phone_number: (value) => (
        !value ? 'Phone number is required' : null
      )
    },
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data, user?.id as string),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { message: string };

      toast.error(errorData.message || 'Failed to update profile details')
    },
    onSuccess: (data: User) => {
      const updatedUser = {
        ...user,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      };

      dispatch(setUser(updatedUser as User));

      toast.success('Profile details updated')
    },
  })

  const handleSubmit = (values: InitialValuesType) => {
    const payload: UpdateProfileData = {
      firstName: values.first_name,
      lastName: values.last_name,
      phoneNumber: values.phone_number,
    }

    mutation.mutate(payload)
  }

  return (
    <AccountLayout>
      <SEOMetaTags title="Account | Personal Details" />

      <ProfileDetailsForm
        form={form}
        mutation={mutation}
        handleSubmit={handleSubmit}
      />
    </AccountLayout>
  )
}