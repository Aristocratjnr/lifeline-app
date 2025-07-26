
const fs = require('fs');
const path = require('path');
const glob = require('glob');


const SUPPORTED_LANGUAGES = [
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


function extractTranslationKeysFromScreens() {
  const screenFiles = glob.sync('app/screens/**/*.{tsx,jsx}', { cwd: path.resolve(__dirname, '..') });
  const tabFiles = glob.sync('app/(tabs)/**/*.{tsx,jsx}', { cwd: path.resolve(__dirname, '..') });
  const allFiles = [...screenFiles, ...tabFiles];

  console.log(`Found ${allFiles.length} screen files to analyze`);

 
  const allKeys = {};

  allFiles.forEach(file => {
    const content = fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');

  
    const matches = content.match(/t\(['"]([^'"]+)['"]\)/g) || [];

    matches.forEach(match => {
      const key = match.replace(/t\(['"]([^'"]+)['"]\)/, '$1');

     
      const [namespace, ...keyParts] = key.split('.');
      const actualKey = keyParts.join('.');

      if (namespace && actualKey) {
        if (!allKeys[namespace]) {
          allKeys[namespace] = {};
        }

        
        let current = allKeys[namespace];
        const nestedKeys = actualKey.split('.');

        for (let i = 0; i < nestedKeys.length; i++) {
          const k = nestedKeys[i];
          if (i === nestedKeys.length - 1) {
           
            if (!current[k]) {
              current[k] = '';
            }
          } else {
            
            if (!current[k]) {
              current[k] = {};
            }
            current = current[k];
          }
        }
      }
    });
  });

  return allKeys;
}


function mergeTranslations(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) target[key] = {};
      mergeTranslations(target[key], source[key]);
    } else if (target[key] === undefined) {
     
      target[key] = source[key];
    }
  }
  return target;
}

// 更新所有语言文件以包含所有翻译键
function updateTranslationFiles(allKeys) {
  SUPPORTED_LANGUAGES.forEach(lang => {
    const filePath = path.resolve(__dirname, '..', 'i18n', 'locales', `${lang}.json`);

    // 如果文件存在，读取并更新它
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const translations = JSON.parse(content);

        // 将新键与现有翻译合并
        const updatedTranslations = mergeTranslations(translations, allKeys);

        // 写回文件
        fs.writeFileSync(filePath, JSON.stringify(updatedTranslations, null, 2), 'utf8');
        console.log(`✅ Updated translations for ${lang}`);
      } catch (err) {
        console.error(`⚠️ Error updating translations for ${lang}:`, err);
      }
    } else {
      console.warn(`⚠️ Translation file for ${lang} does not exist`);
    }
  });
}

// 主函数
function main() {
  console.log('Extracting translation keys from screens...');
  const allKeys = extractTranslationKeysFromScreens();
  console.log('Found keys:', JSON.stringify(allKeys, null, 2));

  console.log('Updating translation files...');
  updateTranslationFiles(allKeys);

  console.log('Done! All translation files have been updated.');
}

main();
