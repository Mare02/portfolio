# Popraviti kontakt formu i slanje mejla

Status: otvoreno

## Problem

Slanje kontakt forme na Vercel preview deploymentu ne radi. `POST /api/sendEmail` vraća HTTP 502, a forma prikazuje poruku „Your contact form has not been sent.“

Tačan uzrok neuspeha Mailgun poziva još nije utvrđen. Lokalna provera sa simuliranim odgovorima Mailguna prolazi, ali stvarna isporuka mejla nije potvrđena. Direktan pristup Mailgunu iz razvojnog okruženja blokirala je mrežna politika.

Dodato je serversko logovanje Mailgun `status`, `message` i `details`, uz maskiranje API ključa. Za dalju dijagnostiku ponoviti slanje na deploymentu sa tom izmenom i pregledati Vercel log.

## Šta treba uraditi

- Utvrditi konkretan uzrok greške iz Mailgun odgovora, pa popraviti kod ili konfiguraciju.
- Proveriti `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_SENDER` i `MAILGUN_EMAIL_TO` u odgovarajućem Vercel okruženju.
- Proveriti US/EU region i `MAILGUN_API_URL`. Ako se koristi sandbox domen, proveriti da je primalac potvrđen u Mailgunu.
- Proveriti tok forme: validaciju, stanje tokom slanja, prikaz uspeha i greške, kao i ponovno slanje bez gubitka unetih podataka.
- Testirati stvarni kontakt zahtev i potvrditi prijem mejla, sadržaj poruke i ispravan `Reply-To`.

## Kriterijumi prihvatanja

- Validna forma uspešno šalje mejl i potvrđen je prijem kod konfigurisanog primaoca.
- UI prikazuje uspeh tek nakon uspešnog odgovora Mailguna; neuspeh omogućava ponovni pokušaj.
- Nevalidni i preveliki zahtevi ne pokreću slanje.
- API ključ ostaje na serveru i ne pojavljuje se u odgovorima ili logovima; korisnički sadržaj u HTML mejlu ostaje escapovan.
- Tok je proveren za oba jezika, na mobilnom i desktop prikazu.
- Izmena je pushovana na `feat/nextjs-rewrite` i proverena na Vercel deploymentu.

## Relevantni fajlovi

- `app/api/sendEmail/route.ts`
- `components/site/ContactForm.tsx`
- `lib/contact.ts`
- `.env.example`
