import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Marketing } from './components/Marketing';
import { Lead } from './types';

// Initial Mock Data
const initialLeads: Lead[] = [
    {
        "lead_id": "lead_001",
        "timestamp": "2026-02-14 10:30:00",
        "status": "new",
        "source": "website_form",
        "customer": {
            "name": "Jane Doe",
            "phone": "506-555-0199",
            "address": "123 Stock Farm Rd"
        },
        "project_details": {
            "type": "shingle_replace",
            "urgency": "high",
            "notes": "Leaking near chimney"
        }
    },
    {
        "lead_id": "lead_002",
        "timestamp": "2026-02-13 15:45:00",
        "status": "contacted",
        "source": "emergency_call_log",
        "customer": {
            "name": "Mike Ross",
            "phone": "506-555-0245",
            "address": "45 Gondola Point Rd"
        },
        "project_details": {
            "type": "repair",
            "urgency": "medium",
            "notes": "Missing shingles from wind storm"
        }
    }
];

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'marketing'>('home');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const handleLeadSubmit = (newLead: Lead) => {
    // Add the new lead to the top of the list
    setLeads(prev => [newLead, ...prev]);
  };

  if (view === 'marketing') {
    return <Marketing onBack={() => setView('home')} leads={leads} />;
  }

  return (
    <div className="min-h-screen bg-navy-900 text-white selection:bg-brand-teal selection:text-navy-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Projects />
        <Testimonials />
        <Contact onSubmit={handleLeadSubmit} />
      </main>
      <Footer onStaffClick={() => setView('marketing')} />
    </div>
  );
};

export default App;