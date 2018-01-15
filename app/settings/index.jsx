function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Watch Settings</Text>}>
        <Toggle
          settingsKey="refreshWatch"
          label="watch not updating?"
        />
        
       <Toggle
          settingsKey="dataType"
          label="[ mmol/l ] Or [ mg/dl ]"
        />
  
              
  
              
        <TextInput
          settingsKey="url"
          label="REST api url"
          settingsKey="restURL"
        />

      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
