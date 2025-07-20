import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSource = new BehaviorSubject<string>(localStorage.getItem("currentLang") || 'en'); // Default to 'en'
  currentLanguage$ = this.languageSource.asObservable(); // Observable for components

  constructor() {}

  // Function to update the language
  setLanguage(lang: string) {
    localStorage.setItem("currentLang", lang);
    this.languageSource.next(lang); // Notify all subscribers
  }
}
