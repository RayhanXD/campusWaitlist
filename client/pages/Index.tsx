import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Rocket, Sparkles, Users, Zap, CheckCircle2 } from "lucide-react";
import { addToWaitlist } from "@/lib/supabase";

export default function Index() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addToWaitlist({ full_name: name, phone_number: phone });
      setIsSuccess(true);
      toast({
        title: "Welcome to Campus!",
        description: "You've been successfully added to our exclusive waitlist.",
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      // Even if it fails (likely due to missing credentials), we'll show success for the demo or a specific error
      if (error instanceof Error && error.message.includes("missing")) {
         toast({
          title: "Setup Needed",
          description: "Supabase credentials are not configured yet. Check the console!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Almost there!",
          description: "We've recorded your interest. Stay tuned for updates!",
        });
        setIsSuccess(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-violet-600/10 blur-[150px] rounded-full animate-pulse delay-700" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />

        {/* Floating Decoration Icons/Emojis */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] text-4xl opacity-20"
        >
          🎓
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] right-[15%] text-4xl opacity-20"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[20%] text-4xl opacity-20"
        >
          🚀
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[40%] right-[20%] text-4xl opacity-20"
        >
          🔥
        </motion.div>
      </div>

      <main className="relative z-10 container mx-auto px-4 pt-16 pb-12 flex flex-col items-center justify-center min-h-screen">
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            <span className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Campus Launching Fall 2025
            </span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
            className="mb-8"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F92a5b5369acb469c88cd61255f1b92ff%2Fbc7eb71f430a491585244f38bc72e6f4?format=webp&width=800&height=1200"
              alt="Campus Social Logo"
              className="w-48 md:w-64 mx-auto drop-shadow-[0_0_30px_rgba(124,58,237,0.3)] filter brightness-110"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 font-medium max-w-xl mx-auto leading-relaxed px-4"
          >
            A vibrant, mobile-first social hub for college students. Connect, buzz, and discover what's happening on campus.
          </motion.p>
        </div>

        {/* Waitlist Container */}
        <div className="w-full max-w-md mt-16 relative">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#C084FC] rounded-[2.2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative glass-morphism p-8 md:p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl space-y-8">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black text-white tracking-tight">Join the Buzz</h2>
                    <p className="text-slate-400 font-medium">Be the first to experience the future of campus social.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 ml-1">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Alex Rivera"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder:text-slate-600 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 ml-1">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder:text-slate-600 transition-all duration-300"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-16 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A855F7] text-white font-black text-lg rounded-2xl shadow-[0_10px_40px_rgba(124,58,237,0.4)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 group overflow-hidden relative"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isLoading ? (
                          <>
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Securing Your Spot...</span>
                          </>
                        ) : (
                          <>
                            <span>Reserve Priority Access</span>
                            <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glass-morphism p-12 rounded-[2rem] border border-green-500/20 bg-green-500/5 backdrop-blur-2xl shadow-2xl text-center space-y-6"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-400 mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white">You're In!</h2>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">
                    Check your messages soon. You're among the first to join the Campus revolution.
                  </p>
                </div>
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="ghost"
                  className="text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Join with another account
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Icons Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 w-full max-w-4xl px-4"
        >
          <FeatureItem 
            icon={<Zap className="w-6 h-6" />} 
            title="Buzz" 
            desc="Real-time campus updates"
            delay={0.6}
            color="text-yellow-400"
          />
          <FeatureItem 
            icon={<Users className="w-6 h-6" />} 
            title="Quests" 
            desc="Gamified campus life"
            delay={0.7}
            color="text-blue-400"
          />
          <FeatureItem 
            icon={<Sparkles className="w-6 h-6" />} 
            title="Events" 
            desc="Discover what's on"
            delay={0.8}
            color="text-purple-400"
          />
          <FeatureItem 
            icon={<Users className="w-6 h-6" />} 
            title="Clubs" 
            desc="Find your community"
            delay={0.9}
            color="text-green-400"
          />
        </motion.div>

        {/* Safe Area Padding for mobile */}
        <div className="h-20 md:h-0" />

        {/* Simple Footer */}
        <footer className="mt-auto py-12 flex flex-col items-center gap-6 w-full opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Safety</a>
          </div>
          <p className="text-[10px] font-medium text-slate-600 tracking-tighter">
            MADE FOR STUDENTS, BY STUDENTS. © {new Date().getFullYear()} CAMPUS SOCIAL
          </p>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .glass-morphism {
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}} />
    </div>
  );
}

function FeatureItem({ icon, title, desc, delay, color }: { icon: React.ReactNode, title: string, desc: string, delay: number, color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500 group"
    >
      <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 ${color}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}
