import Link from "next/link";
import { ArrowRight, MapPin, Recycle, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                ECO GLASS
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Making glass recycling accessible and easy for everyone. Find
                drop-off locations, learn recycling best practices, and help
                save our planet.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/locations">
                  Find Recycling Locations{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/guide">Recycling Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Location Finder</CardTitle>
                <CardDescription>
                  Find the nearest glass recycling drop-off points in your area.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our interactive map shows all available recycling locations
                  with details on accepted materials and operating hours.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/locations">Find Locations</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Recycle className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Recycling Information</CardTitle>
                <CardDescription>
                  Learn what glass items can be recycled and how to prepare
                  them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get detailed guidelines on preparing different types of glass
                  for recycling and what items are accepted.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/guide">View Guide</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>
                  Discover the environmental impact of glass recycling.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Access articles, statistics, and information about the
                  benefits of glass recycling and its positive environmental
                  impact.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/resources">Explore Resources</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Impact
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              Together, we making a difference through glass recycling.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-green-600">95%</div>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                of glass can be recycled indefinitely without loss in quality
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-green-600">1 ton</div>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                of recycled glass saves 1,300 pounds of sand, 410 pounds of soda
                ash, and 380 pounds of limestone
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-green-600">30%</div>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                less energy is required to recycle glass compared to making it
                from raw materials
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
