import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo.service';

type BookingFormControls = {
  fullName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  service: FormControl<string>;
  trainingPlace: FormControl<string>;
  message: FormControl<string>;
  privacyAccepted: FormControl<boolean>;
};

type BookingField = keyof BookingFormControls;

const BOOKING_IMAGE = 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=1100&q=80';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './booking.html'
})
export class BookingComponent implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly bookingImage = BOOKING_IMAGE;
  protected readonly submitted = signal(false);
  protected readonly services = [
    'Personal training in palestra',
    'Allenamento outdoor',
    'Sessione privata su appuntamento',
    'Collaborazione con palestra',
    'Piccolo gruppo',
    'Percorso forza, dimagrimento, postura o benessere'
  ];
  protected readonly consultationForm = new FormGroup<BookingFormControls>({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[+0-9\s().-]{7,}$/)]
    }),
    service: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    trainingPlace: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(600)] }),
    privacyAccepted: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] })
  });

  ngOnInit(): void {
    this.seo.updatePage({
      title: 'Prenota una consulenza | Fit Coach Pro',
      description: 'Invia una richiesta a Marco Vitali per personal training, outdoor, piccoli gruppi o collaborazioni con palestre.',
      path: '/prenota',
      image: BOOKING_IMAGE,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Prenota una consulenza Fit Coach Pro',
        url: 'https://fitcoachpro.example/prenota',
        mainEntity: {
          '@type': 'Person',
          name: 'Marco Vitali',
          jobTitle: 'Personal trainer'
        }
      }
    });
  }

  protected submit(): void {
    this.submitted.set(false);

    if (this.consultationForm.invalid) {
      this.consultationForm.markAllAsTouched();
      return;
    }

    this.submitted.set(true);
    this.consultationForm.reset({
      fullName: '',
      email: '',
      phone: '',
      service: '',
      trainingPlace: '',
      message: '',
      privacyAccepted: false
    });
  }

  protected hasError(field: BookingField, error: string): boolean {
    const control = this.consultationForm.controls[field];
    return control.hasError(error) && (control.dirty || control.touched);
  }
}
