import React, { useState } from 'react';
import { DTTDashboard } from '@/components/DTTDashboard';
import { PersonalTracker } from '@/components/PersonalTracker';
import { ElectiveLeadershipSuite } from '@/components/ElectiveLeadershipSuite';
import { CampaignTracker } from '@/components/CampaignTracker';
import { OrganizationalTools } from '@/components/OrganizationalTools';
import { CareerDevelopment } from '@/components/CareerDevelopment';
import { PoliticalStrategyDashboard } from '@/components/PoliticalStrategyDashboard';
import { InnovationTracker } from '@/components/InnovationTracker';
import { SkillDevelopment } from '@/components/SkillDevelopment';
import { CareerGoals } from '@/components/CareerGoals';
import { ExecutiveClass } from '@/components/ExecutiveClass';
import { AccessibilityPanel } from '@/components/AccessibilityPanel';

type ActiveView = 'dashboard' | 'pdt' | 'cdt' | 'idt' | 'odt' | 'elective-leadership-suite' | 'innovation-tracker' | 'political-strategy' | 'campaign-tracker' | 'skill-development' | 'career-goals' | 'executive-class';

const Index = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'pdt':
        return <PersonalTracker onBack={() => setActiveView('dashboard')} />;
      case 'cdt':
        return <CareerDevelopment onBack={() => setActiveView('dashboard')} onNavigate={(view) => setActiveView(view as ActiveView)} />;
      case 'innovation-tracker':
        return <InnovationTracker onBack={() => setActiveView('cdt')} />;
      case 'skill-development':
        return <SkillDevelopment onBack={() => setActiveView('cdt')} />;
      case 'career-goals':
        return <CareerGoals onBack={() => setActiveView('cdt')} />;
      case 'elective-leadership-suite':
        return <ElectiveLeadershipSuite onBack={() => setActiveView('dashboard')} onNavigate={(view) => setActiveView(view as ActiveView)} />;
      case 'executive-class':
        return <ExecutiveClass onBack={() => setActiveView('elective-leadership-suite')} />;
      case 'political-strategy':
        return <PoliticalStrategyDashboard onBack={() => setActiveView('dashboard')} />;
      case 'campaign-tracker':
        return <CampaignTracker onBack={() => setActiveView('elective-leadership-suite')} />;
      case 'odt':
        return <OrganizationalTools onBack={() => setActiveView('dashboard')} />;
      case 'dashboard':
      default:
        return <DTTDashboard onNavigate={(view) => setActiveView(view as ActiveView)} />;
    }
  };

  return (
    <>
      {renderActiveView()}
      <AccessibilityPanel />
    </>
  );
};

export default Index;
