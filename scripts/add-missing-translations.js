
const fs = require('fs');
const path = require('path');


const LANGUAGES = [
  'en',
  'twi',
  'ga',
  'ewe',
  'frafra',
  'hausa',
  'dagbani',
  'french',
  'spanish',
  'arabic',
  'hindi',
  'russian',
  'fr'
];


function addMissingTranslations() {
  
  const englishPath = path.join(__dirname, '..', 'i18n', 'locales', 'en.json');
  const englishTranslations = JSON.parse(fs.readFileSync(englishPath, 'utf8'));

  console.log('Using English translations as baseline');

  LANGUAGES.forEach(lang => {
    if (lang === 'en') return; 

    const langFilePath = path.join(__dirname, '..', 'i18n', 'locales', `${lang}.json`);

 
    if (!fs.existsSync(langFilePath)) {
      console.log(`File not found: ${langFilePath}`);
      return;
    }

    let langTranslations;
    try {
      langTranslations = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
    } catch (e) {
      console.error(`Error reading ${lang} translations: ${e.message}`);
      return;
    }

    const updatedTranslations = addMissingKeys(englishTranslations, langTranslations);

  
    fs.writeFileSync(langFilePath, JSON.stringify(updatedTranslations, null, 2), 'utf8');
    console.log(`✓ Updated ${lang} translations`);
  });

  console.log('All language files updated successfully!');
}


function addMissingKeys(source, target, parentKey = '') {
  const result = { ...target };


  for (const key in source) {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;

   
    if (!(key in target)) {
      result[key] = typeof source[key] === 'object' && source[key] !== null
        ? { ...source[key] }  
        : source[key];      
      console.log(`Added missing key "${currentKey}" to target`);
    } 
 
    else if (
      typeof source[key] === 'object' && 
      source[key] !== null && 
      typeof target[key] === 'object' && 
      target[key] !== null
    ) {
      result[key] = addMissingKeys(source[key], target[key], currentKey);
    }

  }

  return result;
}


function addDoctorTranslations() {
  const doctorTranslations = {
    en: {
      title: "Expert Medical Guidance",
      description: "Receive personalized medical advice and consultations from experienced healthcare professionals. Get the care you need, when you need it.",
      getStarted: "Get Started",
      privacyPolicy: "Privacy Policy"
    },
    french: {
      title: "Conseil Médical Expert",
      description: "Recevez des conseils médicaux personnalisés et des consultations de professionnels de la santé expérimentés. Obtenez les soins dont vous avez besoin, quand vous en avez besoin.",
      getStarted: "Commencer",
      privacyPolicy: "Politique de Confidentialité"
    },
    spanish: {
      title: "Orientación Médica Experta",
      description: "Reciba asesoramiento médico personalizado y consultas de profesionales de la salud con experiencia. Obtenga la atención que necesita, cuando la necesita.",
      getStarted: "Comenzar",
      privacyPolicy: "Política de Privacidad"
    },
    arabic: {
      title: "إرشادات طبية متخصصة",
      description: "احصل على نصائح طبية مخصصة واستشارات من متخصصي رعاية صحية ذوي خبرة. احصل على الرعاية التي تحتاجها، عندما تحتاجها.",
      getStarted: "ابدأ الآن",
      privacyPolicy: "سياسة الخصوصية"
    },
    twi: {
      title: "Abenfo Nyansapɛ Akwankyerɛ",
      description: "Nya wo ankasa apɔmuden ho afotuo ne nsɛmmisa firi abenfo a wɔwɔ nimdeɛ. Nya ɔhwɛ a wohia, bere a wohia.",
      getStarted: "Hyɛ Ase",
      privacyPolicy: "Privacy Nhyehyɛe"
    },
    ga: {
      title: "Tsɔɔlɔ Nitsumɔ Kpakpa",
      description: "Nine bo he nitsumɔ kpakpa kɛ nilee nɛ ba nine kɛjɛ heloonuntsmɔ mli nilelɔ ni amɛyɔɔ niiashikwɛmɔ dɛŋ. Nine bo he kwɛmɔ ni ohia lɛ, beni ohia lɛ.",
      getStarted: "Hyɛ Shishi",
      privacyPolicy: "Teemɔŋ Saji Akpoo"
    },
    ewe: {
      title: "Dɔkta Ŋutɔwo Ƒe Kpɔkplɔkplɔ",
      description: "Xɔ dɔyɔla ŋutɔwo ƒe aɖaŋuɖoɖo kple kpekpeɖeŋu tso dɔyɔla kpekpeɖeŋunalawo gbɔ. Xɔ lãmesẽ si hiã wò, ne ehiã.",
      getStarted: "Dze Egɔme",
      privacyPolicy: "Ðokui ŋuti Kebiabia"
    },
    hausa: {
      title: "Jagora ta Likita Masani",
      description: "Karɓi shawarwarin likitoci na musamman da shawarwarin likitoci masu ƙwarewa. Sami kulawar da kuke buƙata, lokacin da kuke buƙata.",
      getStarted: "Fara",
      privacyPolicy: "Manufar Sirri"
    },
    frafra: {
      title: "Lɔgɛtiba la Sɔnrɛ Palɛsego",
      description: "Deŋɛ fʋn lɔgɛtiba la sɔnrɛ palɛsego la sɛ'ɛra zãan lanɛ fʋ bɔ. Deŋɛ fʋn sɔngɔ lanɛ fʋ bɔta la.",
      getStarted: "Pɔgebɔ",
      privacyPolicy: "Voovuum la Pugela"
    }
  };

  Object.entries(doctorTranslations).forEach(([lang, translations]) => {
    try {
      const filePath = path.join(__dirname, '..', 'i18n', 'locales', `${lang}.json`);

      if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
      }

      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (!content.doctor) {
        content.doctor = translations;
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
        console.log(`✓ Added doctor translations to ${lang}`);
      } else {
        console.log(`Doctor translations already exist for ${lang}`);
      }
    } catch (e) {
      console.error(`Error adding doctor translations for ${lang}: ${e.message}`);
    }
  });
}


console.log('Adding missing translations to language files...');
addMissingTranslations();
console.log('Adding doctor screen translations...');
addDoctorTranslations();
console.log('Done!');
