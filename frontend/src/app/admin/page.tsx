"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Trash,
  Plus,
  Save,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { locationService } from "@/services/locations";
import { contactService } from "@/services/contact";
import type { RecyclingLocation, ContactSubmission } from "@/types";

export default function AdminPage() {
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [locations, setLocations] = useState<RecyclingLocation[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<
    ContactSubmission[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingLocation, setEditingLocation] =
    useState<RecyclingLocation | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== "admin") {
        toast.add({
          title: "Unauthorized",
          description: "You don't have permission to access this page.",
        });
        router.push("/");
        return;
      }

      const fetchData = async () => {
        try {
          setIsLoading(true);

          // Fetch locations
          const locationsData = await locationService.getLocations();
          setLocations(locationsData);

          // Fetch contact submissions
          const submissionsData = await contactService.getSubmissions();
          setContactSubmissions(submissionsData);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to load data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [authLoading, user, router, toast]);

  const handleDeleteLocation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this location?")) {
      return;
    }

    try {
      await locationService.deleteLocation(id);

      // Update local state
      setLocations((prev) => prev.filter((location) => location.id !== id));

      toast.add({
        title: "Location deleted",
        description: "The recycling location has been removed.",
      });
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.add({
        title: "Error",
        description: "Failed to delete the location. Please try again.",
      });
    }
  };

  const handleEditLocation = (location: RecyclingLocation) => {
    setEditingLocation({ ...location });
  };

  const handleSaveLocation = async () => {
    if (!editingLocation) return;

    try {
      const updatedLocation = await locationService.updateLocation(
        editingLocation.id,
        editingLocation
      );

      // Update local state
      setLocations((prev) =>
        prev.map((loc) =>
          loc.id === updatedLocation.id ? updatedLocation : loc
        )
      );

      setEditingLocation(null);

      toast.add({
        title: "Location updated",
        description: "The recycling location has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating location:", error);
      toast.add({
        title: "Error",
        description: "Failed to update the location. Please try again.",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingLocation(null);
  };

  const handleMarkAsHandled = async (id: string) => {
    try {
      await contactService.markAsHandled(id);

      // Update local state
      setContactSubmissions((prev) =>
        prev.map((submission) =>
          submission.id === id ? { ...submission, isHandled: true } : submission
        )
      );

      toast.add({
        title: "Submission updated",
        description: "The contact submission has been marked as handled.",
      });
    } catch (error) {
      console.error("Error updating submission:", error);
      toast.add({
        title: "Error",
        description:
          "Failed to mark the submission as handled. Please try again.",
      });
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-lg font-medium text-red-800 dark:text-red-200">
            Error
          </h2>
          <p className="mt-2 text-red-700 dark:text-red-300">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage recycling locations and view contact form submissions.
        </p>
      </div>

      <Tabs defaultValue="locations">
        <TabsList>
          <TabsTrigger value="locations">Recycling Locations</TabsTrigger>
          <TabsTrigger value="contact">Contact Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Manage Recycling Locations
            </h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Location
            </Button>
          </div>

          <div className="grid gap-6">
            {locations.map((location) => (
              <Card key={location.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{location.name}</CardTitle>
                      <CardDescription>
                        {location.address}, {location.city}, {location.state}{" "}
                        {location.zip}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditLocation(location)}
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteLocation(location.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingLocation && editingLocation.id === location.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`name-${location.id}`}>Name</Label>
                          <Input
                            id={`name-${location.id}`}
                            value={editingLocation.name}
                            onChange={(e) =>
                              setEditingLocation({
                                ...editingLocation,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`phone-${location.id}`}>Phone</Label>
                          <Input
                            id={`phone-${location.id}`}
                            value={editingLocation.phone}
                            onChange={(e) =>
                              setEditingLocation({
                                ...editingLocation,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`address-${location.id}`}>
                          Address
                        </Label>
                        <Input
                          id={`address-${location.id}`}
                          value={editingLocation.address}
                          onChange={(e) =>
                            setEditingLocation({
                              ...editingLocation,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`city-${location.id}`}>City</Label>
                          <Input
                            id={`city-${location.id}`}
                            value={editingLocation.city}
                            onChange={(e) =>
                              setEditingLocation({
                                ...editingLocation,
                                city: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`state-${location.id}`}>State</Label>
                          <Input
                            id={`state-${location.id}`}
                            value={editingLocation.state}
                            onChange={(e) =>
                              setEditingLocation({
                                ...editingLocation,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`zip-${location.id}`}>ZIP</Label>
                          <Input
                            id={`zip-${location.id}`}
                            value={editingLocation.zip}
                            onChange={(e) =>
                              setEditingLocation({
                                ...editingLocation,
                                zip: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>{location.address}</p>
                      <p>{location.city}</p>
                      <p>{location.state}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {editingLocation && editingLocation.id === location.id ? (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleSaveLocation}
                        className="flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" /> Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="flex items-center"
                      >
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </Button>
                    </div>
                  ) : null}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <h2 className="text-xl font-semibold mb-6">
            Contact Form Submissions
          </h2>
          {contactSubmissions.map((submission) => (
            <Card key={submission.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{submission.name}</CardTitle>
                    <CardDescription>{submission.email}</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsHandled(submission.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Mark as Handled
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>{submission.message}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
