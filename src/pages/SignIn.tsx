import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/BackButton";
import { useAuthStore } from "@/store/useAuthStore";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

interface SignInForm {
  email: string;
  password: string;
}

function SignIn() {
  const { signIn, signInWithGoogle, loading, error, user } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignInForm>();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data: SignInForm) => {
    try {
      await signIn(data.email, data.password);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: "Invalid credentials",
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
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
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">{errors.password.message}</span>
                )}
              </div>
              {error && <span className="text-sm text-red-500">{error}</span>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <Button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={signInWithGoogle}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In with Google"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;
