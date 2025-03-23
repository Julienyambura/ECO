import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

export const metadata = {
  title: "Recycling Guide | ECO GLASS",
  description: "Learn what glass items can be recycled and how to prepare them",
};

export default function GuidePage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Glass Recycling Guide</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          Learn what glass items can be recycled, how to prepare them, and best
          practices for glass recycling.
        </p>
      </div>

      <Tabs defaultValue="accepted" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accepted">Accepted Items</TabsTrigger>
          <TabsTrigger value="not-accepted">Not Accepted</TabsTrigger>
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
        </TabsList>

        <TabsContent value="accepted" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {acceptedItems.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square relative mb-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=${item.title}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="not-accepted" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notAcceptedItems.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <X className="h-5 w-5 text-red-600 mr-2" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square relative mb-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=${item.title}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  {item.alternative && (
                    <p className="text-sm text-green-600 mt-2">
                      Alternative: {item.alternative}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preparation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Prepare Glass for Recycling</CardTitle>
              <CardDescription>
                Follow these steps to properly prepare your glass items for
                recycling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                    1
                  </div>
                  <div>
                    <strong>Empty and rinse</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Remove all contents and rinse the glass container with
                      water to remove food residue, liquids, or other contents.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                    2
                  </div>
                  <div>
                    <strong>Remove lids and caps</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Take off metal or plastic lids and caps. These can often
                      be recycled separately in appropriate bins.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                    3
                  </div>
                  <div>
                    <strong>Remove labels (optional)</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      While not always necessary, removing paper labels can
                      improve the recycling process.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                    4
                  </div>
                  <div>
                    <strong>Sort by color (if required)</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Some recycling centers require glass to be sorted by color
                      (clear, green, brown). Check your local requirements.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                    5
                  </div>
                  <div>
                    <strong>Handle with care</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Avoid breaking glass before recycling. Broken glass can be
                      dangerous to handle and may contaminate other recyclables.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const acceptedItems = [
  {
    title: "Glass Bottles",
    description:
      "All colors of glass bottles including wine, beer, soda, and juice bottles.",
  },
  {
    title: "Glass Jars",
    description:
      "Food jars such as pasta sauce, pickles, jams, and baby food jars.",
  },
  {
    title: "Glass Containers",
    description: "Food storage containers and other glass packaging.",
  },
  {
    title: "Clear Glass",
    description:
      "Clear glass items like some drinking glasses and food containers.",
  },
  {
    title: "Green Glass",
    description:
      "Green-tinted bottles and jars, often used for wine and some beverages.",
  },
  {
    title: "Brown Glass",
    description:
      "Brown or amber glass, commonly used for beer bottles and some medicine containers.",
  },
];

const notAcceptedItems = [
  {
    title: "Window Glass",
    description:
      "Window panes, glass sheets, and mirrors cannot be recycled with container glass.",
    alternative:
      "Contact specialized glass recyclers or construction waste facilities.",
  },
  {
    title: "Ceramics",
    description:
      "Plates, mugs, pottery, and other ceramic items are not recyclable with glass.",
    alternative:
      "Donate usable items to thrift stores or dispose in regular trash.",
  },
  {
    title: "Light Bulbs",
    description:
      "Incandescent, LED, and fluorescent bulbs require special handling.",
    alternative: "Many hardware stores offer light bulb recycling programs.",
  },
  {
    title: "Drinking Glasses",
    description:
      "Crystal, heat-resistant glass like Pyrex, and drinking glasses have different melting points.",
    alternative: "Donate usable items or dispose in regular trash.",
  },
  {
    title: "Ovenware",
    description:
      "Pyrex and other heat-resistant glass cookware cannot be recycled with container glass.",
    alternative: "Donate usable items or dispose in regular trash.",
  },
  {
    title: "Glass with Lead",
    description:
      "Leaded glass, crystal, and some decorative items contain lead and cannot be recycled.",
    alternative: "Dispose as hazardous waste or contact specialized recyclers.",
  },
];
