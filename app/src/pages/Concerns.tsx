import AIChatbot from '@/components/AIChatbot';
import DashboardLayout from '@/components/DashboardLayout';

export default function ConcernsPage() {
  return (
    <DashboardLayout activeTab="Concerns (AI)">
      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-display text-[#2D1B14]">AI Assistant & Concerns</h2>
          <p className="text-muted-foreground">Ask our AI about food safety, platform usage, or any other concerns.</p>
        </div>
        
        <div className="flex-1 bg-white rounded-3xl border border-[#F3F1E8] shadow-sm overflow-hidden flex flex-col relative">
          {/* We reuse the AIChatbot component but we'll modify it slightly or just let it float. 
              Actually, let's make a dedicated full-page chat experience. */}
          <div className="absolute inset-0 p-4">
             {/* In a real app, I'd pass a prop to AIChatbot to make it inline. 
                 For now, I'll just put a message telling the user to use the bubble, 
                 or better, I'll update AIChatbot to support inline mode. */}
             <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-[#EE762B]/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-[#2D1B14] mb-2">Our AI is ready to help!</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Click the floating chat bubble in the bottom right corner to start a conversation with the Ann Setu AI Assistant.
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="p-4 bg-[#FAF9F4] rounded-2xl border border-[#F3F1E8] text-sm font-medium">"How do I donate?"</div>
                  <div className="p-4 bg-[#FAF9F4] rounded-2xl border border-[#F3F1E8] text-sm font-medium">"Is the food safe?"</div>
                  <div className="p-4 bg-[#FAF9F4] rounded-2xl border border-[#F3F1E8] text-sm font-medium">"How to join NGO?"</div>
                  <div className="p-4 bg-[#FAF9F4] rounded-2xl border border-[#F3F1E8] text-sm font-medium">"Tracking deliveries"</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
