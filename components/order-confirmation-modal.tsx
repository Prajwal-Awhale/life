import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, Truck, Download } from "lucide-react"
import Link from "next/link"

interface OrderConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  plan: "digital" | "physical"
  cardId: string
}

export function OrderConfirmationModal({ isOpen, onClose, plan, cardId }: OrderConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            {plan === "physical" ? (
              <Truck className="h-6 w-6 text-green-600" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-600" />
            )}
          </div>
          <DialogTitle className="text-center text-xl">
            {plan === "physical" ? "Physical Card Ordered!" : "Health Card Created!"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {plan === "physical"
              ? "Your physical health card has been ordered and will be delivered within 5-7 business days."
              : "Your digital health card has been created successfully."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {plan === "physical" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Delivery Information</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">•</div>
                  <div>Your card will be delivered to the address you provided</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">•</div>
                  <div>You'll receive a tracking number via email once shipped</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">•</div>
                  <div>You can track your order from your dashboard</div>
                </li>
              </ul>
            </div>
          )}

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Digital Access</h4>
            <p className="text-sm text-green-700 mb-2">
              Your digital health card is ready to use. You can download it or access it from your dashboard anytime.
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Link href={`/card/${cardId}`} className="w-full">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Card
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700">Go to Dashboard</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
