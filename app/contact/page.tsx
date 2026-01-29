import { resumeData } from "@/data/resume";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
       <div className="max-w-2xl w-full space-y-8 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Get in Touch</h1>
        <p className="text-slate-400 text-lg">
          I am always open to discussing new opportunities, research collaborations, or tech innovations in the construction industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Contact Info Card */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-8">
          <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-blue-400 transition-colors">
                  {resumeData.personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p>{resumeData.personalInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p>{resumeData.personalInfo.location}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-4">Connect with me</p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Simple Form Placeholder */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Name</label>
              <input type="text" id="name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
              <input type="email" id="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>
              <textarea id="message" rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Hello..." />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
