import { createContext, useContext, useState } from 'react';
import { VotingSettingsType, defaultVotingSettings } from '../config';

interface VotingSettingsContextType {
  settings: VotingSettingsType;
  updateSettings: (param: VotingSettingsType) => void;
}

export const VotingSettingsContext = createContext<VotingSettingsContextType>({
  settings: defaultVotingSettings,
  updateSettings: () => {},
});

export function VotingSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState(defaultVotingSettings);

  const updateSettings = (newSettings: VotingSettingsType) => {
    setSettings(newSettings);
  };

  return (
    <VotingSettingsContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </VotingSettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(VotingSettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a ThemeProvider');
  }

  return context;
}
