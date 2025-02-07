import { Fragment } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/BackButton"
import { useAuthStore } from "@/store/useAuthStore"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormData>();
  const { user, signUp } = useAuthStore();

  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    await signUp(data.name, data.email, data.password);
  };

  const password = watch("password");

  return (
    <Fragment>
      {user && <Navigate to="/" replace />}
      <div className="flex items-center justify-center min-h-screen relative">
        <BackButton />
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: "Name is required"
                    })}
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">{errors.password.message}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: value =>
                        value === password || "Passwords do not match"
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                  )}
                </div>
                <Button type="submit" className="w-full">Create Account</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  )
}

export default SignUp
