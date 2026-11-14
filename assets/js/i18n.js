export const messages = {
  en: {
    targetDose: 'Target amount (mg)', targetDecrease: 'Decrease target amount', targetIncrease: 'Increase target amount', targetHelp: 'A mathematical setting, not a dose recommendation or proof of delivery.', shareHelp: 'Anyone with this link can see the pen and target: ', targetInvalid: 'Enter a positive amount in mg.', targetBoundary: 'The target must remain greater than zero.', linkInvalid: 'The settings link could not be restored; default settings are shown.',
    language: 'Language', title: 'Pen dose calculator', setup: 'Set up your calculation', pen: 'Pen type', doses: '4 fixed doses · 15 mg / 0.6 ml per dose', enter: 'Enter your amounts', add: 'Values in different fields are added together.', mg: 'Amount in mg', ml: 'Volume in ml', clicks: 'Clicks (assumed)', fortieths: 'Fortieths of 1 ml', help: 'Enter at least one positive amount. Decimal values may use a comma or point.', warning: 'About clicks: The 60-click relationship is an unverified assumption. The manufacturer advises against counting clicks to select a dose.', result: 'Your calculated total', equivalent: 'Mathematical equivalent', amount: 'AMOUNT', volume: 'VOLUME', resultWarning: 'This result includes the unverified 60-click assumption; the manufacturer advises against counting clicks to select a dose.', important: 'Important information', before: 'Before you go', context1: 'This is a mathematical conversion, not a dose recommendation or instructions for using a pen. A fractional result does not establish that the pen can deliver it. Follow your prescribed dose and consult your doctor or pharmacist about use.', context2: 'After the four fixed doses, do not use any remaining medicine. Check the information supplied with your own product and read the ', leaflet: 'manufacturer’s patient leaflet', disclaimer: 'Not intended for medical purposes.', decrease: 'Decrease', increase: 'Increase', precision: 'Amount is too small to display at the available precision.', positive: 'Enter at least one positive amount.', limit: 'The total exceeds one labelled dose of 15 mg (0.6 ml).', adjustment: 'Invalid adjustment.'
  },
  pl: {
    targetDose: 'Zamierzona dawka (mg)', targetDecrease: 'Zmniejsz zamierzoną dawkę', targetIncrease: 'Zwiększ zamierzoną dawkę', targetHelp: 'To ustawienie matematyczne, nie zalecenie dawki ani potwierdzenie możliwości jej podania.', shareHelp: 'Każdy, kto otrzyma ten link, może zobaczyć rodzaj pena i zamierzoną dawkę: ', targetInvalid: 'Wprowadź dodatnią wartość w mg.', targetBoundary: 'Zamierzona dawka musi być większa od zera.', linkInvalid: 'Nie udało się odtworzyć ustawień z linku; wyświetlono ustawienia domyślne.',
    language: 'Język', title: 'Kalkulator dawki z pena', setup: 'Przygotuj obliczenie', pen: 'Rodzaj pena', doses: '4 stałe dawki · 15 mg / 0,6 ml na dawkę', enter: 'Wprowadź ilości', add: 'Wartości z poszczególnych pól są sumowane.', mg: 'Ilość w mg', ml: 'Objętość w ml', clicks: 'Kliknięcia (założenie)', fortieths: 'Czterdzieste części 1 ml', help: 'Wprowadź co najmniej jedną dodatnią wartość. W liczbach dziesiętnych możesz użyć przecinka lub kropki.', warning: 'O kliknięciach: Zależność oparta na 60 kliknięciach jest niepotwierdzonym założeniem. Producent odradza liczenie kliknięć w celu wybrania dawki.', result: 'Obliczona suma', equivalent: 'Równowartość matematyczna', amount: 'ILOŚĆ', volume: 'OBJĘTOŚĆ', resultWarning: 'Ten wynik uwzględnia niepotwierdzone założenie o 60 kliknięciach; producent odradza liczenie kliknięć w celu wybrania dawki.', important: 'Ważne informacje', before: 'Zanim przejdziesz dalej', context1: 'To przeliczenie matematyczne, a nie zalecenie dotyczące dawki ani instrukcja użycia pena. Wynik ułamkowy nie oznacza, że pen może podać taką ilość. Stosuj przepisaną dawkę i skonsultuj sposób użycia z lekarzem lub farmaceutą.', context2: 'Po podaniu czterech stałych dawek nie używaj pozostałego leku. Sprawdź informacje dołączone do swojego produktu i przeczytaj ', leaflet: 'ulotkę producenta dla pacjenta (po angielsku)', disclaimer: 'Nie jest przeznaczone do celów medycznych.', decrease: 'Zmniejsz', increase: 'Zwiększ', precision: 'Ilość jest zbyt mała, aby wyświetlić ją z dostępną dokładnością.', positive: 'Wprowadź co najmniej jedną dodatnią wartość.', limit: 'Suma przekracza jedną dawkę podaną na etykiecie: 15 mg (0,6 ml).', adjustment: 'Nieprawidłowa zmiana wartości.'
  }
};
export function chooseLanguage(languages, fallback) {
  const candidates = Array.isArray(languages) && languages.length ? languages : [fallback];
  for (const tag of candidates) {
    if (typeof tag !== 'string' || !/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(tag)) continue;
    const base = tag.split('-')[0].toLowerCase();
    if (base === 'en' || base === 'pl') return base;
  }
  return 'en';
}
export function initialLanguage(storage, languages, fallback) {
  try { const saved = storage?.getItem('penculator-language'); if (saved === 'en' || saved === 'pl') return saved; } catch {}
  return chooseLanguage(languages, fallback);
}
export function saveLanguage(storage, language) {
  try { storage?.setItem('penculator-language', language); } catch {}
}
export function translate(language, key) {
  const value = messages[language]?.[key];
  if (value === undefined) throw new Error(`Missing translation: ${language}.${key}`);
  return value;
}
export function errorMessage(language, problem) {
  if (problem.code === 'invalid') {
    const field = problem.field;
    if (language === 'en') return problem.message;
    const names = { mg: 'mg', ml: 'ml', clicks: 'kliknięć', fortieths: 'czterdziestych części 1 ml' };
    return `Wprowadź nieujemną wartość ${names[field]}${field === 'clicks' || field === 'fortieths' ? ' jako liczbę całkowitą' : ''}.`;
  }
  if (problem.code === 'limit' && problem.doseMg) return language === 'pl' ? `Suma przekracza jedną dawkę: ${problem.doseMg.replace('.', ',')} mg (${problem.doseMl.replace('.', ',')} ml).` : `The total exceeds one labelled dose: ${problem.doseMg} mg (${problem.doseMl} ml).`;
  if (problem.code === 'clickUnavailable') return language === 'pl' ? 'Przeliczanie kliknięć dla tego pena jest niedostępne.' : 'Click conversion is unavailable for this pen.';
  return problem.code ? translate(language, problem.code) : problem.message;
}
