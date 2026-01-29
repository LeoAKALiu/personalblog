import { resumeData } from "@/data/resume";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
       <div className="max-w-2xl w-full space-y-8 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">
          I am always open to discussing new opportunities, research collaborations, or tech innovations in the construction industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Contact Info Card */}
        <div className="bg-card border border-border p-8 rounded-2xl space-y-8 shadow-sm">
          <h3 className="text-xl font-bold text-card-foreground mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground/80">Email</p>
                <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-primary transition-colors">
                  {resumeData.personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground/80">Phone</p>
                <p>{resumeData.personalInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground/80">Location</p>
                <p>{resumeData.personalInfo.location}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground/80 mb-4">Connect with me</p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-accent rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-accent rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Simple Form Placeholder */}
        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-card-foreground mb-6">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
              <input type="text" id="name" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
              <input type="email" id="email" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
              <textarea id="message" rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50" placeholder="Hello..." />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-lg transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
