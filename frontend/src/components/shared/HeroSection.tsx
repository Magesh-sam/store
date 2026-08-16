import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function HeroSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-primary/20">
			<div className="container px-4 md:px-6 mx-auto text-center">
				<div className="flex flex-col items-center justify-center space-y-4">
					<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
						Welcome to the Store
					</h1>
					<p className="max-w-175 text-muted-foreground md:text-xl">
						Discover our amazing curated collection. Browse new arrivals, add to
						cart, and check out seamlessly.
					</p>
					<div className="flex gap-4">
						<Link to="/products">
							<Button size="lg">
								Shop Now <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
