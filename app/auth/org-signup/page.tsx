"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrgSignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        orgName: "",
        email: "",
        password: "",
        confirmPassword: "",
        orgType: "Other", // Default to 'Other'
        ein: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.orgName) {
            newErrors.orgName = "Organization Name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (formData.orgType === "Non-profit" && !formData.ein) {
            newErrors.ein = "EIN is required for Non-profits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Connect to API
            // Mock signup for now
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Store token (mock)
            localStorage.setItem("auth_token", "mock_org_token_123");

            router.push("/home");
        } catch {
            setErrors({ submit: "An error occurred. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
                        <span className="text-white font-bold text-2xl">O</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Create Organization Account
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Register your organization to start recruiting volunteers
                    </p>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errors.submit && (
                                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                                    {errors.submit}
                                </div>
                            )}

                            <Input
                                label="Organization Name"
                                placeholder="Non-profit Name"
                                value={formData.orgName}
                                onChange={(e) =>
                                    setFormData({ ...formData, orgName: e.target.value })
                                }
                                error={errors.orgName}
                                required
                            />

                            <Input
                                label="Email"
                                type="email"
                                placeholder="contact@organization.org"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                error={errors.email}
                                required
                            />

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Organization Type
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    value={formData.orgType}
                                    onChange={(e) =>
                                        setFormData({ ...formData, orgType: e.target.value })
                                    }
                                >
                                    <option value="Other">Other</option>
                                    <option value="Non-profit">Non-profit</option>
                                </select>
                            </div>

                            {formData.orgType === "Non-profit" && (
                                <Input
                                    label="EIN (Employer Identification Number)"
                                    placeholder="12-3456789"
                                    value={formData.ein}
                                    onChange={(e) =>
                                        setFormData({ ...formData, ein: e.target.value })
                                    }
                                    error={errors.ein}
                                    required
                                />
                            )}

                            <Input
                                label="Password"
                                type="password"
                                placeholder="At least 8 characters"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                error={errors.password}
                                required
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                error={errors.confirmPassword}
                                required
                            />

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    required
                                />
                                <label
                                    htmlFor="terms"
                                    className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                                >
                                    I agree to the{" "}
                                    <Link
                                        href="/terms"
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Create Organization Account
                            </Button>
                        </form>

                        <div className="mt-6 text-center space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                >
                                    Sign in
                                </Link>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Looking to volunteer?{" "}
                                <Link
                                    href="/auth/signup"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                >
                                    Sign up as a User
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
