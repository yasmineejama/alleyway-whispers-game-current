import { Coins, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreditsSystemProps {
  credits: number;
  onPurchase?: (amount: number) => void;
}

export const CreditsSystem = ({ credits, onPurchase }: CreditsSystemProps) => {
  const purchaseOptions = [
    { credits: 10, price: "$4.99" },
    { credits: 25, price: "$9.99", bonus: "Best Value!" },
    { credits: 50, price: "$16.99", bonus: "Save 15%!" },
    { credits: 100, price: "$29.99", bonus: "Save 25%!" },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 otome-card px-4 py-2">
        <Coins className="h-5 w-5 text-accent" />
        <span className="font-semibold text-foreground">{credits}</span>
        <span className="text-sm text-muted-foreground">Credits</span>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Get Credits
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-gradient-romantic">
              Purchase Credits
            </DialogTitle>
            <DialogDescription>
              Credits unlock chapters in Broken Seals. You receive 5 free credits daily.
              <br />1 Credit = 1 Chapter
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 mt-4">
            {purchaseOptions.map((option) => (
              <Card key={option.credits} className="p-4 hover:shadow-[var(--shadow-romantic)] transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-accent" />
                      <span className="font-bold text-lg">{option.credits} Credits</span>
                    </div>
                    {option.bonus && (
                      <span className="text-sm text-primary font-medium">{option.bonus}</span>
                    )}
                  </div>
                  <Button
                    variant="romantic"
                    onClick={() => onPurchase?.(option.credits)}
                  >
                    {option.price}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Free credits refresh daily at midnight
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
