from datetime import datetime
from flask import Flask, render_template, url_for, redirect, request, session, jsonify, flash
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json
import datetime

db = SQLAlchemy(session_options={'autocommit': True})

app = Flask(__name__)
app.config['SECRET_KEY'] = 'test'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
app.config['SQLALCHEMY_DATABASE_URI']= "postgresql://grobydomostawa:xsw23edc@matrix.umcs.pl:5432/grobydomostawa"

db.init_app(app)
db

def rows_as_dicts(cursor):
    col_names = [i[0] for i in cursor.description]
    return [dict(zip(col_names, row)) for row in cursor]


def WGS_json_from_db(columns, table, connection):
    get_geom = "ST_AsGeoJSON(ST_Transform(geom, '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', 4326)) as geom"
    dane = rows_as_dicts(connection.execute("""select {}, {} from {}""".format(columns, get_geom, table)).cursor)
    dane = json.dumps(dane)
    return dane


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/kontakt')
def kontakt():
    return render_template('kontakt.html')


@app.route('/cmentarz', methods=['GET', 'POST'])
def cmentarz():
    conn = db.session.connection()
    kwatery = rows_as_dicts(conn.execute(""" select * from kwatery """).cursor)
    zmarli = rows_as_dicts(conn.execute(""" 
    select zm.imie, zm.nazwisko, TO_CHAR(zm.data_urodzenia, 'DD.MM.YYYY') as data_urodzenia, TO_CHAR(zm.data_zgonu, 'DD.MM.YYYY') as data_zgonu, 
    miej.nazwa, kw.id_kwatera
    from zmarli zm

    inner join zmarli_kwatery kw on zm.id = kw.id_zmarly
    inner join kwatery k on kw.id_kwatera = k.id
    inner join administratorzy ad on zm.id_admin = ad.id_admin
    inner join miejscowosci miej on zm.id_miejscowosc = miej.id_miejscowosci;
    
     """).cursor)
    kwatery = json.dumps(kwatery)
    zmarli = json.dumps(zmarli) 
    data = [zmarli, WGS_json_from_db("*", "kwatery", conn)]
    return render_template('cmentarz.html', dane = data)


@app.route('/login', methods=['GET', 'POST'])
def login():
    komunikat = ""
    if request.method == 'POST':
        komunikat = "Login lub hasło jest niepoprawne."
        username = request.form['username']
        password = request.form['password']
        conn = db.session.connection()
        id_admina_get = rows_as_dicts(conn.execute(""" select id_admin from administratorzy where id_admin = '{}'""".format(username)).cursor)
        if(id_admina_get != []):
            id_admina = id_admina_get[0]
            if (username in id_admina.values()):
                haslo = rows_as_dicts(conn.execute(""" select haslo from administratorzy where id_admin = '{}'""".format(username)).cursor)[0]
                if (check_password_hash(haslo['haslo'], password)):
                    session['id_admin'] = id_admina_get[0]
                    session['imie_nazwisko'] = rows_as_dicts(conn.execute(""" select imie, nazwisko from administratorzy where id_admin = '{}' """.format(username)).cursor)[0]
                    return redirect(url_for('database'))
                else:
                    render_template('login.html', komunikat = komunikat)
        else:
            render_template('login.html', komunikat = komunikat) 
    return render_template('login.html', komunikat = komunikat)


@app.route('/record', methods=['GET', 'POST'])
def record():
    conn = db.session.connection()
    if ('id_admin' in session):
        if request.method == "POST":
            imie = request.form['imie']
            nazwisko = request.form['nazwisko']
            data_ur = request.form['data_urodzenia']
            data_zg = request.form['data_zgonu']
            przyczyna = request.form['przyczyna']
            miejscowosc = request.form['miejscowosc']
            nr_adres = request.form['nr_adresu']
            kwatera = request.form['kwatera']
            info_dodat = request.form['info_dodat']
        
            id_miejscowosci = rows_as_dicts(conn.execute(""" select id_miejscowosci from miejscowosci where nazwa = '{}' """.format(miejscowosc)).cursor)
            max_id = rows_as_dicts(conn.execute(""" select max(id) from zmarli """).cursor)
            max_id_2 = rows_as_dicts(conn.execute(""" select max(id) from zmarli_kwatery """).cursor)

            if data_ur == "":
                data_ur = "NULL"
                if data_zg == "":
                    data_zg = "NULL"
                    conn.execute(""" insert into zmarli (id, nazwisko, imie, data_urodzenia, data_zgonu, przyczyna, id_miejscowosc, nr_adres, id_admin, inf_dodat) VALUES ('{}', '{}', '{}', {}, {}, '{}', '{}', '{}', '{}', '{}') """.format(str(int(max_id[0]['max'])+1), nazwisko, imie,data_ur, data_zg, przyczyna, id_miejscowosci[0]['id_miejscowosci'], nr_adres, session.get('id_admin')['id_admin'], info_dodat))
                else:
                    conn.execute(""" insert into zmarli (id, nazwisko, imie, data_urodzenia, data_zgonu, przyczyna, id_miejscowosc, nr_adres, id_admin, inf_dodat) VALUES ('{}', '{}', '{}', {}, '{}', '{}', '{}', '{}', '{}', '{}') """.format(str(int(max_id[0]['max'])+1), nazwisko, imie,data_ur, data_zg, przyczyna, id_miejscowosci[0]['id_miejscowosci'], nr_adres, session.get('id_admin')['id_admin'], info_dodat))
            elif data_zg == "":
                data_zg = "NULL"
                conn.execute(""" insert into zmarli (id, nazwisko, imie, data_urodzenia, data_zgonu, przyczyna, id_miejscowosc, nr_adres, id_admin, inf_dodat) VALUES ('{}', '{}', '{}', '{}', {}, '{}', '{}', '{}', '{}', '{}') """.format(str(int(max_id[0]['max'])+1), nazwisko, imie,data_ur, data_zg, przyczyna, id_miejscowosci[0]['id_miejscowosci'], nr_adres, session.get('id_admin')['id_admin'], info_dodat))
            else:
                conn.execute(""" insert into zmarli (id, nazwisko, imie, data_urodzenia, data_zgonu, przyczyna, id_miejscowosc, nr_adres, id_admin, inf_dodat) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}') """.format(str(int(max_id[0]['max'])+1), nazwisko, imie,data_ur, data_zg, przyczyna, id_miejscowosci[0]['id_miejscowosci'], nr_adres, session.get('id_admin')['id_admin'], info_dodat))

            conn.execute(""" insert into zmarli_kwatery (id_kwatera, id, id_zmarly) VALUES ('{}', '{}', '{}') """.format(kwatera, str(int(max_id_2[0]['max'])+1), str(int(max_id[0]['max'])+1)))
        data = [json.dumps(session['id_admin']), json.dumps(session['imie_nazwisko'])]
        return render_template('record.html', data = data)
    else:
        return redirect('/login')


@app.route('/database')
def database():
    conn = db.session.connection()
    if ('id_admin' in session):
        
        data = rows_as_dicts(conn.execute(""" 
        select zm.id, zm.imie, zm.nazwisko, TO_CHAR(zm.data_urodzenia, 'DD.MM.YYYY') as data_urodzenia, TO_CHAR(zm.data_zgonu, 'DD.MM.YYYY') as data_zgonu, zm.przyczyna, zm.inf_dodat, 
        miej.nazwa, zm.nr_adres, kw.id_kwatera, zm.id_admin, ad.status
        from zmarli zm

        inner join zmarli_kwatery kw on zm.id = kw.id_zmarly
        inner join kwatery k on kw.id_kwatera = k.id
        inner join administratorzy ad on zm.id_admin = ad.id_admin
        inner join miejscowosci miej on zm.id_miejscowosc = miej.id_miejscowosci

         order by zm.nazwisko;
    
        """).cursor)
        data2 = [json.dumps(session['id_admin']), json.dumps(session['imie_nazwisko'])]
        return render_template('database.html', data = data, data2 = data2)
    else:
        return redirect('/login')


@app.route('/database_delete/<id>', methods=['GET', 'POST'])
def database_delete(id):
    conn = db.session.connection()
    conn.execute(""" delete from zmarli where id = '{}' """.format(id))
    conn.execute(""" delete from zmarli_kwatery where id_zmarly = '{}' """.format(id))
    return "Rekord został usunięty"


@app.route('/database_edit/<id>', methods=['GET', 'POST'])
def database_edit(id):
    conn = db.session.connection()
    if request.method == 'POST':
        if ('id_admin' in session):
            imie = request.form['imie']
            nazwisko = request.form['nazwisko']
            data_ur = request.form['data_urodzenia']
            data_zg = request.form['data_zgonu']
            przyczyna = request.form['przyczyna']
            miejscowosc = request.form['miejscowosc']
            nr_adres = request.form['nr_adresu']
            kwatera = request.form['kwatera']
            info_dodat = request.form['info_dodat']
            id_miejscowosci = rows_as_dicts(conn.execute(""" select id_miejscowosci from miejscowosci where nazwa = '{}' """.format(miejscowosc)).cursor)
            id_obiektu = id
            if data_ur == "":
                data_ur = "NULL"
                if data_zg == "":
                    data_zg = "NULL"
                    conn.execute(""" update zmarli set nazwisko = '{}', imie = '{}', data_urodzenia = {}, data_zgonu = {}, przyczyna = '{}', id_miejscowosc = '{}', nr_adres = '{}', id_admin = '{}', inf_dodat = '{}' where id = '{}' """.format(nazwisko, imie, data_ur, data_zg, przyczyna, id_miejscowosci, nr_adres, session.get('id_admin')['id_admin'], info_dodat, id_obiektu))
                else:
                    conn.execute(""" update zmarli set nazwisko = '{}', imie = '{}', data_urodzenia = {}, data_zgonu = '{}', przyczyna = '{}', id_miejscowosc = '{}', nr_adres = '{}', id_admin = '{}', inf_dodat = '{}' where id = '{}' """.format(nazwisko, imie, data_ur, data_zg, przyczyna, id_miejscowosci, nr_adres, session.get('id_admin')['id_admin'], info_dodat, id_obiektu))
            elif data_zg == "":
                data_zg = "NULL"
                conn.execute(""" update zmarli set nazwisko = '{}', imie = '{}', data_urodzenia = '{}', data_zgonu = {}, przyczyna = '{}', id_miejscowosc = '{}', nr_adres = '{}', id_admin = '{}', inf_dodat = '{}' where id = '{}' """.format(nazwisko, imie, data_ur, data_zg, przyczyna, id_miejscowosci, nr_adres, session.get('id_admin')['id_admin'], info_dodat, id_obiektu))
            else:
                conn.execute(""" update zmarli set nazwisko = '{}', imie = '{}', data_urodzenia = '{}', data_zgonu = '{}', przyczyna = '{}', id_miejscowosc = '{}', nr_adres = '{}', id_admin = '{}', inf_dodat = '{}' where id = '{}' """.format(nazwisko, imie, data_ur, data_zg, przyczyna, id_miejscowosci, nr_adres, session.get('id_admin')['id_admin'], info_dodat, id_obiektu))
            conn.execute(""" update zmarli_kwatery id_kwatera = '{}' where id_zmarly = '{}' """.format(kwatera, id_obiektu))
            data = [json.dumps(session['id_admin']), json.dumps(session['imie_nazwisko'])]
            return render_template('database.html', data = data)
    else:
        return render_template('database.html')



@app.route('/admin_database')
def admin_database():
    conn = db.session.connection()
    if ('id_admin' in session):
        data = rows_as_dicts(conn.execute("""

        select id_admin, imie, nazwisko, status from administratorzy

        """).cursor)
        if request.method == "POST":
            imie = request.form['imie']
            nazwisko = request.form['nazwisko']
            id_admina = request.form['id_admina']
            status = request.form['status']
            haslo = request.form['password']
            hash_haslo = generate_password_hash(haslo)
            conn.execute(""" insert into administratorzy (id_admin, nazwisko, imie, status, haslo) VALUES ('{}', '{}', '{}', '{}', '{}')""".format(id_admina, nazwisko, imie, status, hash_haslo))
        return render_template('admin_database.html', data = data)
    else:
        return redirect('/login')



@app.route('/mass_database', methods = ['GET', 'POST'])
def mass_database():
    conn = db.session.connection()
    if ('id_admin' in session):
        data = rows_as_dicts(conn.execute("""

        select * from msze
        order by data

        """).cursor)
        if request.method == 'POST':
            data = request.form['data']
            godzina = request.form['czas']
            zamawiajacy = request.form['zamawiajacy']
            odprawia = request.form['odprawia']
            data_str = data + ' ' + godzina
            data_obj = datetime.datetime.strptime(data_str, '%Y-%m-%d %H:%M')
            conn.execute(""" insert into msze (data, zamawiajacy, odprawia) VALUES ('{}', '{}', '{}') """.format(data_obj, zamawiajacy, odprawia))
        data2 = [json.dumps(session['id_admin']), json.dumps(session['imie_nazwisko'])]
        return render_template('mass_database.html', data = data, data2 = data2)
    else:
        return redirect('/login')



@app.route('/delete_mass/<date>')
def delete_mass(date):
    conn = db.session.connection()
    conn.execute(""" delete from msze where data = '{}' """.format(date))
    return "Msza zosała usunięta z bazy"



if __name__ == "__main__":
    app.run(debug=True)


