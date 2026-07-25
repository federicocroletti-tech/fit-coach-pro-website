import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo.service';

interface TextCard {
  title: string;
  body: string;
}

interface Testimonial {
  quote: string;
  name: string;
  context: string;
}

const HERO_IMAGE = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80';
const COACH_IMAGE = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1100&q=80';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly heroImage = HERO_IMAGE;
  protected readonly coachImage = COACH_IMAGE;
  protected readonly services: readonly TextCard[] = [
    {
      title: 'Personal training in palestra',
      body: 'Sessioni tecniche su forza, composizione corporea, postura e progressione dei carichi.'
    },
    {
      title: 'Allenamenti outdoor',
      body: 'Workout all\'aperto per resistenza, mobilità, dimagrimento e benessere quotidiano.'
    },
    {
      title: 'Sessioni private su appuntamento',
      body: 'Percorsi riservati con valutazione iniziale, obiettivi misurabili e appuntamenti flessibili.'
    },
    {
      title: 'Collaborazioni con palestre',
      body: 'Supporto per sale pesi, studi privati e programmi di fidelizzazione per iscritti.'
    },
    {
      title: 'Piccoli gruppi',
      body: 'Classi compatte per allenarsi con energia condivisa senza perdere attenzione individuale.'
    },
    {
      title: 'Percorsi personalizzati',
      body: 'Piani per forza, dimagrimento, postura e benessere costruiti sul tuo livello reale.'
    }
  ];
  protected readonly methodSteps: readonly TextCard[] = [
    {
      title: 'Analisi iniziale',
      body: 'Obiettivi, abitudini, livello attuale, eventuali limitazioni e disponibilità settimanale.'
    },
    {
      title: 'Programma concreto',
      body: 'Schede chiare, progressioni sostenibili e parametri semplici da monitorare.'
    },
    {
      title: 'Tecnica e ritmo',
      body: 'Ogni seduta corregge esecuzione, carichi, recuperi e qualità del movimento.'
    },
    {
      title: 'Revisione periodica',
      body: 'Il percorso cambia quando cambiano risultati, energie, agenda e priorità.'
    }
  ];
  protected readonly testimonials: readonly Testimonial[] = [
    {
      quote: 'Ho ripreso ad allenarmi senza dolore e con una routine che riesco davvero a mantenere.',
      name: 'Laura M.',
      context: 'Postura e forza'
    },
    {
      quote: 'Il lavoro in piccoli gruppi è intenso ma preciso. Ogni esercizio ha un perché.',
      name: 'Davide R.',
      context: 'Outdoor training'
    },
    {
      quote: 'Marco ha trasformato una scheda generica in un percorso serio, misurabile e motivante.',
      name: 'Giulia P.',
      context: 'Dimagrimento'
    }
  ];
  protected readonly focusAreas = ['Forza', 'Dimagrimento', 'Postura', 'Benessere'];

  ngOnInit(): void {
    this.seo.updatePage({
      title: 'Fit Coach Pro | Personal Trainer Marco Vitali',
      description: 'Allenati meglio. Vivi più forte. Personal training in palestra, outdoor e privato con Marco Vitali.',
      path: '/',
      image: HERO_IMAGE,
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Marco Vitali',
          jobTitle: 'Personal trainer',
          image: COACH_IMAGE,
          url: 'https://fitcoachpro.example/',
          worksFor: {
            '@type': 'Organization',
            name: 'Fit Coach Pro',
            url: 'https://fitcoachpro.example/'
          },
          knowsAbout: ['Personal training', 'Allenamento forza', 'Dimagrimento', 'Postura', 'Outdoor training'],
          areaServed: 'Italia'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Fit Coach Pro',
          url: 'https://fitcoachpro.example/'
        }
      ]
    });
  }
}
