import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate()

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-4 top-4"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}
