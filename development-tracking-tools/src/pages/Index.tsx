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
import { IntegratedProjectManager } from '@/components/IntegratedProjectManager';
import { CommunityCoachingTools } from '@/components/CommunityCoachingTools';
import { BusinessDevelopmentTracker } from '@/components/BusinessDevelopmentTracker';
import { TeamDashboards } from '@/components/TeamDashboards';
import { DTTRemote } from '@/components/DTTRemote';
import { FootballManagement } from '@/components/FootballManagement';
import { BurnoutTracking } from '@/components/BurnoutTracking';

export type ActiveView =
  | 'dashboard'
  | 'pdt'
  | 'cdt'
  | 'idt'
  | 'odt'
  | 'elective-leadership-suite'
  | 'innovation-tracker'
  | 'political-strategy'
  | 'campaign-tracker'
  | 'skill-development'
  | 'career-goals'
  | 'executive-class'
  | 'project-manager'
  | 'community-coaching'
  | 'business-development'
  | 'team-dashboards'
  | 'dtt-remote'
  | 'football-management'
  | 'burnout-tracking';

const Index = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'pdt':
        return <PersonalTracker onBack={() => setActiveView('dashboard')} />;
      case 'cdt':
        return (
          <CareerDevelopment
            onBack={() => setActiveView('dashboard')}
            onNavigate={(view) => setActiveView(view as ActiveView)}
          />
        );
      case 'innovation-tracker':
        return <InnovationTracker onBack={() => setActiveView('cdt')} />;
      case 'skill-development':
        return <SkillDevelopment onBack={() => setActiveView('cdt')} />;
      case 'career-goals':
        return <CareerGoals onBack={() => setActiveView('cdt')} />;
      case 'elective-leadership-suite':
        return (
          <ElectiveLeadershipSuite
            onBack={() => setActiveView('dashboard')}
            onNavigate={(view) => setActiveView(view as ActiveView)}
          />
        );
      case 'executive-class':
        return <ExecutiveClass onBack={() => setActiveView('dashboard')} />;
      case 'political-strategy':
        return <PoliticalStrategyDashboard onBack={() => setActiveView('elective-leadership-suite')} />;
      case 'campaign-tracker':
        return <CampaignTracker onBack={() => setActiveView('elective-leadership-suite')} />;
      case 'odt':
        return <OrganizationalTools onBack={() => setActiveView('dashboard')} />;
      case 'project-manager':
        return <IntegratedProjectManager onBack={() => setActiveView('dashboard')} />;
      case 'community-coaching':
        return <CommunityCoachingTools onBack={() => setActiveView('dashboard')} />;
      case 'business-development':
        return <BusinessDevelopmentTracker onBack={() => setActiveView('dashboard')} />;
      case 'team-dashboards':
        return <TeamDashboards onBack={() => setActiveView('odt')} />;
      case 'dtt-remote':
        return <DTTRemote onBack={() => setActiveView('odt')} />;
      case 'football-management':
        return <FootballManagement onBack={() => setActiveView('odt')} />;
      case 'burnout-tracking':
        return <BurnoutTracking onBack={() => setActiveView('odt')} />;
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
