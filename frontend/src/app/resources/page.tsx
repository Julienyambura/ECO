import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FileText, Video, BarChart } from "lucide-react";

export const metadata = {
  title: "Educational Resources | ECO GLASS",
  description:
    "Learn about the environmental impact of glass recycling and sustainable practices",
};

export default function ResourcesPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Educational Resources</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          Explore our collection of articles, videos, and statistics about glass
          recycling and its environmental impact.
        </p>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-muted-foreground">
                      {article.category}
                    </span>
                  </div>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={article.link}>
                      Read Article
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-muted-foreground">
                      {video.duration}
                    </span>
                  </div>
                  <CardTitle>{video.title}</CardTitle>
                  <CardDescription>{video.creator}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                    <Video className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {video.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={video.link}>
                      Watch Video
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BarChart className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle>Glass Recycling Statistics</CardTitle>
              <CardDescription>
                Key facts and figures about glass recycling and its
                environmental impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {statistics.map((stat, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Source: {stat.source}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const articles = [
  {
    category: "Environmental Impact",
    title: "The Lifecycle of Recycled Glass",
    description:
      "From bottle to bottle: How glass recycling creates a circular economy",
    excerpt:
      "Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity. This article explores the journey of a glass bottle from your recycling bin to becoming a new product.",
    link: "/resources/lifecycle-of-recycled-glass",
  },
  {
    category: "Industry Insights",
    title: "Innovations in Glass Recycling Technology",
    description: "New technologies making glass recycling more efficient",
    excerpt:
      "Recent advancements in optical sorting, crushing techniques, and contamination removal are revolutionizing the glass recycling industry, making it more cost-effective and environmentally friendly.",
    link: "/resources/innovations-in-glass-recycling",
  },
  {
    category: "Sustainability",
    title: "Why Glass is a Sustainable Packaging Choice",
    description: "The environmental benefits of choosing glass over plastic",
    excerpt:
      "Glass packaging offers numerous environmental advantages over alternatives like plastic. This article examines why glass is considered one of the most sustainable packaging materials available today.",
    link: "/resources/glass-sustainable-packaging",
  },
  {
    category: "Community Impact",
    title: "How Community Glass Recycling Programs Succeed",
    description: "Case studies of successful local initiatives",
    excerpt:
      "Learn about communities that have implemented successful glass recycling programs and the positive environmental and economic impacts they've experienced.",
    link: "/resources/community-recycling-success",
  },
  {
    category: "Policy & Regulation",
    title: "Glass Recycling Policies Around the World",
    description: "How different countries approach glass recycling",
    excerpt:
      "This comparative analysis looks at how various countries incentivize and regulate glass recycling, from deposit return schemes to extended producer responsibility programs.",
    link: "/resources/global-recycling-policies",
  },
  {
    category: "Consumer Guide",
    title: "Beyond Bottles: Unexpected Ways to Recycle Glass",
    description: "Creative approaches to glass waste reduction",
    excerpt:
      "Discover innovative ways to repurpose and recycle glass items beyond the typical bottles and jars, including art projects, home decor, and construction materials.",
    link: "/resources/creative-glass-recycling",
  },
];

const videos = [
  {
    title: "The Glass Recycling Process Explained",
    creator: "ECO GLASS",
    duration: "5:24",
    description:
      "A step-by-step visual explanation of how glass is collected, processed, and transformed into new products.",
    link: "/resources/videos/recycling-process",
  },
  {
    title: "Why Glass Recycling Matters",
    creator: "Environmental Education Channel",
    duration: "8:12",
    description:
      "An in-depth look at the environmental benefits of glass recycling compared to landfill disposal.",
    link: "/resources/videos/why-recycling-matters",
  },
  {
    title: "Inside a Modern Glass Recycling Facility",
    creator: "Industry Insights",
    duration: "12:45",
    description:
      "Tour a state-of-the-art glass recycling facility and see the advanced technology used to sort and process glass.",
    link: "/resources/videos/recycling-facility-tour",
  },
];

const statistics = [
  {
    value: "95%",
    description:
      "Glass can be recycled indefinitely without any loss in purity or quality, making it one of the most sustainable packaging materials.",
    source: "Glass Packaging Institute",
  },
  {
    value: "1 ton",
    description:
      "Recycling one ton of glass saves over 1,300 pounds of sand, 410 pounds of soda ash, and 380 pounds of limestone.",
    source: "EPA Waste Reduction Model",
  },
  {
    value: "40%",
    description:
      "The current glass recycling rate in the United States, which is significantly lower than many European countries that achieve rates of 70-90%.",
    source: "Container Recycling Institute, 2022",
  },
  {
    value: "30%",
    description:
      "Energy savings from using recycled glass instead of raw materials to manufacture new glass products.",
    source: "British Glass Manufacturers Confederation",
  },
  {
    value: "3 million tons",
    description:
      "Amount of glass that ends up in U.S. landfills annually, despite being 100% recyclable.",
    source: "Environmental Protection Agency, 2021",
  },
  {
    value: "1 billion",
    description:
      "Estimated number of glass bottles and jars recycled annually in the United States.",
    source: "Glass Recycling Coalition, 2022",
  },
];
