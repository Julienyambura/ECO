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
    // Redirect if not admin
    if (!authLoading && (!user || user.role !== "admin")) {
      toast.add({
        title: "Unauthorized",
        description: "You don't have permission to access this page.",
        // variant: "destructive",
      });
      router.push("/");
      return;
    }

    if (!authLoading && user?.role === "admin") {
      const fetchData = async () => {
        try {
          setIsLoading(true);

          // Fetch locations
          const locationsData = await locationService.getLocations();
          setLocations(locationsData);

          // Fetch contact submissions
          try {
            const submissionsData = await contactService.getSubmissions();
            setContactSubmissions(submissionsData);
          } catch (err) {
            console.error("Error fetching submissions:", err);
            // Don't fail the whole page if just submissions fail
          }
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
        // variant: "destructive",
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
        // variant: "destructive",
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
        // variant: "destructive",
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

                      <div className="space-y-2">
                        <Label htmlFor={`hours-${location.id}`}>Hours</Label>
                        <Input
                          id={`hours-${location.id}`}
                          value={editingLocation.hours}
                          onChange={(e) =>
                            setEditingLocation({
                              ...editingLocation,
                              hours: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`website-${location.id}`}>
                          Website (optional)
                        </Label>
                        <Input
                          id={`website-${location.id}`}
                          value={editingLocation.website || ""}
                          onChange={(e) =>
                            setEditingLocation({
                              ...editingLocation,
                              website: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button onClick={handleSaveLocation}>
                          <Save className="h-4 w-4 mr-1" /> Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Phone:</p>
                          <p className="text-sm">{location.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Hours:</p>
                          <p className="text-sm">{location.hours}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Accepted Items:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {location.acceptedItems.map((item, index) => (
                            <span
                              key={index}
                              className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {location.website && (
                        <div>
                          <p className="text-sm font-medium">Website:</p>
                          <a
                            href={location.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {location.website}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <h2 className="text-xl font-semibold mb-6">
            Contact Form Submissions
          </h2>

          {contactSubmissions.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    No contact form submissions yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {contactSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{submission.subject}</CardTitle>
                        <CardDescription>
                          From: {submission.name} ({submission.email})
                        </CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(submission.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{submission.message}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {submission.isHandled ? (
                      <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Handled
                      </span>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsHandled(submission.id)}
                      >
                        Mark as Handled
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
