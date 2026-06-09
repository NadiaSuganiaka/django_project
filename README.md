# Photo Fun

Django + PostgreSQL + uvicorn.

## Stack

- Python 3.12, Django 5.x
- PostgreSQL 16
- uvicorn
- pip

## Requirements

- Python 3.10+
- PostgreSQL 14+

## Setup

```bash
git clone https://github.com/NadiaSuganiaka/django_project.git
cd django_project

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` in the project root:

```env
DEBUG=True
SECRET_KEY=your-secret-key
DB_NAME=db
DB_USER=user
DB_PASSWORD=password
DB_HOST=127.0.0.1
DB_PORT=5432
```

```bash
psql -U postgres -c "CREATE DATABASE db;"

python manage.py migrate

uvicorn config.asgi:application --reload
```

Available at http://localhost:8000

---

`python manage.py createsuperuser` — for superuser create.
