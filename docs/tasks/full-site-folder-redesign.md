# Potpuni redizajn sajta — folder sa fajlovima

Status: otvoreno

## Ideja

Redizajnirati ceo sajt tako da izgleda kao folder sa fajlovima ili papirima koje posetilac otvara, okreće i prelistava. Svaka stranica predstavlja jedan fajl ili list, a navigacija između stranica deluje kao prelazak na drugi papir u folderu.

Istražiti vizuelni pravac sa slojevima papira, jezičcima foldera, naslovima fajlova i animacijama okretanja ili zamene listova. Metafora treba da poveže ceo sajt, uz čitljiv sadržaj i jasnu navigaciju.

## Navigacija i istorija

- Klik na navigaciju otvara izabrani fajl uz odgovarajući prelaz između stranica.
- Browser history back vraća prethodno posećen fajl/papir, uz animaciju vraćanja lista.
- Browser history forward prikazuje sledeći fajl iz istorije, uz animaciju u suprotnom smeru.
- Smer animacije prati stvarno kretanje kroz istoriju poseta, a ne fiksni redosled stranica u meniju.
- Direktni linkovi, osvežavanje stranice i otvaranje u novom tabu rade normalno; trenutni fajl odgovara URL-u.

## Šta treba uraditi

- Razraditi vizuelni koncept i napraviti prototip prelistavanja između nekoliko stranica pre primene na ceo sajt.
- Osmisliti kompletan izgled početne stranice, projekata, detalja projekta, kontakt stranice, navigacije i zajedničkih elemenata.
- Definisati animacije otvaranja, okretanja i zatvaranja fajlova, ponašanje tokom brzih uzastopnih navigacija i prikaz učitavanja.
- Prilagoditi iskustvo mobilnim ekranima i proveriti da li prevlačenje prstom ima smisla kao dodatni način navigacije.
- Sačuvati postojeće podatke, tekstove, jezike, linkove i funkcionalnosti sajta.

## Kriterijumi prihvatanja

- Sve stranice koriste dosledan vizuelni koncept foldera i fajlova.
- Navigacija, browser back i browser forward prikazuju pravi sadržaj i očekivani smer prelaza, uključujući ponovljene posete istoj stranici.
- Brzi klikovi i prekid animacije ne ostavljaju pogrešan URL, sadržaj ili zaglavljen interfejs.
- Sajt ostaje čitljiv i upotrebljiv na mobilnom i desktop prikazu, u oba jezika i u svetloj i tamnoj temi.
- Navigacija radi tastaturom, fokus prelazi smisleno na novu stranicu, a `prefers-reduced-motion` omogućava korišćenje bez animacija prelistavanja.
- Direktni linkovi, istorija, SEO i postojeće funkcionalnosti rade i posle redizajna; animacije ne usporavaju primetno sajt.
