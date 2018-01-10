function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Watch Settings</Text>}>
        <Toggle
          settingsKey="toggle"
          label="watch not updating?"
        />
  
              
        <TextInput
          settingsKey="url"
          label="REST api url"
          settingsKey="text"
        />

      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
