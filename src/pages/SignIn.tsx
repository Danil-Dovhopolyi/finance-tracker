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
import { useForm } from "react-hook-form"
import { BackButton } from "@/components/BackButton"
import { authApi, SignInCredentials } from '@/services/api';

function SignIn() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignInCredentials>();

  const onSubmit = async (data: SignInCredentials) => {
    try {
      const response = await authApi.signIn(data);
      console.log('Sign in successful:', response);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Sign in failed:', error);
      setError('root', {
        type: 'manual',
        message: 'Invalid credentials'
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <BackButton />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500">{errors.username.message}</span>
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
              <Button type="submit" className="w-full">Sign In</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignIn
