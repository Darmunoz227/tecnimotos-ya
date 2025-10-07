import Header from "@/components/Header"
import Footer from "@/components/Footer"
import EmailTroubleshoot from "@/components/EmailTroubleshoot"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const EmailHelp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/dashboard" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Dashboard
              </Link>
            </Button>
          </div>
          
          <EmailTroubleshoot />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default EmailHelp