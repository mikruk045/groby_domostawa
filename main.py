##from flask import Flask
##
##
##app = Flask(__name__)
##
##@app.route('/')
##
##def index():
##    return "napis"
##
##if __name__ == '__main__':
##    app.run(debug=True)

import mysql.connector as MC
import pprint as PP

class Polaczenie:

    def __init__(self, nazwa, uzyt, haslo):
        self._conn = MC.Connect(
            password    = haslo,
            user        = uzyt,
            database    = nazwa,
            host        = '127.0.0.1',
            port        = 5432,
            charset     = 'utf8',
            use_unicode = True,
            )

    def dodaj(self, Nazwisko, Imie, Sektor, Kwatera, Rzad, Numer_Grobu):
        
        curs = self._conn.cursor()
        curs.execute('insert into Domostawa_cmentarz (Nazwisko, Imię, Sektor, Kwatera, Rząd, Numer_Grobu) values (%s, %s, %s, %s, %s, %s)',
                     (Nazwisko, Imie, Sektor, Kwatera, Rzad, Numer_Grobu)
                     )
        self._conn.commit()
        #return None

    def zrobione(self, ident):
        curs = self._conn.cursor()
        
        self._conn.commit()
        #return None

    def usun(self):
        ident = int(input("podaj ID rekordu do usunięcia: "))
        curs = self._conn.cursor()
        curs.execute('delete from Domostawa_cmentarz where ID = %d', ident)
        self._conn.commit()
        return None

    def pokaz(self):
        curs = self._conn.cursor()
        curs.execute('select * from Domostawa_cmentarz')
        return list(curs.fetchall())
        #return lista wszystkich plikow

def test_usun():
    p = Polaczenie('karoc', 'karoc', 'karoc')
    p.usun()
    
def test_dodaj():
    nazw = input("Nazwisko: ")
    im = input("Imie: ")
    sek = input("Sektor: ")
    kwa = input("Kwatera: ")
    rzad = input("Rząd: ")
    nr_gr = input("Numer Grobu: ")
    p = Polaczenie('karoc', 'karoc', 'karoc')
    p.dodaj(nazw, im, sek, kwa, rzad, nr_gr)

def test_pokaz():
    p = Polaczenie('karoc', 'karoc', 'karoc')
    PP.pprint(p.pokaz())
    

def piszemy():
    co_robimy = input("'w' - wpisz rekord, 'u' - usun rekord, 'p' - pokaz dane, 'k' - zakoncz program: " )
    while(co_robimy != 'k'):
        if(co_robimy == 'w'):
            test_dodaj()
            co_robimy = input("'w' - wpisz rekord, 'u' - usun rekord, 'p' - pokaz dane, 'k' - zakoncz program: " )
        elif(co_robimy == 'p'):
            test_pokaz()
            co_robimy = input("'w' - wpisz rekord, 'u' - usun rekord, 'p' - pokaz dane, 'k' - zakoncz program: " )
        elif(co_robimy == 'u'):
            test_usun()
            co_robimy = input("'w' - wpisz rekord, 'u' - usun rekord, 'p' - pokaz dane, 'k' - zakoncz program: " )
    
piszemy()
