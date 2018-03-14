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
          label="REST api url defaults:http://127.0.0.1:17580/sgv.json"
          settingsKey="restURL"
        />

      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
