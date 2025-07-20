import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  languages = [
    { code: 'en', flag: 'assets/images/flags/english.png', name: 'English' },
    { code: 'np', flag: 'assets/images/flags/nepal_flag.png', name: 'Nepali' },
  ];
  constructor(
    public translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.initializeLanguage();
  }

  private initializeLanguage():void{
    const savedLanguage = localStorage.getItem('currentLang') || 'en';
    this.translate.use(savedLanguage);
  }

  changeLanguage(languageCode: string): void {
    this.translate.use(languageCode);
    localStorage.setItem('currentLang', languageCode); // Save to localStorage
    this.languageService.setLanguage(languageCode);
    console.log(`Language changed to: ${languageCode}`);
  }

  getAvailableLanguages() {
    return this.languages;
  }
}
